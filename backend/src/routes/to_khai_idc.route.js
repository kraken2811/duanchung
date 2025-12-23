const express = require("express");
const router = express.Router();
const IDCController = require("../controllers/to_khai_idc.controller");

router.get("/search/:so_to_khai", IDCController.searchTokhai);
router.put("/chi-tiet", IDCController.updateChiTiet);
router.post("/gui-hai-quan/:id_to_khai", IDCController.guiIDC);
router.post("/phan-hoi-hai-quan", IDCController.phanHoiHaiQuan);

module.exports = router;