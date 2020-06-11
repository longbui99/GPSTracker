const LocalStrategy = require('passport-local').Strategy;
const DBMS = require('../config/DBMS.json')
const Hash = require('./Hash.js')
module.exports = (passport, User) => {
    passport.use('authClient',new LocalStrategy( (user, pass, done) => {
        User.collection(DBMS.ClientAuthCollection).findOne({username: user},(err,res)=>{
            if(err) return done(err,null);
            if(!res) return done(null,res);
            if(Hash.Pass(pass)==res.password){
                return done(null,{
                    id:res._id,
                    typeAccount: true
                });
            }
            else{
                return done(null,false,{message:"Password incorrect"})
            }
        })
    }
    ))
    passport.use('authAdm',new LocalStrategy( (user, pass, done) => {
        User.collection(DBMS.AdminAuthCollection).findOne({username: user},(err,res)=>{
            if(err) return done(err,null);
            if(!res) return done(null,res);
            if(Hash.Pass(pass)==res.password){
                return done(null,{
                    id:res._id,
                    typeAccount: false
                });
            }
            else{
                return done(null,false,{message:"Password incorrect"})
            }
        })
    }
    ))
}