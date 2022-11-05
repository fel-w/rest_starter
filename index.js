const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

// serve public files
app.use(express.static('public'));

// get body json
app.use(bodyParser.json());

// initialize routes
app.use('/api/ninjas', require('./routes/router'));

// error handling middle ware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(422).send({'error':err._message});
})

// listen for requests
app.listen(process.env.port || 4000, () => {
    console.log("now listening...");
});