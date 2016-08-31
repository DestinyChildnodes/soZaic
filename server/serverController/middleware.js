"use strict";

const bodyParser  = require('body-parser');
const session = require('express-session');


module.exports = (app, express, passport, key) => {
 const twitterRouter = express.Router();
 const youTubeRouter = express.Router();
 const facebookRouter = express.Router();
 const instagramRouter = express.Router();
 const routeHelper = option => `../pageController/Routes/${option}`;

 app.use(passport.initialize());
 app.use(passport.session());
 app.use(session({ secret: 'keyboard cat',
   resave: true,
   saveUninitialized: true,
   cookie: { maxAge: 60000 }}));
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(bodyParser.json());
 app.use(express.static(`${__dirname}/../../client`));

 //Routing
 app.use(`/api/youTube`, youTubeRouter);
 app.use(`/api/twitter`, twitterRouter);
 app.use(`/api/instagram`, instagramRouter);
 app.use(`/api/facebook`, facebookRouter);

 require(routeHelper(`twitterRoutes`))(twitterRouter, passport, key);
 require(routeHelper(`youTubeRoutes`))(youTubeRouter, passport, key);
 require(routeHelper(`facebookRoutes`))(facebookRouter, passport, key);
 require(routeHelper(`instagramRoutes`))(instagramRouter, passport, key);
}
