//TODO: Need to add twitter api
var apiRequest = require('../../requests.js');

module.exports = {
  getData: (req, res, screen_name, token) => {

    apiRequest.twitterGET(token, screen_name, (tweets) => {
      // console.log("inside twitterGEt")s
      var texts = []
      for (let el of tweets) {
        texts.push(el.text)
      }
      res.send(texts);
    });
  }
}
