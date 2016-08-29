const bodyParser  = require('body-parser');

module.exports = function(app, express) {

  const oAuthYouTube = express.Router();
  const youTube = express.router();

  const twitterRouter = express.Router();

  //TODO: need facebook, instagram, youtube

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(`${__dirname}/../../client`));

  //TODO: Need to add passport OAUTH


  app.use(`/api/twitter`, twitterRouter);
  require(`../pageController/Twitter/twitterRoutes`)(twitterRouter);
}
