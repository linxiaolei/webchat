var mongoose = require('../db');
var Schema = mongoose.Schema;

var friendSchema = new Schema({
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'usr'//关联usr表
  },
  friendId:{
    type: Schema.Types.ObjectId,
    ref: 'usr'//关联usr表
  }
});

var Friend = mongoose.model('friend',friendSchema );
module.exports = Friend;