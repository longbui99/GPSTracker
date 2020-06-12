const passport = require("passport")
const googleAuth = require('./AuthModules/googleAuth');
const localAuth = require('./AuthModules/localAuth.js');
const AuthFunction = require('./AuthFunction/AuthFunction')

module.exports = function (app, User, ObjectId) {
    app.use(passport.initialize());
    app.use(passport.session());

    googleAuth(passport, User, ObjectId);
    localAuth(passport, User);
    
    AuthFunction.configureFunction(User,ObjectId)

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

    app.get('/login-done', AuthFunction.clientLoginDone)

    app.get('/auth/adm/:user&-&:pass', AuthFunction.adminLoginFunc)

    app.post('/auth/require-log-local-sign-up', AuthFunction.AuthLocalSignUp )

    passport.serializeUser(function (user, done) {
        return done(null, user);
    });

    passport.deserializeUser(AuthFunction.deserializeUser);
}