const twitterController = require('./twitterController.js');

module.exports = function(appRoute, passport) {
  console.log('Inside Twitter Routes')

  appRoute.route('/auth').get(passport.authenticate('twitter'));

  // appRoute.route('/feed').get(twitterController.getData);

  appRoute.route('/auth/callback').get(
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
      console.log("Successful authentication")

      // Successful authentication, redirect home.
      console.log(req.user.username)
      // twitterController.getData(req, res, req.user.screen_name);
      res.redirect('/#/feed/twitter');
    }

  );
}
