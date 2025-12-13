var express = require('express');
var router = express.Router();
const quoc_giaController = require("../controllers/quoc_gia.controller");
router.get('/', quoc_giaController.getAll);
router.get('/:id',  quoc_giaController.getById);
router.post('/',  quoc_giaController.insert);
router.put('/:id',  quoc_giaController.update);
router.delete('/:id', quoc_giaController.delete);
module.exports = router;
