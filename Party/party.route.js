const express = require('express');
const router = express.Router();
const tokenValidator = require("../util/token.validator");
let PartyController = require("./party.controller");

/* GET all party */
router.get('/', PartyController.getAll);

/* GET house parties */
router.get('/myParty', tokenValidator, PartyController.getHouseShows);

/* POST house party */
router.post('/:houseId',tokenValidator, PartyController.createHouseParty);


module.exports = router;