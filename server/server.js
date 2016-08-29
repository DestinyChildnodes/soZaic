`use strict`;

const express = require(`express`);
const path = require(`path`);
const passport = require('passport');
const app = express();

app.use(express.static(`${__dirname}/../public/client`));

require(`./serverController/middleware.js`)(app, express, passport);
const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Server is running on port 8080`);
