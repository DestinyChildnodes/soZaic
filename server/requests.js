const Twitter = require('twitter');
const key = require('apiKey.js')
const client = new Twitter({
  consumer_key: key.TWITTER_CONSUMER_KEY,
  consumer_secret: key.TWITTER_CONSUMER_SECRET,
  access_token_key: key.TWITTER_ACCESS_TOKEN,
  access_token_secret: key.TWITTER_ACCESS_TOKEN_SECRET
});

const params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
