const LocalStrategy = require('passport-local').Strategy;
const DBMS = require('../../config/DBMS.js')
const Hash = require('../AuthSecure/Hash.js')
const AuthFunction = require('../AuthFunction/AuthFunction.js')
module.exports = (passport, User) => {
    passport.use('authClient',new LocalStrategy( AuthFunction.LocalStragegyClient
    ))
    passport.use('authAdm',new LocalStrategy(  AuthFunction.LocalStragegyAdm ))
}