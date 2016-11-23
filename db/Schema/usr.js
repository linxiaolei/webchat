var mongoose = require('../db');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  phone: String
});
var User=mongoose.model('usr',userSchema);
module.exports = User;
