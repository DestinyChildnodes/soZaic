"use strict";

const twitterController = require('../routesController.js');
const TwitterStrategy = require('passport-twitter').Strategy;
const utils = require(`../../serverController/utils.js`);
// let userTokens = {}; /*temporary db to store user token*/

module.exports = (appRoute, passport, key, localApiKeys) => {

  let callbackUrl = ""
  if (key.twitter.TWITTER_CONSUMER_KEY && key.twitter.TWITTER_CONSUMER_SECRET) {
    callbackUrl = `https://sozaic.herokuapp.com/api/twitter/auth/callback`
  } else {
    callbackUrl = utils.callbackURL('twitter')
  }


  passport.use(new TwitterStrategy({
      consumerKey: key.twitter.TWITTER_CONSUMER_KEY || localApiKeys.twitter.TWITTER_CONSUMER_KEY,
      consumerSecret: key.twitter.TWITTER_CONSUMER_SECRET || localApiKeys.twitter.TWITTER_CONSUMER_SECRET,
      callbackURL: callbackUrl
      // callbackURL: utils.callbackURL('twitter')
  },

  (token, tokenSecret, profile, cb) => {


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

  // appRoute.route(`/auth/callback`).get(passport.authenticate(option, {failureRedirect: `/login`}), callback);

  utils.passportHelper(appRoute, passport, 'twitter', (req, res) => {
    // userTokens = req.user

    utils.createSession(req, res, req.user);
    res.redirect('/#/feed/twitter');
  });

  utils.routeFeed(appRoute, (req, res) => {
    console.log("inside get Feed");
    console.log(req.session)
    if (req.session.passport === undefined) {
      res.status(404).send("Need to log in");
    } else {
      twitterController.twitterData(req, res, req.session.passport.user.username, req.session.passport.user.token);
    }
  })

  // appRoute.route('/auth').get(passport.authenticate('twitter'));
  // appRoute.route('/auth/callback').get(
  //   passport.authenticate('twitter', { failureRedirect: '/login' }),
  //   function(req, res, next) {
  //     userTokens = req.user
  //     res.redirect('/#/feed/twitter');
  //   }
  // );











}
