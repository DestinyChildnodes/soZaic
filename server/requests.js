const Twitter = require('twitter');
const Youtube = require('youtube-api');
const key = require('./apiKeys.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

const client = {
  twitter: new Twitter({
    consumer_key: key.twitter.TWITTER_CONSUMER_KEY,
    consumer_secret: key.twitter.TWITTER_CONSUMER_SECRET,
    access_token_key: key.twitter.TWITTER_ACCESS_TOKEN,
    access_token_secret: key.twitter.TWITTER_ACCESS_TOKEN_SECRET
  }),

  instagram: () => {
    api.use({
      client_id: key.instagram.ClientID,
      client_secret: key.instagram.ClientSecret
    });
  },

  facebook: {

  },

  youtube: function() {
    Youtube.authenticate({
      type: "oauth",
      refresh_token: "your refresh token",
      client_id: "your client id",
      client_secret: "your client secret",
      redirect_url: "your refresh url"
    });
  }
};

module.exports =  {
  twitterGET: () => {
    const params = {screen_name: 'nodejs'};
    client.twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
      }
    });
  },

  instagramGET: () => {

  },

  facebookGET: () => {

  },

  youtubeGET: () => {
    console.log("inside youtubeGET");
    clients.youtube();
    https://www.googleapis.com/youtube/v3/subscriptions
  }
}
