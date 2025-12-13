var express = require('express');
var router = express.Router();
const lich_su_trang_thaiController = require("../controllers/lich_su_trang_thai.controller");
router.get('/', lich_su_trang_thaiController.getAll);
router.get('/:id',  lich_su_trang_thaiController.getById);
router.post('/',  lich_su_trang_thaiController.insert);
router.put('/:id',  lich_su_trang_thaiController.update);
router.delete('/:id', lich_su_trang_thaiController.delete);
module.exports = router;
