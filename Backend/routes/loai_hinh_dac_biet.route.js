var express = require('express');
var router = express.Router();
const loai_hinh_dac_bietController = require("../controllers/loai_hinh_dac_biet.controller");
router.get('/', loai_hinh_dac_bietController.getAll);
router.get('/:id',  loai_hinh_dac_bietController.getById);
router.post('/',  loai_hinh_dac_bietController.insert);
router.put('/:id',  loai_hinh_dac_bietController.update);
router.delete('/:id', loai_hinh_dac_bietController.delete);
module.exports = router;
