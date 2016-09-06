"use strict";

module.exports = {
  passportHelper: (appRoute, passport, option, callback) => {

    passport.serializeUser((user, done) =>  {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    appRoute.route(`/auth`).get(passport.authenticate(option));
    appRoute.route(`/auth/callback`).get(passport.authenticate(option, {failureRedirect: `/login`}), callback);
  },

  callbackURL: (option) =>`http://local.host:8080/api/${option}/auth/callback`,
  routeFeed: (appRoute, callback) => appRoute.route('/feed').get(callback),
  createSession: function(req, res, newUser) {
    return req.session.regenerate(function() {
        req.session.user = newUser;
      });
  }
}
