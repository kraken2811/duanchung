// routes/quoc_gia.route.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/quoc_gia.controller");

router.get("/ma/:ma_quoc_gia", controller.getByMa);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.insert);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
