const express = require('express');
const app = express();


app.use(express.static(`${__dirname}/../client`));
const port = process.env.PORT || 8080
console.log(`Server is running on port 8080`);
app.listen(port);
