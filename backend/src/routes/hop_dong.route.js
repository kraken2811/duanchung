var express = require('express');
var router = express.Router();
const hop_dongController = require("../controllers/hop_dong.controller");
router.get('/', hop_dongController.getAll);
router.get('/:id',  hop_dongController.getById);
router.post('/',  hop_dongController.insert);
router.put('/:id',  hop_dongController.update);
router.delete('/:id', hop_dongController.delete);
module.exports = router;
