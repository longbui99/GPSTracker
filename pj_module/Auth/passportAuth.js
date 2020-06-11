const passport = require("passport")
const googleAuth = require('./googleAuth');
const localAuth = require('./localAuth.js');
const DBMS = require('../config/DBMS.json');
module.exports = {
    Func: function (User, ObjectId) {
        passport.serializeUser(function (user, done) {
            return done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            User.collection(DBMS.ClientAccount).findOne({ _id: ObjectId(user.id) }, function (err, res) {
                if (err) console.log(err)
                if (res == null) {
                    User.collection(DBMS.AdminAccount).findOne({ _id: ObjectId(user.id) }, function (err, res2) {
                        if (err) console.log(err)
                        if (res2 == null) {
                            return done(null,false)
                        }
                        else {
                            return done(null, user);
                        }
                    })
                }
                else {
                    return done(null, user);
                }
            });
        });
        googleAuth(passport, User, ObjectId);
        localAuth(passport, User);
    },

    passport: passport,
    passportConfig(app) {
        app.use(passport.initialize());
        app.use(passport.session());
    },
    
    LoginRoute(app) {
        app.get('/auth/google',
            passport.authenticate('google', { scope: ['profile', 'email'] }));

        app.get('/auth/google/callback',
            passport.authenticate('google', { failureRedirect: '/login-fail' }),
            function (req, res) {
                res.redirect('/login-done');
            });

        app.post('/auth/require-log-local-sign',
            passport.authenticate('authClient', { failureRedirect: '/' }), function (req, res) {
                res.send(true)
            })

        app.post('/auth/adm-requi-log-local',
            passport.authenticate('authAdm', { failureRedirect: '/' }), function (req, res) {
                res.redirect('http://localhost:3000/admin')
            })
    }
}   