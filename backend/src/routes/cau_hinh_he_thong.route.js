var express = require('express');
var router = express.Router();
const cau_hinh_he_thongController = require("../controllers/cau_hinh_he_thong.controller");
router.get('/', cau_hinh_he_thongController.getAll);
router.get('/:id',  cau_hinh_he_thongController.getById);
router.post('/',  cau_hinh_he_thongController.insert);
router.put('/:id',  cau_hinh_he_thongController.update);
router.delete('/:id', cau_hinh_he_thongController.delete);
module.exports = router;
