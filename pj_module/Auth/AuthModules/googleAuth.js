const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const Config = require('../../config/GConfig.json')
const Hash = require('../AuthSecure/Hash.js')
const DBMS = require('../../config/DBMS.json')
const AuthFunction = require('../AuthFunction/AuthFunction')


module.exports = function (passport, User, ObjectId) {
    passport.use("google", new GoogleStrategy({
        clientID: "339588269614-813v39gknlkgphv9v5gt1hgvbks1umli.apps.googleusercontent.com",
        clientSecret: "GrUnWr7UwbcM5IV0TDhsGxVr",
        callbackURL: "/auth/google/callback"
    },AuthFunction.GoogleStrategy))
}