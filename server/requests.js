"use strict";

const Twitter = require('twitter');
const key = require('./apiKeys.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const request = require('request');

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
        callback(body)
    })
  },

  facebookGET: (id, token, cb) => {
    request.get(`https://graph.facebook.com/${id}/feed?access_token=${token}`, (err, res, body) => {

      const objBody = JSON.parse(body);

      /*Note: Must use cb since 'res' here represents response from FB,
      while res from "routesController.js" represents res coming ultimately
      from client side. The cb below uses the client "res", and its property
      ".send" is used to send to client, inside services.js, fbFeed. */
      cb(objBody.data);
    })
  },

  youtubeGET: (token, callback) => {
    // https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&access_token=ACCESS_TOKEN
    // https://www.googleapis.com/youtube/v3/search?part=snippet&channelID=UCbB3BSFs0KtFlPzUg4omkBw&access_token=${token}
    let url = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&access_token=${token}`;

    request.get(url, function(err, res, body) {
      callback(body, token);
    })
  },

  youtTubeGetPlaylists: (token, channelId, callback) => {
    let playlistData= [];

    let url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&access_token=${token}`;
    request.get(url, function(err, res, body) {
      let jsonData = JSON.parse(body);
      callback(jsonData);
    });

  }
}
