var express = require('express');
var router = express.Router();
const chi_tiet_dieu_chinh_tri_giaController = require("../controllers/chi_tiet_dieu_chinh_tri_gia.controller");
router.get('/', chi_tiet_dieu_chinh_tri_giaController.getAll);
router.get('/:id',  chi_tiet_dieu_chinh_tri_giaController.getById);
router.post('/',  chi_tiet_dieu_chinh_tri_giaController.insert);
router.put('/:id',  chi_tiet_dieu_chinh_tri_giaController.update);
router.delete('/:id', chi_tiet_dieu_chinh_tri_giaController.delete);
module.exports = router;
