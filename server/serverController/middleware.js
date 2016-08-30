const bodyParser  = require('body-parser');
const session = require('express-session');


module.exports = function(app, express, passport, key) {
  const twitterRouter = express.Router();
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

  const oAuthYouTube = express.Router();
  // const youTube = express.router();


  //TODO: need facebook, instagram, youtube

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(`${__dirname}/../../client`));

  //TODO: Need to add passport OAUTH


  app.use(`/api/twitter`, twitterRouter);


  require(`../pageController/Routes/twitterRoutes`)(twitterRouter, passport, key);
}
