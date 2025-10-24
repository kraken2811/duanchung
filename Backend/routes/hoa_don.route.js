var express = require('express');
var router = express.Router();
const hoa_donController = require("../controllers/hoa_don.controller");
router.get('/', hoa_donController.getAll);
router.get('/:id',  hoa_donController.getById);
router.post('/',  hoa_donController.insert);
router.put('/:id',  hoa_donController.update);
router.delete('/:id', hoa_donController.delete);
module.exports = router;
