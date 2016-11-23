var mongoose = require('../db');
var Schema = mongoose.Schema;

var msgSchema = new Schema({
  usrId:{
    type: Schema.Types.ObjectId,
    ref: 'usr'//关联usr表
  },
  from:{
    type: Schema.Types.ObjectId,
    ref: 'usr'//关联usr表
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'usr'//关联usr表
  },
  content: String,
  status: Number,
  meta: {
    updateAt: {type:Date, default: Date.now()},
    createAt: {type:Date, default: Date.now()}
  }
});
msgSchema.pre('save', function (next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else{
    this.meta.updateAt = Date.now();
  }
  next();
})

var Msg = mongoose.model('message',msgSchema);
module.exports = Msg;