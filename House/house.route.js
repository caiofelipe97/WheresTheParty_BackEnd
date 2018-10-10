const express = require('express');
const router = express.Router();
const tokenValidator = require("../util/token.validator");
let HouseController = require('./house.controller');

/* GET all houses */
router.get('/', HouseController.getAll);

/*GET user logged House*/
router.get('/myHouse', tokenValidator, HouseController.getUserHouse);

/*PUT user logged House*/
router.put('/', tokenValidator, HouseController.updateHouse);

module.exports = router;