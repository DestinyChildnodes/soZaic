"use strict";

const youTube = require('../routesController.js');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const utils = require(`../../serverController/utils.js`);

module.exports = (appRoute, passport, key, localApiKeys) => {

  let callbackUrl = ""
  if (key.youtube.clientID  && key.youtube.clientSecret) {
    callbackUrl = `https://sozaic.herokuapp.com/api/youTube/auth/callback`
  } else {
    callbackUrl = utils.callbackURL('youTube')
  }

  passport.use(new GoogleStrategy({
      clientID: key.youtube.clientID ||  localApiKeys.youtube.youtubeClientID,
      clientSecret: key.youtube.clientSecret ||  localApiKeys.youtube.youtubeClientSecret,
      callbackURL: callbackUrl,
      passReqToCallback: true
    },

    function(request, accessToken, refreshToken, profile, cb) {
      // console.log('TOKEN', accessToken);
      cb(null, accessToken)
    })
  );

  let token = "";

  appRoute.get('/auth', passport.authenticate('google', { scope : [
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/plus.login'
  ]}));

  appRoute.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/'}),
    function(req, res){

      req.session.google = req.session.passport.user;
      console.log("this is cookie", req.session)

      appRoute.get('/feed', function(req, res) {
        youTube.youTubeData(req, res, req.session.google);
      })

      res.redirect('/#/feed/youtube')
  });
}
