// routes/nguoi_dung.route.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/nguoi_dung.controller");
const auth = require('../middleware/auth.middleware');
const requireRole = require('../middleware/role.middleware');

router.patch("/:id/password", controller.updatePassword);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.insert);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
