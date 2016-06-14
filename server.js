var express = require('express'),
 mongoose = require('mongoose'),
 bodyParser = require("body-parser");

//var db = mongoose.connect('mongodb://localhost/parkingAPI');
var db = mongoose.connect('mongodb://ynmanware:p2ssw0rd@ds028559.mlab.com:28559/parkingonrent');

var Parking = require('./models/parkingModel');

var app = express();

var port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

var parkingRouter = require('./routes/parkingRoutes')(Parking);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', parkingRouter);

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'jade');
app.set('jsonp callback name', 'cb')

app.get('/', function(req, res){
    res.render("index.html");
});



app.listen(process.env.PORT || 5000, function(err){
    console.log("running server on port : " + port);
});