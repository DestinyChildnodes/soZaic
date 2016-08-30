const twitterController = require('./twitterController.js');
const TwitterStrategy = require('passport-twitter').Strategy


module.exports = function(appRoute, passport, key) {
  console.log('Inside Twitter Routes')

  appRoute.route('/auth').get(passport.authenticate('twitter'));


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
      // console.log(profile)
      cb(null, userToken);
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });



  // appRoute.route('/feed').get(twitterController.getData);

  var userTokens = {}

  appRoute.route('/auth/callback').get(
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res, next) {
      // console.log("Successful authentication")
      // console.log("req", req)
      // console.log("this is token",req.user)
      // Successful authentication, redirect home.
      console.log(req.user)
      // twitterController.getData(req, res, req.user.screen_name);
      // twitterController.getData(req, res, req.user.username, );
      userTokens = req.user

      res.redirect('/#/feed/twitter');
    }
  );
  //api/twitter/feed
  appRoute.route('/feed').get(function(req, res) {
    twitterController.getData(req, res, userTokens.username, userTokens.token);
  })









}
