const mqtt = require('mqtt')
const mqttConfig = require('../Config/MQTT')
const DBMS = require('../Config/DBMS');
const Hash = require('js-sha1');
const Analyze = require('../AnalyzeCondition/AnalyzeExport')



// let listTopicOnline = []
var client = null
exports.initMQTTConnect = async function (io, User, ObjectId) {
    client = await mqtt.connect(mqttConfig.connectConfig)

    client.on('connect', function () {
        client.subscribe(mqttConfig.GpsTopic, function (err, topic) {
            if (err) console.log(err)
            client.on('message', async function (topic, message) {
                console.log(topic)
                if (topic == "Topic/GPS") {
                    // let Collection = getCollectionContain(message.device_id)
                    message = JSON.parse(message.toString())
                    // console.log(message)
                    let listGPSChange = []
                    let isUpdate = false
                    message.forEach(async element => {
                        let DVID = Hash(element.device_id).substring(0, 12)
                        let id = ObjectId(DVID)
                        let returnVal = await User.collection(DBMS.GPSDeviceCollection).findOne(
                            { _id: id }
                        )

                        if (returnVal == null) {
                            User.collection(DBMS.GPSDeviceCollection).insertOne({
                                _id: id,
                                DeviceStatus: 0,
                                DeviceOwnerID: null,
                                DeviceDateIn: new Date().toISOString().substring(0, 10),
                                DeviceData: {
                                    Longitude: (element.values[0]),
                                    Latitude: (element.values[1])
                                }
                            })
                        } else {
                            await User.collection(DBMS.GPSDeviceCollection).updateOne({
                                _id: id,
                                $or: [
                                    { "DeviceData.Longitude": { $ne: element.values[0] } },
                                    { "DeviceData.Latitude": { $ne: element.values[1] } }]
                            }
                                ,
                                {
                                    $set: {
                                        DeviceData: {
                                            Longitude: (element.values[0]),
                                            Latitude: (element.values[1])
                                        }
                                    }
                                }
                                , (err, res) => {
                                    if (res.modifiedCount == 1) {
                                        isUpdate = true
                                        io.to(returnVal.DeviceOwnerID).emit('emit-new-gps', {
                                            gpsID: id,
                                            data: [element.values[0], element.values[1]]
                                        })
                                        listGPSChange.push({
                                            GPSID: id,
                                            data: [element.values[0], element.values[1]],
                                        })
                                    }
                                }
                            )
                        }

                    })
                    if(isUpdate)
                        Analyze.AnalyzesSystem()
                }
            })
        })
    })

}
exports.publicizeToDevice = async function (deviceID) {
    client.publish("Topic/Light",
    JSON.stringify([
        {
            device_id: "Light",
            values: ["255", "255"]
        }
    ])
)
}
