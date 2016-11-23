var express = require('express');
var router = express.Router();
var entries = require('../db/entries');
var dbHelper = require('../db/dbHelper');

router.get('/chat', function(req, res, next) {
  res.render('chat', {title: 'Express', layout: 'main'});
});

router.post('/getFriendList', function(req, res, next) {
  dbHelper.getFriendList(req.session.user._id, function (success, doc) {
    res.send(doc);
  });
});

router.post('/addFriend', function(req, res, next) {
  dbHelper.addFriend(req.body,function (success, doc) {
    res.send(doc);
  });
});

router.post('/initMsg', function(req, res, next) {
  dbHelper.initMsg(req.body,function (success, doc) {
    res.send(doc);
  });
});

router.post('/unreadMsg', function(req, res, next) {
  dbHelper.unreadMsg(req.body,function (success, doc) {
    res.send(doc);
  });
});

router.post('/setUnreadMsg', function(req, res, next) {
  dbHelper.setUnreadMsg(req.body,function (success, doc) {
    res.send(doc);
  });
});

module.exports = router;
