var express = require('express');
var router = express.Router();
const phan_hoi_hai_quanController = require("../controllers/phan_hoi_hai_quan.controller");
router.get('/', phan_hoi_hai_quanController.getAll);
router.get('/:id',  phan_hoi_hai_quanController.getById);
router.post('/',  phan_hoi_hai_quanController.insert);
router.put('/:id',  phan_hoi_hai_quanController.update);
router.delete('/:id', phan_hoi_hai_quanController.delete);
module.exports = router;
