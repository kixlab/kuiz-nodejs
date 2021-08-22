var express = require('express');
var router = express.Router();
// import * as authControllers from '../middlewares/auth';
var createClassMiddleware = require('../middlewares/class/createClassMiddleware')
var joinClassMiddleware = require('../middlewares/class/joinClassMiddleware')

// router.get ('/', authControllers.authCheck);
router.post('/create',createClassMiddleware)
router.post('/join',joinClassMiddleware)
// router.get ('/login', authControllers.login);
// router.post ('/login/callback', authControllers.loginCallback);
// router.get ('/logout', authControllers.logout);
// router.get ('/unregister', authControllers.unregister);

module.exports = router;
