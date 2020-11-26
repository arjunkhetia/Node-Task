var express = require("express");
var router = express.Router();
var db = require("../dbconfig");
var ObjectId = require("mongodb").ObjectID;
const { body, validationResult } = require('express-validator');

router.get("/", function (req, res, next) {
  db.get()
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});

router.post("/", [
  body('name')
    .not().isEmpty()
    .trim(),
  body('email')
    .not().isEmpty()
    .trim()
    .isEmail(),
  body('contact')
    .not().isEmpty()
    .trim()
    .isLength({ max: 15 }),
], function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  db.get()
    .collection("users")
    .insertOne(req.body, function (err, result) {
      if (err) throw err;
      res.send(result);
    })
});

router.put("/:id", [
  body('name')
    .not().isEmpty()
    .trim(),
  body('email')
    .not().isEmpty()
    .trim()
    .isEmail(),
  body('contact')
    .not().isEmpty()
    .trim()
    .isLength({ max: 15 }),
], function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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
