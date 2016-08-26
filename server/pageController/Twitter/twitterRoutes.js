const twitterController = require('./twitterController.js');

module.exports = function(appRoute) {
  appRoute.route('/').get(twitterController.getData);
}
