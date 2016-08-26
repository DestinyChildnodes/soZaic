let youTube = require('youtubeController.js');

module.exports = function(appRoute) {
  appRoute.route('/').get(twitterController.getData);
}
