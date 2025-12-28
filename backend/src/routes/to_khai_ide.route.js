const express = require("express");
const router = express.Router();
const controller = require("../controllers/to_khai_ide.controller");

router.get("/list", controller.getIDEList);
router.get("/:so_to_khai", controller.getIDEDetail);
router.post("/", controller.createIDE);
router.post("/gui/:id_sua_doi", controller.guiIDE);

module.exports = router;
