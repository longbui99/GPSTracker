const passport = require("passport")
const googleAuth = require('./AuthModules/googleAuth');
const localAuth = require('./AuthModules/localAuth.js');
const DBMS = require('../config/DBMS.json');
const Hash = require('./AuthSecure/Hash.js')

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
    app.get('/auth/require-log-local-sign',
    passport.authenticate('authClient', { failureRedirect: '/' , successRedirect:"/home"}))

    app.post('/auth/adm-requi-log-local',
        passport.authenticate('authAdm', { failureRedirect: '/' }), function (req, res) {
            res.redirect('http://localhost:3000/admin')
        })

    app.get('/login-done', (req, res) => {
        res.write(`
            <script>
                window.opener.location.replace('/home');
                window.close()
            </script>
            `)
    })

    app.post('/auth/require-log-local-sign-up', async (req, res, next) => {
        checkData = await User.collection(DBMS.ClientAuthCollection).findOne({ "username": req.body.username })
        if (checkData == null) {
            let id = await User.collection(DBMS.ClientAuthCollection).insertOne({
                username: req.body.username,
                password: Hash.Pass(req.body.password),
                typePosition: true
            })
            id = id.ops[0]._id
            console.log("ID:",id)
            let Dat = new Date()
            let DMY = Dat.getDate() + "/" + Dat.getMonth() + "/" + Dat.getFullYear();
            await User.collection(DBMS.ClientInfoCollection).insertOne({
                "_id": ObjectId(id),
                Fname: "",
                Lname: "",
                Email: req.body.username,
                Contact: "",
                Balance: 0,
                DateIn: DMY,
                LastAccess: DMY,
                State: 0,
                Level: {
                    NowLevel: 0,
                    HisLevel: {
                        Normal: 1,
                        Medium: 0,
                        Premium: 0
                    }
                }
            })
            res.send(true)
            console.log("has been sent")
        }
        else {
            res.send(false)
        }
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