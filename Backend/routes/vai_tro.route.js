var express = require('express');
var router = express.Router();
const vai_troController = require("../controllers/vai_tro.controller");
router.get('/', vai_troController.getAll);
router.get('/:id',  vai_troController.getById);
router.post('/',  vai_troController.insert);
router.put('/:id',  vai_troController.update);
router.delete('/:id', vai_troController.delete);
module.exports = router;
