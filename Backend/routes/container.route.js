var express = require('express');
var router = express.Router();
const containerController = require("../controllers/container.controller");
router.get('/', containerController.getAll);
router.get('/:id',  containerController.getById);
router.post('/',  containerController.insert);
router.put('/:id',  containerController.update);
router.delete('/:id', containerController.delete);
module.exports = router;
