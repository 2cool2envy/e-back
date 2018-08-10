var express = require('express');
var app = express();
var http = require('http');
var fs = require("fs");
var bodyParser = require('body-parser');
var path    = require("path");
const mongoose = require('mongoose');
const categoryR =  require('./routes/categoryR');
const productR =  require('./routes/productR');
const feedbackR =  require('./routes/feedbackR');
const userR =  require('./routes/userR');
const imageR =  require('./routes/imageSliderR');
global.config = require('./config/config');
const jwt    = require('jsonwebtoken');

var mongoOk = false;
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.static(__dirname + '/public'));

var mongoURI = 'mongodb://admin:admin@ds139690.mlab.com:39690/cats';
mongoose.connect(mongoURI);  

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {

  
  //res.render('index.html')

});


mongoose.connection.on("open", function(ref) {
    console.log(ref);
    mongoOk = true;
    app.use('/', categoryR);
    app.use('/', productR);
    app.use('/', userR);
    app.use('/', feedbackR);
    app.use('/', imageR);
  console.log("Connected to mongo server."); 
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
 //console.log("Could not connect to mongo server!" , err);
  mongoOk = false;
  // res.setHeader('Content-Type', 'application/json');
  // res.send(JSON.stringify({ a: 1 }, null, 3));

});


var server = app.listen(process.env.PORT || 1000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})