var User = require('../db/schema/usr');
var Msg = require('../db/Schema/msg');
var Friend = require('../db/Schema/friend');
var entries = require('../db/entries');

exports.addUsr = function (data,cb) {
  var user=new User({
    username: data.newUsr,
    password: data.newPwd,
    phone: data.newTel
  });
  user.save(function (err,doc) {
    if(err){
      entries.code=500;
      cb(false, entries);
      console.log("err");
    } else{
      entries.code=0;
      cb(true, entries);
    }
  });
}

exports.findUsr = function(data, cb) {
 //这个地方获取的是从ajax传过来的数据
  User.findOne({username: data.usr
  },function(err,user){
    var usr = (user !== null) ? user.toObject() : '';
    if(err){
      entries.code=500;
      entries.msg='error';
      cb(false, entries);
    } else if(!usr){
      entries.code=500;
      entries.msg='您需要注册';
      cb(false, entries);
    }else if(usr.password !== data.psd){
      entries.code=500;
      entries.msg='密码错误';
      cb(false, entries);
    }else{
      entries.code=0;
      entries.msg='login success';
      entries.data=usr;
      cb(true, entries);
    }
  });
}

exports.searchUsr = function(data, cb) {
  User.find({username: data
  },function(err,users){
        var usrList = new Array();
        for(var i=0;i<users.length;i++) {
          usrList.push(users[i].toObject());
        }
       cb(true,usrList);
  });
}

exports.addMsg = function(data, cb) {
  //这个地方获取的是从ajax传过来的数据
  var userMsg = new Msg({
      usrId: data.userId,
      from: data.from,
      to: data.to,
      content: data.content,
      status: 1
  });
  userMsg.save(function (err) {
    if(err){
      console.log(err)
    } else{
      console.log("user right");
      cb(null,entries);
    }
  })
  var friendMsg = new Msg({
    usrId: data.to,
    from: data.from,
    to: data.to,
    content: data.content,
    status: data.status
  });
  friendMsg.save(function (err) {
    if(err){
      console.log(err);
    } else{
      console.log("friend right");
      cb(null,entries);
    }
  });
}

exports.addFriend = function(data,cb) {
  User.findOne({username: data.username}, function (err, user) {
    var doc = (user !== null) ? user.toObject() : '';
    if (err) {
      console.log("wrong");
    } else {
      var friend = new Friend({
        userId: data.userId,
        friendId: doc._id
      });
      friend.save(function (err, docs) {
        if (err) {
          console.log(err);
          entries.code = 500;
          cb(false, entries);
        } else {
          console.log("right");
          entries.data = docs;
          entries.username = data;
          cb(true, entries);
        }
      });
    }
  });
}

exports.getFriendList = function(data, cb) {
  Friend.find({userId: data})
    .populate('friendId')
    .exec(function(err,docs){
      var friendList = new Array();
      for(var i = 0;i < docs.length; i++) {
        friendList.push(docs[i].toObject());
      }
      cb(true,friendList);
    });
}

exports.initMsg = function(data, cb) {
  Msg.find({usrId: data.userId})
    // .populate('from')
    .exec(function(err,docs){
      var msgList = new Array();
      for(var i = 0;i < docs.length; i++) {
        msgList.push(docs[i].toObject());
      }
      cb(true,msgList);
    });
}
exports.unreadMsg = function(data, cb) {
  Msg.find({usrId: data.userId,to: data.userId,status:0})
  // .populate('from')
    .exec(function(err,docs){
      var msgList = new Array();
      for(var i = 0;i < docs.length; i++) {
        msgList.push(docs[i].toObject());
      }
      cb(true,msgList);
    });
}
exports.setUnreadMsg = function(data, cb) {
  Msg.find({usrId: data.userId,from:data.fid,to: data.userId,status:0})
    .update({$set: {'status': 1}})
    .exec(function(err,docs){
      var msgList = new Array();
      for(var i = 0;i < docs.length; i++) {
        msgList.push(docs[i].toObject());
      }
      cb(true,msgList);
    });
}