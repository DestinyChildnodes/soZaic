const bodyParser  = require('body-parser');
const TwitterStrategy = require('passport-twitter').Strategy
const key = require('./../apiKeys.js');
const session = require('express-session');

module.exports = function(app, express, passport) {
  const twitterRouter = express.Router();
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

  passport.use(new TwitterStrategy({
      consumerKey: key.twitter.TWITTER_CONSUMER_KEY,
      consumerSecret: key.twitter.TWITTER_CONSUMER_SECRET,
      callbackURL: "http://127.0.0.1:8080/api/twitter/auth/callback"
    },
    function(token, tokenSecret, profile, cb) {
      // console.log(profile);
      cb(null, profile);
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  const oAuthYouTube = express.Router();
  // const youTube = express.router();


  //TODO: need facebook, instagram, youtube

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(`${__dirname}/../../client`));

  //TODO: Need to add passport OAUTH


  app.use(`/api/twitter`, twitterRouter);
  require(`../pageController/Twitter/twitterRoutes`)(twitterRouter, passport);
}
