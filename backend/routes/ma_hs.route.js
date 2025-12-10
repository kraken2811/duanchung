var express = require('express');
var router = express.Router();
const ma_hsController = require("../controllers/ma_hs.controller");
router.get('/', ma_hsController.getAll);
router.get('/:id',  ma_hsController.getById);
router.post('/',  ma_hsController.insert);
router.put('/:id',  ma_hsController.update);
router.delete('/:id', ma_hsController.delete);
module.exports = router;
