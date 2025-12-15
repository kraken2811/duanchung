// controllers/quoc_gia.controller.js
const QuocGia = require("../models/quoc_gia.model");

/**
 * GET /quoc-gia
 * Lấy tất cả quốc gia
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await QuocGia.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách quốc gia",
      error: error.message,
    });
  }
};

/**
 * GET /quoc-gia/:id
 * Lấy quốc gia theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_quoc_gia không hợp lệ" });
    }

    const data = await QuocGia.getById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy quốc gia",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thông tin quốc gia",
      error: error.message,
    });
  }
};

/**
 * GET /quoc-gia/ma/:ma_quoc_gia
 * Lấy quốc gia theo mã
 */
exports.getByMa = async (req, res) => {
  try {
    const { ma_quoc_gia } = req.params;
    if (!ma_quoc_gia) {
      return res.status(400).json({ message: "Thiếu mã quốc gia" });
    }

    const data = await QuocGia.getByMa(ma_quoc_gia);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy quốc gia",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy quốc gia theo mã",
      error: error.message,
    });
  }
};

/**
 * POST /quoc-gia
 * Thêm mới quốc gia
 */
exports.insert = async (req, res) => {
  try {
    const { ma_quoc_gia, ten_quoc_gia } = req.body;

    if (!ma_quoc_gia || !ten_quoc_gia) {
      return res.status(400).json({
        message: "Thiếu dữ liệu bắt buộc (ma_quoc_gia, ten_quoc_gia)",
      });
    }

    const created = await QuocGia.insert(req.body);

    res.status(201).json({
      message: "Thêm quốc gia thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm quốc gia",
      error: error.message,
    });
  }
};

/**
 * PUT /quoc-gia/:id
 * Cập nhật quốc gia
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_quoc_gia không hợp lệ" });
    }

    // kiểm tra tồn tại
    const exists = await QuocGia.getById(id);
    if (!exists) {
      return res.status(404).json({
        message: "Không tìm thấy quốc gia",
      });
    }

    const updated = await QuocGia.update(id, req.body);

    res.status(200).json({
      message: "Cập nhật quốc gia thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật quốc gia",
      error: error.message,
    });
  }
};

/**
 * DELETE /quoc-gia/:id
 * ⚠️ Không khuyến nghị delete cứng
 */
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_quoc_gia không hợp lệ" });
    }

    await QuocGia.remove(id);

    res.status(200).json({
      message: "Xóa quốc gia thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa quốc gia",
      error: error.message,
    });
  }
};
