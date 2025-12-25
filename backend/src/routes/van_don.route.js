const express = require("express");
const router = express.Router();
const controller = require("../controllers/van_don.controller");

router.get("/lo-hang/:id_lo_hang", controller.getByLoHang);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.insert);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
