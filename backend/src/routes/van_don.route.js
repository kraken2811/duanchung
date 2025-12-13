var express = require('express');
var router = express.Router();
const van_donController = require("../controllers/van_don.controller");
router.get('/', van_donController.getAll);
router.get('/:id',  van_donController.getById);
router.post('/',  van_donController.insert);
router.put('/:id',  van_donController.update);
router.delete('/:id', van_donController.delete);
module.exports = router;
