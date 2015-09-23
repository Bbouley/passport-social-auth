var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create User Schema

var User = new Schema ({
  name : {type : String, required : true, index: {unique:true}},
  // password : {type : String, required: true},
  // email: {type: String, required : true},
  oauthID : String
});

module.exports = mongoose.model('users', User);

