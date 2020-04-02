var express = require('express');
var router = express.Router();

let db = require('../server/config/db');

/* POST login page */
router.post('/', function(req, res, next) {
  var currentData = req.body;
  console.log(currentData);
});

module.exports = router;
