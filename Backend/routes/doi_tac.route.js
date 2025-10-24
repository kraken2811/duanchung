var express = require('express');
var router = express.Router();
const doi_tacController = require("../controllers/doi_tac.controller");
router.get('/', doi_tacController.getAll);
router.get('/:id',  doi_tacController.getById);
router.post('/',  doi_tacController.insert);
router.put('/:id',  doi_tacController.update);
router.delete('/:id', doi_tacController.delete);
module.exports = router;
