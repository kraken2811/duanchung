// controllers/to_khai_tri_gia.controller.js
const ToKhaiTriGia = require("../models/to_khai_tri_gia.model");

/**
 * GET /to-khai-tri-gia
 * Lấy tất cả tờ khai trị giá
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await ToKhaiTriGia.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách tờ khai trị giá",
      error: error.message,
    });
  }
};

/**
 * GET /to-khai-tri-gia/:id
 * Lấy tờ khai trị giá theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_to_khai_tri_gia không hợp lệ" });
    }

    const data = await ToKhaiTriGia.getById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy tờ khai trị giá",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thông tin tờ khai trị giá",
      error: error.message,
    });
  }
};

/**
 * GET /to-khai-tri-gia/to-khai-hai-quan/:id
 * Lấy tờ khai trị giá theo tờ khai hải quan
 */
exports.getByToKhaiHaiQuan = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        message: "id_to_khai_hai_quan không hợp lệ",
      });
    }

    const data = await ToKhaiTriGia.getByToKhaiHaiQuan(id);
    if (!data) {
      return res.status(404).json({
        message: "Tờ khai hải quan này chưa có tờ khai trị giá",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy tờ khai trị giá theo tờ khai hải quan",
      error: error.message,
    });
  }
};

/**
 * POST /to-khai-tri-gia
 * Tạo mới tờ khai trị giá
 */
exports.insert = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.id_to_khai_hai_quan) {
      return res.status(400).json({
        message: "Thiếu id_to_khai_hai_quan",
      });
    }

    const created = await ToKhaiTriGia.insert(payload);

    res.status(201).json({
      message: "Tạo tờ khai trị giá thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo tờ khai trị giá",
      error: error.message,
    });
  }
};

/**
 * PUT /to-khai-tri-gia/:id
 * Cập nhật tờ khai trị giá
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        message: "id_to_khai_tri_gia không hợp lệ",
      });
    }

    const updated = await ToKhaiTriGia.update(id, req.body);

    res.status(200).json({
      message: "Cập nhật tờ khai trị giá thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật tờ khai trị giá",
      error: error.message,
    });
  }
};

/**
 * ❌ KHÔNG KHUYẾN NGHỊ DELETE
 * Chỉ dùng khi DEV / TEST
 */
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        message: "id_to_khai_tri_gia không hợp lệ",
      });
    }

    await ToKhaiTriGia.remove(id);

    res.status(200).json({
      message: "Xóa tờ khai trị giá thành công (KHÔNG KHUYẾN NGHỊ)",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa tờ khai trị giá",
      error: error.message,
    });
  }
};
