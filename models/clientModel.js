var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var clientModel = new Schema({
	id : {
		type : Number
	},
	name : {
		type : String
	},
	balance: {
		type : Number
	}
})

module.exports = mongoose.model('client', clientModel);