// routes/tai_lieu.route.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/tai_lieu.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/doi-tuong/query", controller.getByDoiTuong);
router.get("/to-khai/:id_to_khai", controller.getByToKhai);
router.post("/", controller.insert);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;