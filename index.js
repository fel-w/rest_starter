const express = require('express');
const bodyParser = require('body-parser');

// set up express app
const app = express();

// get body json
app.use(bodyParser.json());

// initialize routes
app.use('/api/ninjas', require('./routes/router'));

// listen for requests
app.listen(process.env.port || 4000, () => {
    console.log("now listening...");
});