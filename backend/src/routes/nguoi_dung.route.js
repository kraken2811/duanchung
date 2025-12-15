// routes/nguoi_dung.route.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/nguoi_dung.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.insert);
router.put("/:id", controller.update);
router.patch("/:id/password", controller.updatePassword);
router.delete("/:id", controller.delete);

module.exports = router;
