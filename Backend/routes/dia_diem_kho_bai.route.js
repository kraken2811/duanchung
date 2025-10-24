var express = require('express');
var router = express.Router();
const dia_diem_kho_baiController = require("../controllers/dia_diem_kho_bai.controller");
router.get('/', dia_diem_kho_baiController.getAll);
router.get('/:id',  dia_diem_kho_baiController.getById);
router.post('/',  dia_diem_kho_baiController.insert);
router.put('/:id',  dia_diem_kho_baiController.update);
router.delete('/:id', dia_diem_kho_baiController.delete);
module.exports = router;
