var express = require('express'),
 mongoose = require('mongoose'),
 bodyParser = require("body-parser");

var db = mongoose.connect('mongodb://localhost/parkingAPI');
var Parking = require('./models/parkingModel');


var app = express();

var port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

var parkingRouter = require('./routes/parkingRoutes')(Parking);

app.use('/api', parkingRouter);


app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
    res.render("index");
});

app.listen(port, function(err){
    console.log("running server on port : " + port);
});