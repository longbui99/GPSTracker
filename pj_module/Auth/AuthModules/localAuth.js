const LocalStrategy = require('passport-local').Strategy;
const DBMS = require('../../config/DBMS.json')
const Hash = require('../AuthSecure/Hash.js')
const AuthFunction = require('../AuthFunction/AuthFunction')
module.exports = (passport, User) => {
    passport.use('authClient',new LocalStrategy( AuthFunction.LocalStragegyClient
    ))
    passport.use('authAdm',new LocalStrategy(  AuthFunction.LocalStragegyAdm ))
}