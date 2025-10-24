var express = require('express');
var router = express.Router();
const thong_bao_he_thongController = require("../controllers/thong_bao_he_thong.controller");
router.get('/', thong_bao_he_thongController.getAll);
router.get('/:id',  thong_bao_he_thongController.getById);
router.post('/',  thong_bao_he_thongController.insert);
router.put('/:id',  thong_bao_he_thongController.update);
router.delete('/:id', thong_bao_he_thongController.delete);
module.exports = router;
