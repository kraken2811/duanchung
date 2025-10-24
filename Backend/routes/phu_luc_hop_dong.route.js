var express = require('express');
var router = express.Router();
const phu_luc_hop_dongController = require("../controllers/phu_luc_hop_dong.controller");
router.get('/', phu_luc_hop_dongController.getAll);
router.get('/:id',  phu_luc_hop_dongController.getById);
router.post('/',  phu_luc_hop_dongController.insert);
router.put('/:id',  phu_luc_hop_dongController.update);
router.delete('/:id', phu_luc_hop_dongController.delete);
module.exports = router;
