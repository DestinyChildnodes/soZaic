const Twitter = require('twitter');
const key = require('./apiKeys.js')

const client = {
  instagram: () => {
    api.use({
      client_id: key.instagram.ClientID,
      client_secret: key.instagram.ClientSecret
    });

  },

  facebook: {

  },

  youtube: {

  }
};

module.exports =  {
  twitterGET: (token, screen_name, callback) => {
    var client = new Twitter({
      consumer_key: key.twitter.TWITTER_CONSUMER_KEY,
      consumer_secret: key.twitter.TWITTER_CONSUMER_SECRET,
      access_token_key: token.access_token_key,
      access_token_secret: token.access_token_secret
    })

    const params = {screen_name: screen_name};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) {
        console.error(error);
      } else {
        callback(tweets);
      }
    });
  },

  instagramGET: () => {

  },

  facebookGET: () => {

  },

  youtubeGET: () => {

  }
}
