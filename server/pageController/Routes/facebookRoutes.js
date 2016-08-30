"use strict";

// const fbController = require('../routesController');
const FacebookStrategy = require(`passport-facebook`).Strategy;

module.exports = function(appRoute, passport, key) {
  console.log('Inside FB Routes');

  passport.use(new FacebookStrategy({
    clientID: key.facebook.clientID,
    clientSecret: key.facebook.clientSecret,
    callbackURL: `http://local.host:8080/api/facebook/auth/callback`
  },
    (accessToken, refreshToken, profile, cb) => {
      cb(null, `blahblahblah`);
    }
  ));

  appRoute.get(`/auth`,
    passport.authenticate(`facebook`)
  );

  appRoute.get(`auth/callback`,
    passport.authenticate(`facebook`, { failureRedirect: `/login` }),
    function(req, res) {
      res.redirect(`/`);
    }
  )
};
