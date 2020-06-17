const mqtt = require('mqtt')
const mqttConfig = require('../Config/MQTT')
const DBMS = require('../Config/DBMS');
const Hash = require('js-sha1')


function getCollectionContain(DeviceType) {
    return (DeviceType == 'GPS') ? DBMS.GPSDeviceCollection : DBMS.NTFDeviceCollection;
}

exports.initMQTTConnect = async function (User, ObjectId) {
    const client = await mqtt.connect(mqttConfig.connectConfig)

    client.on('connect', function () {
        client.subscribe(mqttConfig.GpsTopic, function (err, topic) {
            if (err) console.log(err)
        })
    })

    client.on('message', async function (topic, message) {
        console.log(message.toString())
        message = JSON.parse(message.toString())[0]
        let Collection = getCollectionContain(message.device_id)
        // console.log(Collection)
        // console.log(message)
        let DVId = Hash(message.device_id).substring(0,12)

        let returnVal = await User.collection(Collection).findOne(
            { _id: ObjectId(DVId) }
        )
        // console.log(returnVal)
        if (returnVal == null) {
            User.collection(Collection).insertOne({
                _id: ObjectId(DVId),
                DeviceStatus: 0,
                DeviceOwnerID: null,
                DeviceDateIn: new Date().toISOString().substring(0, 10),
                DeviceData: {
                    Longitude: message.values[0],
                    Latitude: message.values[1]
                }
            })
        } else {
            User.collection(Collection).updateOne({
                _id: ObjectId(DVId)
            },
                {
                    $set: {
                        DeviceData: {
                            Longitude: message.values[0],
                            Latitude: message.values[1]
                        }
                    }
                }
            )
        }
    })
}
exports.publicizeToDevice = async function (deviceID, transferValue) {
    const client = await mqtt.connect(mqttConfig.connectConfig)
    client.on('connect', function () {
        client.subscribe(mqttConfig.NotifyTopic, function (err, topic) {
            if (err) console.log(err)
            else {
                client.publish(mqttConfig.NotifyTopic,
                JSON.stringify([
                    {
                        device_id: "Light",
                        values: transferValue
                    }
                ])
                )
                client.end()
            }
        })
    })
}


