const twitterController = require('../routesController.js');
const TwitterStrategy = require('passport-twitter').Strategy
const utils = require(`../../serverController/utils.js`)
let userTokens = {} /*temporary db to store user token*/

module.exports = function(appRoute, passport, key) {
  passport.use(new TwitterStrategy({
      consumerKey: key.twitter.TWITTER_CONSUMER_KEY,
      consumerSecret: key.twitter.TWITTER_CONSUMER_SECRET,
      callbackURL: "http://127.0.0.1:8080/api/twitter/auth/callback"
    },

    function(token, tokenSecret, profile, cb) {
      let userToken = {
        username: profile.username,
        token: {
          access_token_key: token,
          access_token_secret: tokenSecret
        }
      }
      cb(null, userToken);
    }
  ));

  utils.passportHelper(passport);
  appRoute.route('/auth').get(passport.authenticate('twitter'));

  appRoute.route('/auth/callback').get(
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res, next) {
      userTokens = req.user
      res.redirect('/#/feed/twitter');
    }
  );

  appRoute.route('/feed').get(function(req, res) {
    console.log("inside get Feed")
    if (userTokens.token === undefined) {
      res.send("Need to login", 404)
    } else {
      twitterController.twitterData(req, res, userTokens.username, userTokens.token);
    }
  })










}
