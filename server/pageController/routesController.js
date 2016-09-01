"use strict";

const apiRequest = require('../../server/requests.js');

module.exports = {
  twitterData: (req, res, screen_name, token) => {
    apiRequest.twitterGET(token, screen_name, (tweets) => {
      // console.log("inside twitterGEt")s
      let texts = []
      for (let el of tweets) {
        texts.push(el)
      }
      res.send(texts);
    });
  },

  youTubeData: (req, res, token) => {
    apiRequest.youtubeGET(token, (data) => {
      res.send(data);
    });
  },

  fbData: (req, res, id, token) => {
    apiRequest.facebookGET(id,token, (data) => {
      res.send(data);
    })
  },

  instagramData: (req, res, token) => {
    apiRequest.instagramGET(token, (body) => {
      res.send(body)
    });
  }
}
