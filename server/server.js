`use strict`;

const express = require(`express`);
const path = require(`path`);
const app = express();

app.use(express.static(`${__dirname}/../public/client`));
// console.log(`${__dirname}/../node_modules`);
// app.use(express.static(`${__dirname}\..\node_modules`));
const port = process.env.PORT || 8080;
app.listen(port);
