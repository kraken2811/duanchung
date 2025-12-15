const express = require("express");
const router = express.Router();
const controller = require("../controllers/thong_bao_he_thong.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/nguoi-dung/:id_nguoi_dung", controller.getByNguoiDung);
router.get("/nguoi-dung/:id_nguoi_dung/chua-doc", controller.getUnreadByNguoiDung);
router.post("/", controller.insert);
router.patch("/:id/doc", controller.markAsRead);
router.patch("/nguoi-dung/:id_nguoi_dung/doc-tat-ca", controller.markAllAsRead);
router.delete("/:id", controller.delete);

module.exports = router;