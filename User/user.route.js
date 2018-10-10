const express = require('express');
const router = express.Router();
let UserController = require('./user.controller');


/* GET user perf. */
router.get('/me', UserController.getUser);

/* POST user */
router.post('/', UserController.register);

/* LOGIN user */
router.post('/login', UserController.login);

module.exports = router;