

const DBMS = require('../../Config/DBMS')

module.exports = function (app, User, ObjectId) {
    app.post('/cli-home/get-some-infor',async(req,res)=>{
        let returnVal = await User.collection(DBMS.ClientInfoCollection).findOne({
            _id:ObjectId(req.user.id)
        },{projection:{
            Fname:1,
            Lname:1,
            Email:1,
            Contact:1,
            Address:1,
            DOB:1,
        }})
        res.send(returnVal)
    })
}