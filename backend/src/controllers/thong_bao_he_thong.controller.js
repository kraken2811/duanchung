// controllers/thong_bao_he_thong.controller.js
const ThongBao = require("../models/thong_bao_he_thong.model");

/**
 * GET /thong-bao
 * Lấy tất cả thông báo
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await ThongBao.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách thông báo hệ thống",
      error: error.message,
    });
  }
};

/**
 * GET /thong-bao/:id
 * Lấy thông báo theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_thong_bao không hợp lệ" });
    }

    const data = await ThongBao.getById(id);
    if (!data) {
      return res.status(404).json({ message: "Không tìm thấy thông báo" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thông báo hệ thống",
      error: error.message,
    });
  }
};

/**
 * GET /thong-bao/nguoi-dung/:id_nguoi_dung
 * Lấy thông báo theo người dùng
 */
exports.getByNguoiDung = async (req, res) => {
  try {
    const id_nguoi_dung = Number(req.params.id_nguoi_dung);
    if (!Number.isInteger(id_nguoi_dung)) {
      return res.status(400).json({ message: "id_nguoi_dung không hợp lệ" });
    }

    const data = await ThongBao.getByNguoiDung(id_nguoi_dung);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thông báo theo người dùng",
      error: error.message,
    });
  }
};

/**
 * GET /thong-bao/nguoi-dung/:id_nguoi_dung/chua-doc
 * Lấy thông báo chưa đọc
 */
exports.getUnreadByNguoiDung = async (req, res) => {
  try {
    const id_nguoi_dung = Number(req.params.id_nguoi_dung);
    if (!Number.isInteger(id_nguoi_dung)) {
      return res.status(400).json({ message: "id_nguoi_dung không hợp lệ" });
    }

    const data = await ThongBao.getUnreadByNguoiDung(id_nguoi_dung);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thông báo chưa đọc",
      error: error.message,
    });
  }
};

/**
 * POST /thong-bao
 * Tạo thông báo mới
 */
exports.insert = async (req, res) => {
  try {
    const { id_nguoi_dung, tieu_de, noi_dung } = req.body;

    if (!id_nguoi_dung || !tieu_de || !noi_dung) {
      return res.status(400).json({
        message: "Thiếu dữ liệu bắt buộc",
      });
    }

    const created = await ThongBao.insert(req.body);

    res.status(201).json({
      message: "Tạo thông báo thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo thông báo",
      error: error.message,
    });
  }
};

/**
 * PATCH /thong-bao/:id/doc
 * Đánh dấu thông báo đã đọc
 */
exports.markAsRead = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_thong_bao không hợp lệ" });
    }

    await ThongBao.markAsRead(id);

    res.status(200).json({
      message: "Đã đánh dấu thông báo là đã đọc",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật trạng thái thông báo",
      error: error.message,
    });
  }
};

/**
 * PATCH /thong-bao/nguoi-dung/:id_nguoi_dung/doc-tat-ca
 * Đánh dấu tất cả thông báo của user là đã đọc
 */
exports.markAllAsRead = async (req, res) => {
  try {
    const id_nguoi_dung = Number(req.params.id_nguoi_dung);
    if (!Number.isInteger(id_nguoi_dung)) {
      return res.status(400).json({ message: "id_nguoi_dung không hợp lệ" });
    }

    const result = await ThongBao.markAllAsRead(id_nguoi_dung);

    res.status(200).json({
      message: "Đã đánh dấu tất cả thông báo là đã đọc",
      affected: result.count,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi đánh dấu tất cả thông báo",
      error: error.message,
    });
  }
};

/**
 * DELETE /thong-bao/:id
 * ❌ Không khuyến khích delete cứng
 */
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_thong_bao không hợp lệ" });
    }

    await ThongBao.remove(id);

    res.status(200).json({
      message: "Xóa thông báo thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa thông báo",
      error: error.message,
    });
  }
};
