
// app: Server listening request and response to client side
// User: Database
const DBMS = require('../../Config/DBMS')

module.exports = function(app, User, ObjectId){
    app.post('/cli-main/adddevice', async(req,res)=>{
        let GPSFind = await User.collection(DBMS.GPSDeviceCollection).findOne({
            _id:ObjectId(req.body.DeviceID)
        })
        if (GPSFind == null){
            let LedFind = await User.collection(DBMS.NTFDeviceCollection).findOne({
                _id:ObjectId(req.body.DeviceID)
            })
            if (LedFind == null){
                res.send(false)
            }
            else{
                res.send({
                    DeviceID:req.body.DeviceID,
                    DeviceName:"LED",
                    Devicetype:0,
                    Devicestatus:LedFind.DeviceStatus,
                    OwnerID:null,
                    DeviceDateIn:LedFind.DeviceDateIn
                })
            }
        }
        else{
            res.send({
                DeviceID:req.body.DeviceID,
                DeviceName:"GPS",
                Devicetype:0,
                Devicestatus:GPSFind.DeviceStatus,
                OwnerID:null,
                DeviceDateIn:GPSFind.DeviceDateIn
            })
        }
    })
    app.post('/cli-main/get-alldevice', async (req,res)=>{
        // console.log(req.user.id)
        let GPSList = await User.collection(DBMS.ClientDeviceControl).find({
            OwnerId:req.user.id
        },{projection:{
            GPSName:1,
            GPSID:1,
            InformID:1,
            InformName:1,
        }}).toArray()
        lst = []
        for (let i = 0; i <GPSList.length; i++){
            if (GPSList[i].GPSID){
                lst.push({
                    DeviceID:GPSList[i].GPSID,
                    DeviceName:GPSList[i].GPSName,
                    Devicetype:0
                })
            }
            if (GPSList[i].InformID){
                lst.push({
                    DeviceID:GPSList[i].InformID,
                    DeviceName:GPSList[i].InformName,
                    Devicetype:1
                })
            }
        }
        res.send(lst)
    })
    app.post('/cli-main/settingsdevice', async(req,res)=>{
        let GPSModify = await User.collection(DBMS.ClientDeviceControl).update({
            GPSID:{$in:req.body.List}
        },
        {
            $set:{
                InformID:req.body.Id
            }
        }
        )
        if (GPSModify){
            res.send(true)
        }
        else{
            res.send(false)
        }
    })
}