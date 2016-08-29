//TODO: Need to add twitter api
var apiRequest = require('../../requests.js');

module.exports = {
  getData: (req, res, screen_name) => {
    apiRequest.twitterGET((screen_name, tweets) => {
      console.log("inside twitterGEt")
      res.send(tweets);
    });
  }
}
