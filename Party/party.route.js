const express = require('express');
const router = express.Router();
const tokenValidator = require("../util/token.validator");
let PartyController = require("./party.controller");

/* GET all party */
router.get('/', PartyController.getAll);

/* GET user logged house parties */
router.get('/myParty', tokenValidator, PartyController.getMyHouseShows);

/* GET house parties */
router.get('/:houseId', PartyController.getHouseShows)

/* POST house party */
router.post('/:houseId', PartyController.createHouseParty);


module.exports = router;