// routes/to_khai_tri_gia.route.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/to_khai_tri_gia.controller");

router.get("/to-khai-hai-quan/:id", controller.getByToKhaiHaiQuan);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.insert);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
