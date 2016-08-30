const fbController = require('./facebookController.js');
const TwitterStrategy = require('passport-facebook').Strategy


module.exports = function(appRoute, passport, key) {
  console.log('Inside FB Routes');

  passport.use(new FacebookStrategy({
    clientID: key.facebook.clientID,
    clientSecret: key.facebook.clientSecret,
    callbackUR: key.facebook.callbackURL
  }))


//facebookController.js
var request = require('../../requests.js');

module.exports = {
  getData: () => {
    request.facebookGET();
  }
}
