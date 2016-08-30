

module.exports = {
  passportHelper: function(appRoute, passport, option, callback) {

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

    appRoute.route(`/auth`).get(passport.authenticate(option));
    appRoute.route(`/auth/callback`).get(passport.authenticate(option, {failureRedirect: `/login`}), callback);
  },

  callbackURL: function(option) {
    let url = `http://127.0.0.1:8080/api/${option}/auth/callback`
    return url;
  },

  routeFeed: function(appRoute, callback) {
    appRoute.route('/feed').get(callback);
  }
}
