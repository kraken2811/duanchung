// controllers/to_khai_hai_quan.controller.js
const ToKhai = require("../models/to_khai_hai_quan.model");

/**
 * GET /to-khai
 * Lấy tất cả tờ khai hải quan
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await ToKhai.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách tờ khai hải quan",
      error: error.message,
    });
  }
};

/**
 * GET /to-khai/:id
 * Lấy tờ khai theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_to_khai không hợp lệ" });
    }

    const data = await ToKhai.getById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy tờ khai hải quan",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thông tin tờ khai hải quan",
      error: error.message,
    });
  }
};

/**
 * GET /to-khai/lo-hang/:id_lo_hang
 * Lấy tờ khai theo lô hàng
 */
exports.getByLoHang = async (req, res) => {
  try {
    const id_lo_hang = Number(req.params.id_lo_hang);
    if (!Number.isInteger(id_lo_hang)) {
      return res.status(400).json({ message: "id_lo_hang không hợp lệ" });
    }

    const data = await ToKhai.getByLoHang(id_lo_hang);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy tờ khai theo lô hàng",
      error: error.message,
    });
  }
};

/**
 * GET /to-khai/cong-ty/:id_cong_ty
 * Lấy tờ khai theo công ty
 */
exports.getByCongTy = async (req, res) => {
  try {
    const id_cong_ty = Number(req.params.id_cong_ty);
    if (!Number.isInteger(id_cong_ty)) {
      return res.status(400).json({ message: "id_cong_ty không hợp lệ" });
    }

    const data = await ToKhai.getByCongTy(id_cong_ty);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy tờ khai theo công ty",
      error: error.message,
    });
  }
};

/**
 * POST /to-khai
 * Tạo mới tờ khai hải quan
 */
exports.insert = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.id_lo_hang || !payload.id_cong_ty) {
      return res.status(400).json({
        message: "Thiếu dữ liệu bắt buộc (id_lo_hang, id_cong_ty)",
      });
    }

    const created = await ToKhai.insert(payload);

    res.status(201).json({
      message: "Tạo tờ khai hải quan thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo tờ khai hải quan",
      error: error.message,
    });
  }
};

/**
 * PUT /to-khai/:id
 * Cập nhật tờ khai (chỉ khi chưa gửi VNACCS)
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_to_khai không hợp lệ" });
    }

    const updated = await ToKhai.update(id, req.body);

    res.status(200).json({
      message: "Cập nhật tờ khai hải quan thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật tờ khai hải quan",
      error: error.message,
    });
  }
};

/**
 * PATCH /to-khai/:id/vnaccs
 * Cập nhật trạng thái từ VNACCS
 */
exports.updateVNACCS = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_to_khai không hợp lệ" });
    }

    const updated = await ToKhai.updateVNACCS(id, req.body);

    res.status(200).json({
      message: "Cập nhật trạng thái VNACCS thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật trạng thái VNACCS",
      error: error.message,
    });
  }
};

/**
 * ❌ KHÔNG DELETE CỨNG TỜ KHAI
 * Endpoint này chỉ để DEV / test
 */
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_to_khai không hợp lệ" });
    }

    await ToKhai.remove(id);

    res.status(200).json({
      message: "Xóa tờ khai hải quan thành công (KHÔNG KHUYẾN NGHỊ)",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa tờ khai hải quan",
      error: error.message,
    });
  }
};
