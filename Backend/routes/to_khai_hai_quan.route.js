var express = require('express');
var router = express.Router();
const to_khai_hai_quanController = require("../controllers/to_khai_hai_quan.controller");
router.get('/', to_khai_hai_quanController.getAll);
router.get('/:id',  to_khai_hai_quanController.getById);
router.post('/',  to_khai_hai_quanController.insert);
router.put('/:id',  to_khai_hai_quanController.update);
router.delete('/:id', to_khai_hai_quanController.delete);
module.exports = router;
