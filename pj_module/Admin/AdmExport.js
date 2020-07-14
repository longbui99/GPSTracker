
// app: Server listening request and response to client side
// User: Database
const DBMS = require('../Config/DBMS')
const NodeMailer = 0;
const AdmFunction = 0;
const Parse = require('./AdmModule/Parse')

module.exports = function (app, User, ObjectId) {
    app.post('/admin-home/get-mini-acc-state', async (req, res) => {
        let returnVal = await User.collection(DBMS.ClientInfoCollection).aggregate([
            { $group: { _id: "$State", count: { $sum: 1 } } }
            ,{$sort:{_id:1}}
        ]).toArray()
        res.send(returnVal)
    })

    app.post('/admin-home/get-mini-acc-level',async(req,res)=>{
        let returnVal = await User.collection(DBMS.ClientInfoCollection).aggregate([
            { $group: { _id: "$Level.NowLevel", count: { $sum: 1 } } }
            ,{$sort:{_id:1}}
        ]).toArray()
        for( let x = returnVal.length-1; x < 3; x++){
            returnVal.push({count:0})
        }
        res.send(returnVal)
    })
    
    app.post('/admin-home/get-mini-device', async (req,res)=>{
        let GPSSize = await User.collection(DBMS.GPSDeviceCollection).countDocuments()
        let LEDSize = await User.collection(DBMS.NTFDeviceCollection).countDocuments()
        res.send([LEDSize,GPSSize])
    })



    app.post('/auth/admin-is-loggin', (req, res) => {
        res.send(req.isAuthenticated() && !req.body.typePosition)
    })

    app.post('/adm/get-full-account-to-render', async (req, res) => {
        User.collection(DBMS.ClientInfoCollection).find({}
            , { projection: { _id: 1, Fname: 1, Lname: 1, Contact: 1, Email: 1, LastAccess: 1 } }).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    res.send([])
                }
                else {
                    res.send(result)
                }
            })
    })

    app.post('/adm/get-peer-profile', async (req, res) => {
        let returnVal = {}
        let dbrt = await User.collection(DBMS.ClientInfoCollection).findOne({ "_id": ObjectId(req.body.id) })
        returnVal.id = dbrt._id
        returnVal.FullName = dbrt.Fname + " " + dbrt.Lname;
        returnVal.Email = dbrt.Email;
        returnVal.Contact = dbrt.Contact;
        returnVal.DateIn = dbrt.DateIn;
        returnVal.Address = dbrt.Address
        returnVal.LastAccess = dbrt.LastAccess;
        returnVal.DOB = dbrt.DOB
        returnVal.DateIn = dbrt.DateIn
        returnVal.State = Parse.parseState(dbrt.State);
        returnVal.Level = Parse.parseLevel(dbrt.Level.NowLevel)
        res.send(returnVal)
    })

    app.post('/adm/get-sys-acc-state', async (req, res) => {
        let returnVal = {};
        returnVal.total = await User.collection(DBMS.ClientAuthCollection).find().count()
        returnVal.new = await User.collection(DBMS.ClientInfoCollection).find(
            {
                "DateIn": new Date().toISOString().substring(0, 10)
            }
        ).count()
        returnVal.expire = await User.collection(DBMS.ClientInfoCollection).find(
            {
                "State": 3
            }
        ).count()
        res.send(returnVal);
    })

    app.post('/admin/get-account-development-dashboard', async (req, res) => {
        let DayStart = Parse.parseDateStart(req.body.dashboardType, req.body.displayType)
        let returnVal = await User.collection(DBMS.ClientInfoCollection).aggregate(
            [
                { $match: { DateIn: { $gte   : DayStart[0] } } },
                { $group: { _id: "$DateIn", count: { $sum: 1 } } },
                { $sort: { _id: 1 } }
            ]
        ).toArray()
        res.send({
            data: Parse.parseDateDash(returnVal, DayStart[0]),
            labels: DayStart[1]
        })
    })

    app.post('/logout-request', (req, res) => {
        req.logout()
        res.send(true)
    })

    app.get('/admin*', (req, res) => {
        res.render('admin')
    })
}