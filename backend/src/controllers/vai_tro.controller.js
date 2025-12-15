// controllers/vai_tro.controller.js
const VaiTro = require("../models/vai_tro.model");

/**
 * GET /vai-tro
 * Lấy tất cả vai trò
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await VaiTro.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách vai trò",
      error: error.message,
    });
  }
};

/**
 * GET /vai-tro/:id
 * Lấy vai trò theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_vai_tro không hợp lệ" });
    }

    const data = await VaiTro.getById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy vai trò",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy vai trò theo ID",
      error: error.message,
    });
  }
};

/**
 * GET /vai-tro/ma/:ma
 * Lấy vai trò theo mã
 */
exports.getByMa = async (req, res) => {
  try {
    const ma = req.params.ma;
    if (!ma) {
      return res.status(400).json({ message: "Thiếu mã vai trò" });
    }

    const data = await VaiTro.getByMa(ma);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy vai trò",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy vai trò theo mã",
      error: error.message,
    });
  }
};

/**
 * POST /vai-tro
 * Tạo mới vai trò
 */
exports.insert = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.ma_vai_tro || !payload.ten_vai_tro) {
      return res.status(400).json({
        message: "Thiếu ma_vai_tro hoặc ten_vai_tro",
      });
    }

    const created = await VaiTro.insert(payload);

    res.status(201).json({
      message: "Thêm vai trò thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm vai trò",
      error: error.message,
    });
  }
};

/**
 * PUT /vai-tro/:id
 * Cập nhật vai trò
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_vai_tro không hợp lệ" });
    }

    const updated = await VaiTro.update(id, req.body);

    res.status(200).json({
      message: "Cập nhật vai trò thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật vai trò",
      error: error.message,
    });
  }
};

/**
 * ❌ KHÔNG KHUYẾN KHÍCH DELETE CỨNG
 * Chỉ dùng khi DEV / TEST
 */
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_vai_tro không hợp lệ" });
    }

    await VaiTro.remove(id);

    res.status(200).json({
      message: "Xoá vai trò thành công (KHÔNG KHUYẾN NGHỊ)",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xoá vai trò",
      error: error.message,
    });
  }
};
