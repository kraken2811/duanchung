var express = require('express');
var router = express.Router();
const vat_lieu_hop_dongController = require("../controllers/vat_lieu_hop_dong.controller");
router.get('/', vat_lieu_hop_dongController.getAll);
router.get('/:id',  vat_lieu_hop_dongController.getById);
router.post('/',  vat_lieu_hop_dongController.insert);
router.put('/:id',  vat_lieu_hop_dongController.update);
router.delete('/:id', vat_lieu_hop_dongController.delete);
module.exports = router;
