const express = require('express');
const app = express();


require(`./serverController/middleware.js`)(app, express)

const port = process.env.PORT || 8080
console.log(`Server is running on port 8080`);
app.listen(port);
