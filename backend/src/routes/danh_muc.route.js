var express = require('express');
var router = express.Router();
const danh_mucController = require("../controllers/danh_muc.controller");
router.get('/', danh_mucController.getAll);
router.get('/:id',  danh_mucController.getById);
router.post('/',  danh_mucController.insert);
router.put('/:id',  danh_mucController.update);
router.delete('/:id', danh_mucController.delete);
module.exports = router;
