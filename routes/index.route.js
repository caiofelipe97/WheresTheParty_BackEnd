const express = require('express');
const router = express.Router();
const user = require ('../User/user.route');
const house = require ('../House/house.route');
const party = require ('../Party/party.route');

router.use('/user', user);
router.use('/house', house);
router.use('/party', party);

module.exports = router;