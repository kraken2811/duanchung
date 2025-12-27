const express = require("express");
const router = express.Router();
const controller = require("../controllers/chi_tiet_to_khai.controller");

// GET
router.get("/to-khai/:id", controller.getByToKhai);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);


module.exports = router;
