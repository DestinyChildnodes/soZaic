"use strict";

const instagramController = require('../routesController');
const utils = require(`../../serverController/utils.js`)
const InstagramStrategy = require(`passport-instagram`).Strategy;
let userTokens = {};

module.exports = (appRoute, passport, key) => {
	passport.use(new InstagramStrategy({
   	clientID: key.instagram.ClientID,
    clientSecret: key.instagram.ClientSecret,
    callbackURL: `http://127.0.0.1:8080/api/instagram/auth/callback`
  },
  	(accessToken, refreshToken, profile, cb) => {
  		userTokens.profile = profile;
  		userTokens.accessToken = accessToken;
  		cb(null, userTokens);
  }
  ));
  appRoute.get('/auth', passport.authenticate('instagram'));

  utils.routeFeed(appRoute, (req, res) => {
  	if (userTokens.profile === undefined){
  		res.status(404).send(`please log in!`);
  	} else {
  		instagramController.instagramData(req, res, userTokens.accessToken);
  	}
  })

  appRoute.get('/auth/callback',
  	passport.authenticate(`instagram`, { failureRedirect: '/'}),
   function(req, res){
   	res.redirect('/#/feed/instagram');
  });
}

