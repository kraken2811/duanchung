const express = require("express");
const router = express.Router();
const controller = require("../controllers/tai_lieu.controller");
const upload = require("../middleware/upload.middleware");

router.get("/", controller.getAll);
router.get("/doi-tuong", controller.getByDoiTuong);
router.get("/to-khai/:id_to_khai", controller.getByToKhai);
router.post("/upload/:id_to_khai", upload.single("file"), controller.upload);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
