var express = require("express");
var router = express.Router();
var db = require("../dbconfig");
var ObjectId = require("mongodb").ObjectID;

router.get("/", function (req, res, next) {
  db.get()
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});

router.post("/", function (req, res, next) {
  db.get()
    .collection("users")
    .insertOne(req.body, function (err, result) {
      if (err) throw err;
      res.send(result);
    })
});

router.put("/:id", function (req, res, next) {
  db.get()
    .collection("users")
    .updateOne({_id: ObjectId(req.params.id)}, { $set: req.body }, function (err, result) {
      if (err) throw err;
      res.send(result);
    })
});

router.delete("/:id", function (req, res, next) {
  db.get()
    .collection("users")
    .deleteOne({_id: ObjectId(req.params.id)}, function (err, result) {
      if (err) throw err;
      res.send(result);
    })
});

module.exports = router;
