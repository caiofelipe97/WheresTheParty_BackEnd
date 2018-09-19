const express = require('express');
const router = express.Router();

/* GET all party */
router.get('/', function (req, res) {
	res.status(200).json([{ name: 'Party'}]);
});

/* GET house party */
router.get('/:houseId', function (req, res) {
	res.status(200).json([{ name: 'Party'}]);
});

module.exports = router;