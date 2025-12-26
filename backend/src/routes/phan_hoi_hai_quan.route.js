// routes/phan_hoi_hai_quan.route.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/phan_hoi_hai_quan.controller");

router.get("/to-khai/:id_to_khai", controller.getByToKhai);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.insert);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
