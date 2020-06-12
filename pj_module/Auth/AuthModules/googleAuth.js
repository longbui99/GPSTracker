const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Config = require('../../config/googleConfig.json')
const Hash = require('../AuthSecure/Hash.js')
const DBMS = require('../../config/DBMS.json')

function updateClientInformation(User, profile, ObjectId) {
    console.log(profile)
    let Dat = new Date()
    let DMY = Dat.getDate() + "/" + Dat.getMonth() + "/" + Dat.getFullYear();
    User.collection(DBMS.ClientInfoCollection).insertOne({
        "_id": ObjectId,
        Fname: profile.given_name,
        Lname: profile.family_name,
        Email: profile.email,
        Contact:"",
        Balance:0,
        DateIn: DMY,
        LastAccess:DMY,
        State:0,
        Level:{
            NowLevel:0,
            HisLevel:{
                Normal:1,
                Medium:0,
                Premium:0
            }
        }
    }, (err) => {
        if (err)
            console.log(err)
    })
}

module.exports = function (passport, User, ObjectId) {
    passport.use("google", new GoogleStrategy({
        clientID: Config.ClientID,
        clientSecret: Config.ClientSecret,
        callbackURL: "/auth/google/callback"
    }, function (accessToken, refreshToken, profile, done) {
        profile = profile._json;
        if (profile.email_verified) {
            User.collection(DBMS.ClientAuthCollection).findOne({ username: profile.email }, (err, res) => {
                if (err) return done(err, null);
                if (res == null) {
                    User.collection(DBMS.ClientAuthCollection).insertOne({ 
                        username: profile.email, 
                        password: Hash.Pass(Hash.Select(profile.sub)),
                        typePosition: true
                    }
                        , (err, user) => {
                            if (err) throw err;
                            else {
                                id = user.ops[0]._id
                                updateClientInformation(User, profile, ObjectId(id))
                                return done(null, {
                                    id: id,
                                    typePosition: true
                                });
                            }
                        }
                    )
                }
                else {
                    return done(null, {
                        id:res._id,
                        typePosition: true
                    }

                    );
                }
            })
        }
        else {
            return done(null, false, { message: 'Email is not verify' });
        }
    }
    ))
}