const express = require("express");
const router = express.Router();

const idcController = require("../controllers/to_khai_idc.controller");

router.get("/:so_to_khai", idcController.getIDCDetail);
router.post("/chi-tiet/update", idcController.updateChiTiet);
router.post("/sua-doi", idcController.saveIDCForm);
router.post("/gui/:id_to_khai", idcController.guiIDC);
router.post("/phan-hoi/:id_to_khai",  idcController.phanHoiHaiQuan);

module.exports = router;