// Import
const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

// Instantiate
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.MONGODB_URI || dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to the Cardaoke REST API."});
});

// Require routes
require('./app/routes/card.routes.js')(app);

// listen for requests
var server = app.listen(process.env.PORT || 8080, () => {
    var port = server.address().port;
    console.log("Server is listening on port " + port);
});