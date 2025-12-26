const express = require("express");
const router = express.Router();

const controller = require("../controllers/chi_tiet_to_khai.controller");

// CRUD
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.insert);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

// 🔥 TÍNH THUẾ THEO MÃ HS
router.post("/:id/calc-tax", controller.calcTaxByMaHS);

module.exports = router;
