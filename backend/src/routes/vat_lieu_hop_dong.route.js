const express = require("express");
const router = express.Router();
const controller = require("../controllers/vat_lieu_hop_dong.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/hop-dong/:id_hop_dong", controller.getByHopDong);
router.post("/", controller.insert);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;