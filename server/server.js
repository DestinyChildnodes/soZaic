const express = require('express');
const app = express();
const Twitter = require('twitter');

app.use(express.static(`${__dirname}/../client`));

console.log(`Server is running on port 8080`);
app.listen(8080);


