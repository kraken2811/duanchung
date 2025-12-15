// controllers/nguoi_dung.controller.js
const NguoiDung = require("../models/nguoi_dung.model");

/**
 * GET /nguoi-dung
 * Lấy danh sách người dùng (không có mật khẩu)
 */
exports.getAll = async (_req, res) => {
  try {
    const users = await NguoiDung.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách người dùng",
      error: error.message,
    });
  }
};

/**
 * GET /nguoi-dung/:id
 * Lấy người dùng theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id không hợp lệ" });
    }

    const user = await NguoiDung.getById(id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thông tin người dùng",
      error: error.message,
    });
  }
};

/**
 * POST /nguoi-dung
 * Thêm người dùng mới
 * ⚠️ mat_khau phải được hash trước khi truyền vào
 */
exports.insert = async (req, res) => {
  try {
    const payload = req.body;

    // (khuyến nghị) validate tối thiểu
    if (!payload.ten_dang_nhap || !payload.mat_khau) {
      return res.status(400).json({
        message: "Thiếu tên đăng nhập hoặc mật khẩu",
      });
    }

    const created = await NguoiDung.insert(payload);

    res.status(201).json({
      message: "Thêm người dùng thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm người dùng",
      error: error.message,
    });
  }
};

/**
 * PUT /nguoi-dung/:id
 * Cập nhật thông tin người dùng (KHÔNG cập nhật mật khẩu)
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id không hợp lệ" });
    }

    const payload = req.body;

    const updated = await NguoiDung.update(id, payload);

    res.status(200).json({
      message: "Cập nhật người dùng thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật người dùng",
      error: error.message,
    });
  }
};

/**
 * PATCH /nguoi-dung/:id/password
 * Đổi mật khẩu
 */
exports.updatePassword = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { mat_khau_hash } = req.body;

    if (!Number.isInteger(id) || !mat_khau_hash) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
    }

    await NguoiDung.updatePassword(id, mat_khau_hash);

    res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi đổi mật khẩu",
      error: error.message,
    });
  }
};

/**
 * DELETE /nguoi-dung/:id
 * ❌ KHÔNG delete cứng
 * ✅ Deactivate user
 */
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id không hợp lệ" });
    }

    await NguoiDung.deactivate(id);

    res.status(200).json({
      message: "Vô hiệu hóa người dùng thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi vô hiệu hóa người dùng",
      error: error.message,
    });
  }
};
