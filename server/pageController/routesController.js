"use strict";

const apiRequest = require('../../server/requests.js');

module.exports = {
  twitterData: (req, res, screen_name, token) => {
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
