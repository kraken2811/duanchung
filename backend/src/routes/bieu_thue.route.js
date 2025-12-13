var express = require('express');
var router = express.Router();
const bieu_thueController = require("../controllers/bieu_thue.controller");
router.get('/', bieu_thueController.getAll);
router.get('/:id',  bieu_thueController.getById);
router.post('/',  bieu_thueController.insert);
router.put('/:id',  bieu_thueController.update);
router.delete('/:id', bieu_thueController.delete);
module.exports = router;
