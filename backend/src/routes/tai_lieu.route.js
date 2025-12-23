const express = require("express");
const router = express.Router();
const controller = require("../controllers/tai_lieu.controller");
const auth = require("../middleware/auth.middleware");           
const uploadTaiLieu = require("../middleware/upload.middleware"); 

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/doi-tuong/query", controller.getByDoiTuong);
router.get("/to-khai/:id_to_khai", controller.getByToKhai);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

router.post(
  "/tai-lieu/upload/to-khai/:id_to_khai",
  auth,
  uploadTaiLieu,
  controller.upload   // ✅ đúng biến
);

module.exports = router;
