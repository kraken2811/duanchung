var express = require('express');
var router = express.Router();
const van_ban_giay_phepController = require("../controllers/van_ban_giay_phep.controller");
router.get('/', van_ban_giay_phepController.getAll);
router.get('/:id',  van_ban_giay_phepController.getById);
router.post('/',  van_ban_giay_phepController.insert);
router.put('/:id',  van_ban_giay_phepController.update);
router.delete('/:id', van_ban_giay_phepController.delete);
module.exports = router;
