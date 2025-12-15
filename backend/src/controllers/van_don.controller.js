// controllers/van_don.controller.js
const VanDon = require("../models/van_don.model");

/**
 * GET /van-don
 * Lấy tất cả vận đơn
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await VanDon.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách vận đơn",
      error: error.message,
    });
  }
};

/**
 * GET /van-don/:id
 * Lấy vận đơn theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_van_don không hợp lệ" });
    }

    const data = await VanDon.getById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy vận đơn",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thông tin vận đơn",
      error: error.message,
    });
  }
};

/**
 * GET /van-don/lo-hang/:id_lo_hang
 * Lấy vận đơn theo lô hàng
 */
exports.getByLoHang = async (req, res) => {
  try {
    const idLoHang = Number(req.params.id_lo_hang);
    if (!Number.isInteger(idLoHang)) {
      return res.status(400).json({ message: "id_lo_hang không hợp lệ" });
    }

    const data = await VanDon.getByLoHang(idLoHang);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy vận đơn theo lô hàng",
      error: error.message,
    });
  }
};

/**
 * POST /van-don
 * Thêm mới vận đơn
 */
exports.insert = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.so_van_don || !payload.id_lo_hang) {
      return res.status(400).json({
        message: "Thiếu so_van_don hoặc id_lo_hang",
      });
    }

    const created = await VanDon.insert(payload);

    res.status(201).json({
      message: "Thêm vận đơn thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm vận đơn",
      error: error.message,
    });
  }
};

/**
 * PUT /van-don/:id
 * Cập nhật vận đơn
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_van_don không hợp lệ" });
    }

    const updated = await VanDon.update(id, req.body);

    res.status(200).json({
      message: "Cập nhật vận đơn thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật vận đơn",
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
      return res.status(400).json({ message: "id_van_don không hợp lệ" });
    }

    await VanDon.remove(id);

    res.status(200).json({
      message: "Xóa vận đơn thành công (KHÔNG KHUYẾN NGHỊ)",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa vận đơn",
      error: error.message,
    });
  }
};
