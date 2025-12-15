// routes/vai_tro.route.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/vai_tro.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/ma/:ma", controller.getByMa);
router.post("/", controller.insert);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
