var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var parkingModel = new Schema({
	parkingUid:{type: String},
	owner:{type: String},
	perHourRate:{type: String},
	allocated:{type: Boolean, default:false},
	address: {type: String},
	reserved:{type: Boolean, default:false},
})

module.exports = mongoose.model('Parking', parkingModel);