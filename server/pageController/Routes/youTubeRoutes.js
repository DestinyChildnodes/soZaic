"use strict";

const youTube = require('../routesController.js');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const utils = require(`../../serverController/utils.js`);

module.exports = (appRoute, passport, key) => {
  passport.use(new GoogleStrategy({
      clientID: key.youtube.clientID,
      clientSecret: key.youtube.clientSecret,
      callbackURL: 'http://127.0.0.1:8080/api/youTube/auth/callback',
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

      token = req.user;
      appRoute.get('/feed', function(req, res) {
        youTube.youTubeData(req, res, token);
      })

      res.redirect('/#/feed/youtube')
  });
}
