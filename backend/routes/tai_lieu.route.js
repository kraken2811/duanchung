var express = require('express');
var router = express.Router();
const tai_lieuController = require("../controllers/tai_lieu.controller");
router.get('/', tai_lieuController.getAll);
router.get('/:id',  tai_lieuController.getById);
router.post('/',  tai_lieuController.insert);
router.put('/:id',  tai_lieuController.update);
router.delete('/:id', tai_lieuController.delete);
module.exports = router;
