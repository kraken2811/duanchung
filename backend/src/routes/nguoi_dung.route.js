var express = require('express');
var router = express.Router();
const nguoi_dungController = require("../controllers/nguoi_dung.controller");
router.get('/', nguoi_dungController.getAll);
router.get('/:id',  nguoi_dungController.getById);
router.post('/',  nguoi_dungController.insert);
router.put('/:id',  nguoi_dungController.update);
router.delete('/:id', nguoi_dungController.delete);
module.exports = router;
