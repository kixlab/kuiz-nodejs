var express = require('express');
var router = express.Router();
// import * as authControllers from '../middlewares/auth';
var registerMiddleware = require('../middlewares/auth/registerMiddleware')
// router.get ('/', authControllers.authCheck);
router.post('/register',registerMiddleware)

// router.get ('/login', authControllers.login);
// router.post ('/login/callback', authControllers.loginCallback);
// router.get ('/logout', authControllers.logout);
// router.get ('/unregister', authControllers.unregister);

module.exports = router;
