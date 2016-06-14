var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var parkingModel = new Schema({
	id : {
		type : Number
	},
	name : {
		type : String
	},
	center : {
		lat : {
			type : Number
		},
		lng : {
			type : Number
		}
	},
	spaces : [{
		id : {
			type : Number
		},
		name : {
			type : String
		},
		parkings : [{
			id : {
				type : Number
			},
			name : {
				type : String
			},
			status : {
				type : String
			}
		}],
		cords : [{
			lat : {
				type : Number
			},
			lng : {
				type : Number
			}
		}]
	}]
})

module.exports = mongoose.model('Parking', parkingModel);