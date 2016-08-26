const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: 'e9oSfxXtRTWObrcyB8dbKe8B4',
  consumer_secret: 'o6gIdU576vUmYcqq3Bzk1Fo0LHJ0utKP6RcpTGOSxPXD7ORDAp',
  access_token_key: '2909473447-WwTgSwukO5PNsJAMVQx1UgGlLvtFWJtvKlhq8JZ',
  access_token_secret: 'Ps8CAqDuT7QxRV5pgj5pni2XpDTCzj6zFjoCHl9xQgdnJ'
});
 
const params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

