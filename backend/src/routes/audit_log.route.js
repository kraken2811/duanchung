// routes/audit_log.route.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/audit_log.controller");

router.get("/all", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.insert);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.delete);

module.exports = router;
