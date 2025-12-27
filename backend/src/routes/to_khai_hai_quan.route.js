const express = require("express");
const router = express.Router();
const controller = require("../controllers/to_khai_hai_quan.controller");

router.post("/idb/submit", controller.submitIDB);
router.post("/ida/gen1", controller.saveGen1);
router.put("/ida/gen2/:id", controller.saveGen2);
router.post("/ida/declare/:id", controller.declareIDA);
router.get("/list", controller.getList);
router.get("/statistics", controller.statistics);
router.get("/:ma/idb", controller.getIDB);
router.get("/lo-hang/:id_lo_hang", controller.getByLoHang);
router.get("/cong-ty/:id_cong_ty", controller.getByCongTy);
router.patch("/:id/vnaccs", controller.updateVNACCS);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.insert);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;