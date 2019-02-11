/*
	USER SCHEMA
*/
var mongoose = require('mongoose');  

var UserSchema = new mongoose.Schema({  
 	name: String,
  	email: String,
  	password: String,
  	validation: {
  		type: Boolean,
  		default: false
  	},
  	rol: {
  		type: Number,
  		default: 5
  	},
  	description: String
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');