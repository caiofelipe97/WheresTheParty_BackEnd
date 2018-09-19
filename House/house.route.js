const express = require('express');
const router = express.Router();

/* GET user perf. */
router.get('/', function (req, res) {
	res.status(200).json({ name: 'House'});
});

module.exports = router;