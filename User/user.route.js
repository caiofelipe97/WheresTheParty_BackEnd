const express = require('express');
const router = express.Router();
const tokenValidator = require("../util/token.validator");
let UserController = require('./user.controller');


/* GET user perf. */
router.get('/myProfile', tokenValidator, UserController.getUser);

/* POST user */
router.post('/', UserController.register);

router.put('/',tokenValidator, UserController.updateUser);

/* LOGIN user */
router.post('/login', UserController.login);

module.exports = router;