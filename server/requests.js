"use strict";

const Twitter = require('twitter');
// const Youtube = require('youtube-api');
const key = require('./apiKeys.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const request = require('request');

const client = {

  instagram: () => {
    api.use({
      client_id: key.instagram.ClientID,
      client_secret: key.instagram.ClientSecret
    });
  },

  facebook: () => {

  },

  // youtube: function() {
  //   Youtube.authenticate({
  //     type: "oauth",
  //     refresh_token: "your refresh token",
  //     client_id: "your client id",
  //     client_secret: "your client secret",
  //     redirect_url: "your refresh url"
  //   });
  // }
};

module.exports =  {
  twitterGET: (token, screen_name, callback) => {
    let client = new Twitter({
      consumer_key: key.twitter.TWITTER_CONSUMER_KEY,
      consumer_secret: key.twitter.TWITTER_CONSUMER_SECRET,
      access_token_key: token.access_token_key,
      access_token_secret: token.access_token_secret
    })

    const params = {screen_name: screen_name};
    client.get('statuses/home_timeline', params, (error, tweets, response) => {
      if (error) {
        console.error(error);
      } else {
        callback(tweets);
      }
    });
  },

  instagramGET: (token, callback) => {
    request.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}`, (err, res, body) => {
        console.log(res);
        console.log(body);
        callback(body)
    })
  },

  facebookGET: (id,token) => {
    request.get(`https://graph.facebook.com/${id}/feed?access_token=${token}`, (err, res, body) => {
      console.log(`bodybodybody`, body);
      console.log(`resresres`, res);
      console.log(`idididididid`, id);

    })
    // .on(`response`, (res) => {
    //   console.log(res);
    // })
  },

  youtubeGET: (token, callback) => {
    // https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&access_token=ACCESS_TOKEN
    let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&mine=true&access_token=${token}`
;
    request.get(url, function(err, res, body) {
      console.log("ES666", `${token}`)
      callback(body);
    })
    // .on('response', function(res){
    //   callback(res)
    // })
  }
}
