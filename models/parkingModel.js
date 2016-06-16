var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var parkingModel = new Schema({
	id : {
		type : String
	},
	name : {
		type : String
	},
	center : [{type: Number}],
	spaces : [{
		id : {
			type : String
		},
		name : {
			type : String
		},
		loc : [{type: Number}],
		owner : {
			id :{
			type : String
			},
			name: {
			type : String	
			}
		},
		rating : {
			poor: {
				type : Number
			},
			average: {
				type : Number
			},
			good: {
				type : Number
			},
			excellent: {
				type : Number
			}
		},
		slots : [{
			id : {
				type : String
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