var express = require('express');
var router = express.Router();
const san_pham_hop_dongController = require("../controllers/san_pham_hop_dong.controller");
router.get('/', san_pham_hop_dongController.getAll);
router.get('/:id',  san_pham_hop_dongController.getById);
router.post('/',  san_pham_hop_dongController.insert);
router.put('/:id',  san_pham_hop_dongController.update);
router.delete('/:id', san_pham_hop_dongController.delete);
module.exports = router;
