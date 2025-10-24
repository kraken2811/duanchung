var express = require('express');
var router = express.Router();
const to_khai_tri_giaController = require("../controllers/to_khai_tri_gia.controller");
router.get('/', to_khai_tri_giaController.getAll);
router.get('/:id',  to_khai_tri_giaController.getById);
router.post('/',  to_khai_tri_giaController.insert);
router.put('/:id',  to_khai_tri_giaController.update);
router.delete('/:id', to_khai_tri_giaController.delete);
module.exports = router;
