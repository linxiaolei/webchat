var express = require('express')
var router = express.Router();
var dbHelper = require('../db/dbHelper');
// var User = require('../db/Schema/usr');

/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('login', {layout:'main'});
});
router.post('/login', function(req, res,next) {
  dbHelper.findUsr(req.body, function (success, doc) {
    req.session.user = doc.data;
    res.send(doc);
  });
});
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/login');
});
router.get('/register', function(req, res, next) {
  res.render('register', {layout:'main'});
});
router.post('/register', function(req, res, next) {
  dbHelper.addUsr(req.body,function (success,doc) {
    res.send(doc);
  })
});

router.post('/search', function(req, res, next) {
  var keyword = req.body.keyword;
  var pattern = new RegExp(keyword, "i");
  dbHelper.searchUsr(pattern, function (success, doc) {
    res.send(doc);
  });
});

module.exports = router;
