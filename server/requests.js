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
    const vidFields = `description,updated_time,id,embed_html`;
    const postsFields = `status_type,picture,full_picture,message,created_time,description,place,source,type,from`;
    request.get(`https://graph.facebook.com/v2.7/${id}?fields=posts.fields(${postsFields}),picture,tagged,videos{${vidFields}}&access_token=${token}`,
    //embed_html
    /*Working get URLs:
    Preferred:
    https://graph.facebook.com/v2.7/${id}/posts?fields(status_type,link,picture,message,created_time,description,place,source,type)&access_token=${token}

    me?fields=posts.fields(status_type,picture,message,created_time,description,place,source,type)
    https://graph.facebook.com/v2.7/10207067440152981_10207068465138605?access_token=${token}
    */
    (err, res, body) => {
        if (err) () => console.log(err);
        console.log(`bodybodybody`, body);
        const objBody = JSON.parse(body);
        console.log(`objobjobj`, objBody);
        /*Note: Must use cb since 'res' here represents response from FB,
        while res from "routesController.js" represents res coming ultimately
        from client side. The cb below uses the client "res", and its property
        ".send" is used to send to client, inside services.js, fbFeed. */
        cb({all: objBody,
            postsData: objBody.posts.data,
            profPic: objBody.picture.data,
            tagged: objBody.tagged.data,
            videos: objBody.videos
          });
    })
  },

  // facebookSpGET: (id, token, type, cb) => {
  //   if (type.yo === `added_photos`) {
  //     request.get(`https://graph.facebook.com/v2.7/ )
  //   }
  // }

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
