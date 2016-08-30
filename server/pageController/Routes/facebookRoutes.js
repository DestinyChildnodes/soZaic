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

/*
FB auth wouldn't allow to use localhost or 127.0.0.1.
Didn't want to have to push to heroku every time for dev purposes.
Had to change OS system admin file to get to work.
Must use local.host for local-node-server, works for twitter also.
These links helpful to make work:
http://stackoverflow.com/questions/21310648/facebook-app-this-must-be-derived-from-canvas-url-secure-canvas-url
https://support.rackspace.com/how-to/modify-your-hosts-file/
*/
