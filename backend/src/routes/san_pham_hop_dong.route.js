// routes/san_pham_hop_dong.route.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/san_pham_hop_dong.controller");

router.get("/hop-dong/:id_hop_dong", controller.getByHopDong);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.insert);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;