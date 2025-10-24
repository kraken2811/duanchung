var express = require('express');
var router = express.Router();
const log_tich_hopController = require("../controllers/log_tich_hop.controller");
router.get('/', log_tich_hopController.getAll);
router.get('/:id',  log_tich_hopController.getById);
router.post('/',  log_tich_hopController.insert);
router.put('/:id',  log_tich_hopController.update);
router.delete('/:id', log_tich_hopController.delete);
module.exports = router;
