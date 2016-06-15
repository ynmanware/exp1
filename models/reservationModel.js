var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var reservationModel = new Schema({
	spot : {
		areaId: {type: Number},
		spaceId : {type: Number},
		spotId : {type: Number},
		status : {type: String}
	},
	clientId: {
		type : Number
	},
	from: {
		type: DateTime
	},
	to: {
		type: DateTime
	}
})

module.exports = mongoose.model('Reservation', reservationModel);