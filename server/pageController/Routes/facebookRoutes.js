"use strict";

const fbController = require('../routesController');
const FacebookStrategy = require(`passport-facebook`).Strategy;
const utils = require(`../../serverController/utils`);
let userTokens = {};

module.exports = function(appRoute, passport, key, localApiKeys) {
  console.log('Inside FB Routes');

  //need following only for logging in:
  passport.use(new FacebookStrategy({
    clientID: key.facebook.clientID || localApiKeys.facebook.clientID,
    clientSecret: key.facebook.clientSecret || localApiKeys.facebook.clientSecret,
    callbackURL: `http://local.host:8080/api/facebook/auth/callback`
  },
    (accessToken, refreshToken, profile, cb) => {
      console.log(`before cb()`);
      console.log(profile);
      console.log(accessToken);
      console.log(refreshToken);
      userTokens.profile = profile;
      userTokens.accessToken = accessToken;
      cb(null, userTokens);
    }
  ));
  //
  // appRoute.get(`/auth`,
  //   passport.authenticate(`facebook`)
  // );
  appRoute.get('/auth', passport.authenticate('facebook', { scope : ['user_friends', `user_photos`, `user_videos`, `public_profile`, `user_posts`, `user_likes`]}));
  // utils.passportHelper(appRoute, passport, `facebook`, function(req, res) {
  //   console.log(`should redirect...`);
  //   console.log("frkejhgvlsdfhnlsdfsf", userTokens);
  //   console.log(req.user);
  //   // userTokens = req.user;
  //   res.redirect(`/`);
  // })


  utils.routeFeed(appRoute, (req, res) => {
    console.log(`FB utils.routefeed`);
    console.log(`userTokens`, userTokens);
    // console.log(`yoyoyoyo`, req.data);
    // console.log(`yoyoyoyo`, req.params);
    if (userTokens.profile === undefined) {
      console.log(`mayday mayday`);
      res.status(404).send(`please login`);
    } else {
      console.log(`userToken.accessToken`, userTokens.accessToken);
      fbController.fbData(req, res, userTokens.profile.id, userTokens.accessToken);
    }
  })

  //following only for logging in:
  appRoute.get(`/auth/callback`,
    passport.authenticate(`facebook`, { failureRedirect: `/logindfgbr` }),
    function(req, res) {
      // console.log(`yoyoyoyo`, req.data);
      // console.log(`yoyoyoyo`, req.params);
      console.log(`should redirect...`);
      res.redirect(`/#/feed/facebook`);
    }
  )

  appRoute.get(`/feed/specific`, (req, res) => {
    console.log(req.query);
    console.log(typeof fbController.fbSp);
    fbController.fbSp(req, res, userTokens.profile.id,  userTokens.accessToken, req.query);
  })

};



/*
FB auth wouldn't allow to use localhost or 127.0.0.1.
Didn't want to have to push to heroku every time for dev purposes.
Had to change OS system admin file to get to work.
Must use local.host for local-node-server, works for twitter also.
These links helpful to make work:
http://stackoverflow.com/questions/21310648/facebook-app-this-must-be-derived-from-canvas-url-secure-canvas-url
https://support.rackspace.com/how-to/modify-your-hosts-file/
*/
