const youTube = require('../routesController.js');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const utils = require(`../../serverController/utils.js`)

module.exports = function(appRoute, passport, key) {
  passport.use(new GoogleStrategy({
      clientID: key.youtube.clientID,
      clientSecret: key.youtube.clientSecret,
      callbackURL: utils.callbackURL('google')
    },
    function(token, tokenSecret, profile, cb) {
      cb(null, profile);
    }
  ));
}

utils.passportHelper(appRoute, passport, 'google', function(req, res) {

});

utils.routeFeed(appRoute, function(req, res) {

});
