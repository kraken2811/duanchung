const express = require("express");
const router = express.Router();
const ideController = require("../controllers/to_khai_ide.controller");

router.get("/search/:so_to_khai", ideController.searchTokhaiIDE);
router.post("/gui", ideController.guiIDE);
router.post("/phan-hoi", ideController.phanHoiHaiQuanIDE);

module.exports = router;
