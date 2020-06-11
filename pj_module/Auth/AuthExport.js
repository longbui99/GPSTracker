const passport = require("passport")
const googleAuth = require('./googleAuth');
const localAuth = require('./localAuth.js');
const DBMS = require('../config/DBMS.json');

module.exports = function (app, User, ObjectId) {
    app.use(passport.initialize());
    app.use(passport.session());

    googleAuth(passport, User, ObjectId);
    localAuth(passport, User);

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
            // res.redirect('http://localhost:3000/admin')
        })

    app.get('/login-done', (req, res) => {
        res.write(`
            <script>
                window.opener.location.replace('/home');
                window.close()
            </script>
            `)
    })
    passport.serializeUser(function (user, done) {
        return done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        User.collection(DBMS.ClientAuthCollection).findOne({ _id: ObjectId(user.id) }, function (err, res) {
            if (err) console.log(err)
            if (res == null) {
                User.collection(DBMS.AdminAuthCollection).findOne({ _id: ObjectId(user.id) }, function (err, res2) {
                    if (err) console.log(err)
                    if (res2 == null) {
                        return done(null, false)
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
}