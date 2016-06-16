var express = require('express'),
 mongoose = require('mongoose'),
 bodyParser = require("body-parser");
 var cron = require('node-schedule');
 
// var db = mongoose.connect('mongodb://localhost/parkingAPI');

   var db = mongoose.connect('mongodb://ynmanware:p2ssw0rd@ds028559.mlab.com:28559/parkingonrent');

var Parking = require('./models/parkingModel');

var Reservation = require('./models/reservationModel');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))


var parkingRouter = require('./routes/parkingRoutes')(Parking);
var reservationRouter = require('./routes/reservationRoutes')(Reservation, Parking);

var rule = new cron.RecurrenceRule();

/*rule.second = 60;
cron.scheduleJob(rule, function(){
    Parking.find(null, function(err, parkings) {
				if (err) {
					console.log(err);
				} else {
					console.log("run: " + JSON.stringify(parkings));
				}
			})
});*/

app.use('/api', parkingRouter);
app.use('/res', reservationRouter);


app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'jade');
app.set('jsonp callback name', 'cb')

app.get('/', function(req, res){
    res.render("index.html");
});



app.listen(process.env.PORT || 5000, function(err){
    console.log("running server on port : " + 5000);
});