var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var reservationModel = new Schema({
	spotId : {type: String},
	clientId: {
		type : String
	},
	status: {type: String},
	from: {
		type: Date
	},
	to: {
		type: Date
	},
	date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Reservation', reservationModel);