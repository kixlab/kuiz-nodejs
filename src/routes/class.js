var express = require('express');
var router = express.Router();
// import * as authControllers from '../middlewares/auth';
//check auth related middleware
var checkInClass = require('../middlewares/class/checkInClassMiddleware')
//요청 보낼 때 유저가 해당 반에 들어가있는지 체크
//ex) 


var checkIsUser = require('../middlewares/auth/checkIsUserMiddleware')
//class related middleware
var createClass = require('../middlewares/class/createClassMiddleware')
var joinClass = require('../middlewares/class/joinClassMiddleware')
var loadClass = require('../middlewares/class/loadClassMiddleware')
//class 선택할 때 해당 유저에게 어떤 클래스 있는지 다 불러오기 위한 api
//question related middleware
var createQuestion = require("../middlewares/class/question/createQuestionMiddleware")
//var deleteQuestion = require("../middlewares/class/question/deleteQuestionMiddleware")
//var modifyQuestion = require("../middlewares/class/question/modifyQuestionMiddleware")
var loadQuestion = require("../middlewares/class/question/loadQuestionMiddleware")
//feedback related middleware
var createFeedback = require("../middlewares/class/feedback/createFeedbackMiddleware")
//var deleteFeedback = require("../middlewares/class/feedback/deleteFeedbackMiddleware")
var loadFeedback = require("../middlewares/class/feedback/loadFeedbackMiddleware")

var getLikes = require("../middlewares/class/question/getLikesMiddleware")
var solveQuestion = require('../middlewares/class/question/solveQuestionMiddleware')



router.post('/create', checkIsUser, createClass)
router.post('/join', joinClass)
router.get('/load', checkIsUser, loadClass)

router.get('/question/load', loadQuestion)// , checkIsUser, checkInClass <- 이거 추가 해야함
router.post('/question/create', createQuestion); // ,checkIsUser, checkInClass <- 이거 추가 해야함
router.get('/question/likes', getLikes)
router.post('/question/solve',solveQuestion)
//router.post('/question/delete',checkIsUser, checkInClass, deleteQuestion);
//router.post('/question/modify',checkIsUser, checkInClass, modifyQuestion);

router.get('/feedback/load',checkIsUser, loadFeedback)
router.post('/feedback/create', checkIsUser, checkInClass, createFeedback);
//router.post('/feedback/delete', checkIsUser, checkInClass, deleteFeedback)

module.exports = router;
