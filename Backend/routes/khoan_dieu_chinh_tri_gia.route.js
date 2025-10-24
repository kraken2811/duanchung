var express = require('express');
var router = express.Router();
const khoan_dieu_chinh_tri_giaController = require("../controllers/khoan_dieu_chinh_tri_gia.controller");
router.get('/', khoan_dieu_chinh_tri_giaController.getAll);
router.get('/:id',  khoan_dieu_chinh_tri_giaController.getById);
router.post('/',  khoan_dieu_chinh_tri_giaController.insert);
router.put('/:id',  khoan_dieu_chinh_tri_giaController.update);
router.delete('/:id', khoan_dieu_chinh_tri_giaController.delete);
module.exports = router;
