var express = require('express');
var router = express.Router();
const thanh_toan_thueController = require("../controllers/thanh_toan_thue.controller");
router.get('/', thanh_toan_thueController.getAll);
router.get('/:id',  thanh_toan_thueController.getById);
router.post('/',  thanh_toan_thueController.insert);
router.put('/:id',  thanh_toan_thueController.update);
router.delete('/:id', thanh_toan_thueController.delete);
module.exports = router;
