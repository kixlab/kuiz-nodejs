var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var loadMade = require("../middlewares/user/history/loadMadeMiddleware")
var loadSolved = require("../middlewares/user/history/loadSolvedMiddleware")
router.get('/history/made', loadMade)// , 

module.exports = router;
