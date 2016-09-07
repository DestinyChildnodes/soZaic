"use strict";

const instagramController = require('../routesController');
const utils = require(`../../serverController/utils.js`)
const InstagramStrategy = require(`passport-instagram`).Strategy;

module.exports = (appRoute, passport, key, localApiKeys) => {

  let callbackUrl = ""
  if (key.twitter.TWITTER_CONSUMER_KEY && key.twitter.TWITTER_CONSUMER_SECRET) {
    callbackUrl = `https://sozaic.herokuapp.com/api/instagram/auth/callback`
  } else {
    callbackUrl = utils.callbackURL('instagram');
  }

	passport.use(new InstagramStrategy({
   	clientID: key.instagram.ClientID || localApiKeys.instagram.ClientID,
    clientSecret: key.instagram.ClientSecret || localApiKeys.instagram.ClientSecret,
    callbackURL: callbackUrl
  },
  	(accessToken, refreshToken, profile, cb) => {

      let userTokens = {};

  		userTokens.profile = profile;
  		userTokens.accessToken = accessToken;
  		cb(null, userTokens);
  }
  ));
  appRoute.get('/auth', passport.authenticate('instagram'));

  appRoute.get('/auth/callback',
    passport.authenticate(`instagram`, { failureRedirect: '/'}),
   function(req, res){

    req.session.instagram = req.session.passport.user
    res.redirect('/#/feed/instagram');
  });

  utils.routeFeed(appRoute, (req, res) => {
  	if (req.session.instagram === undefined){
  		res.status(404).send(`please log in!`);
  	} else {
  		instagramController.instagramData(req, res, req.session.instagram.accessToken);

  	}
  })


}
