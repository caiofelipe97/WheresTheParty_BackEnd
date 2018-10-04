const express = require('express');
const router = express.Router();

/* GET all houses */
router.get('/', function (req, res) {
	res.status(200).json({ name: 'House'});
});

module.exports = router;