var express = require('express');
var router = express.Router();
var db = require('../dbconfig');
var ObjectId = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  db.get().collection('mongocollection')
  .find({})
  .toArray(function(err, result) {
      if(err) throw err;
      res.render('index', { title: 'Express', data: JSON.stringify(result, null, 4) });
  });
});

module.exports = router;
