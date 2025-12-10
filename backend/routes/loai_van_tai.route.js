var express = require('express');
var router = express.Router();
const loai_van_taiController = require("../controllers/loai_van_tai.controller");
router.get('/', loai_van_taiController.getAll);
router.get('/:id',  loai_van_taiController.getById);
router.post('/',  loai_van_taiController.insert);
router.put('/:id',  loai_van_taiController.update);
router.delete('/:id', loai_van_taiController.delete);
module.exports = router;
