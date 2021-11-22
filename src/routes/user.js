var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var loadMade = require("../middlewares/user/history/loadMadeMiddleware")
var loadSolved = require("../middlewares/user/history/loadSolvedMiddleware")
var loadComment = require('../middlewares/user/history/loadCommentMiddleware')

var likeQuestion = require('../middlewares/class/question/likeQuestionMiddleware')
router.get('/history/made', loadMade)// , 
router.get('/history/solved',loadSolved)
router.post('/question/like', likeQuestion)
router.get('/history/comment', loadComment)

module.exports = router;
