var express = require('express');
var router = express.Router();
const chi_tiet_to_khaiController = require("../controllers/chi_tiet_to_khai.controller");
router.get('/', chi_tiet_to_khaiController.getAll);
router.get('/:id',  chi_tiet_to_khaiController.getById);
router.post('/',  chi_tiet_to_khaiController.insert);
router.put('/:id',  chi_tiet_to_khaiController.update);
router.delete('/:id', chi_tiet_to_khaiController.delete);
module.exports = router;
