var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();

// mongoose.connect('mongodb://localhost/myDB');
// var db = mongoose.connection.then(() => //console.log('MongoDB connected...'))
// .catch(error => //console.log(error))

// /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello' });
});

module.exports = router;
