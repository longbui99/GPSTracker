
// app: Server listening request and response to client side
// User: Database
const DBMS = require('../Config/DBMS.json')
const NodeMailer = 0;
const AdmFunction = 0;
const Parse = require('./AdmModule/Parse')

module.exports = function (app, User, ObjectId) {
    app.get('/auth/admin-is-loggin', (req, res) => {
        res.send(req.isAuthenticated() && !req.body.typePosition)
    })

    app.post('/adm/get-full-account-to-render', (req, res) => {
        User.collection(DBMS.ClientInfoCollection).find({}
            , { projection: { _id: 1, Fname: 1, Lname: 1,Contact:1, Email: 1, LastAccess: 1 } }).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                    res.send([])
                }
                else {
                    res.send(result)
                }
            })
    })

    app.post('/adm/get-peer-profile',async(req,res)=>{
        let returnVal = {}
        let dbrt = await User.collection(DBMS.ClientInfoCollection).findOne({"_id":ObjectId(req.body.username)})
        returnVal.FullName = dbrt.Fname + " " + dbrt.Lname;
        returnVal.Email = dbrt.Email;
        returnVal.Contact = dbrt.Contact;
        returnVal.Balance = dbrt.Balance;
        returnVal.DateIn =dbrt.DateIn;
        returnVal.LastAccess = dbrt.LastAccess;
        returnVal.CountDate = Parse.parseDate(dbrt.DateIn)
        returnVal.State = Parse.parseState(dbrt.State);
        returnVal.Level = Parse.parseLevel( dbrt.Level.NowLevel)
        returnVal.hisLevel = [dbrt.Level.HisLevel.Normal,dbrt.Level.HisLevel.Medium,dbrt.Level.HisLevel.Premium]
        returnVal.classState = Parse.parseClassState(dbrt.State)
        res.send(returnVal)
    })
}