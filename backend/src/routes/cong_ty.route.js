// routes/cong_ty.route.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/cong_ty.controller");

router.get("/check-ma-so-thue", ctrl.checkMaSoThue);
router.get("/all", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.insert);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.delete);

module.exports = router;
