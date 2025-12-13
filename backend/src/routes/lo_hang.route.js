var express = require('express');
var router = express.Router();
const lo_hangController = require("../controllers/lo_hang.controller");
router.get('/', lo_hangController.getAll);
router.get('/:id',  lo_hangController.getById);
router.post('/',  lo_hangController.insert);
router.put('/:id',  lo_hangController.update);
router.delete('/:id', lo_hangController.delete);
module.exports = router;
