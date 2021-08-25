var express = require('express');
var router = express.Router();
// import * as authControllers from '../middlewares/auth';
//check auth related middleware
var checkInClass = require('../middlewares/class/checkInClassMiddleware')
var checkIsUser = require('../middlewares/auth/checkIsUserMiddleware')
//class related middleware
var createClass = require('../middlewares/class/createClassMiddleware')
var joinClass = require('../middlewares/class/joinClassMiddleware')
var loadClass = require('../middlewares/class/loadClassMiddleware')
//question related middleware
var createQuestion = require("../middlewares/class/question/createQuestionMiddleware")
var deleteQuestion = require("../middlewares/class/question/deleteQuestionMiddleware")
var modifyQuestion = require("../middlewares/class/question/modifyQuestionMiddleware")
var loadQuestion = require("../middlewares/class/question/loadQuestionMiddleware")
//feedback related middleware
var createFeedback = require("../middlewares/class/feedback/createFeedbackMiddleware")
var deleteFeedback = require("../middlewares/class/feedback/deleteFeedbackMiddleware")
var loadFeedback = require("../middlewares/class/feedback/loadFeedbackMiddleware")

router.post('/create', checkIsUser, createClass)
router.post('/join', checkIsUser, joinClass)
router.get('/load', checkIsUser, loadClass)

router.get('/question/load', checkIsUser, checkInClass, loadQuestion)
router.post('/question/create',checkIsUser, checkInClass, createQuestion);
router.post('/question/delete',checkIsUser, checkInClass, deleteQuestion);
router.post('/question/modify',checkIsUser, checkInClass, modifyQuestion);

router.get('/feedback/load',checkIsUser, loadFeedback)
router.post('/feedback/create', checkIsUser, checkInClass, createFeedback);
router.post('/feedback/delete', checkIsUser, checkInClass, deleteFeedback)

module.exports = router;
