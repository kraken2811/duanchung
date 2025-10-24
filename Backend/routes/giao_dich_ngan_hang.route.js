var express = require('express');
var router = express.Router();
const giao_dich_ngan_hangController = require("../controllers/giao_dich_ngan_hang.controller");
router.get('/', giao_dich_ngan_hangController.getAll);
router.get('/:id',  giao_dich_ngan_hangController.getById);
router.post('/',  giao_dich_ngan_hangController.insert);
router.put('/:id',  giao_dich_ngan_hangController.update);
router.delete('/:id', giao_dich_ngan_hangController.delete);
module.exports = router;
