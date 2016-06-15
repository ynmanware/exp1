var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var parkingModel = new Schema({
	id : {
		type : String
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
			type : String
		},
		name : {
			type : String
		},
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