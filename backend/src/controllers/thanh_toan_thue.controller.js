// controllers/thanh_toan_thue.controller.js
const ThanhToanThue = require("../models/thanh_toan_thue.model");

/**
 * GET /thanh-toan-thue
 * Lấy tất cả thanh toán thuế
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await ThanhToanThue.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách thanh toán thuế",
      error: error.message,
    });
  }
};

/**
 * GET /thanh-toan-thue/:id
 * Lấy thanh toán theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        message: "id_thanh_toan không hợp lệ",
      });
    }

    const data = await ThanhToanThue.getById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy thanh toán thuế",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thanh toán thuế",
      error: error.message,
    });
  }
};

/**
 * GET /thanh-toan-thue/to-khai/:id_to_khai
 * Lấy thanh toán theo tờ khai
 */
exports.getByToKhai = async (req, res) => {
  try {
    const id_to_khai = Number(req.params.id_to_khai);
    if (!Number.isInteger(id_to_khai)) {
      return res.status(400).json({
        message: "id_to_khai không hợp lệ",
      });
    }

    const data = await ThanhToanThue.getByToKhai(id_to_khai);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thanh toán theo tờ khai",
      error: error.message,
    });
  }
};

/**
 * POST /thanh-toan-thue
 * Tạo mới thanh toán thuế
 */
exports.insert = async (req, res) => {
  try {
    const {
      id_to_khai,
      so_tien,
      ma_ngoai_te,
      phuong_thuc_thanh_toan,
    } = req.body;

    if (!id_to_khai || !so_tien || !phuong_thuc_thanh_toan) {
      return res.status(400).json({
        message: "Thiếu dữ liệu bắt buộc",
      });
    }

    const created = await ThanhToanThue.insert(req.body);

    res.status(201).json({
      message: "Tạo thanh toán thuế thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo thanh toán thuế",
      error: error.message,
    });
  }
};

/**
 * PUT /thanh-toan-thue/:id
 * Cập nhật trạng thái thanh toán
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        message: "id_thanh_toan không hợp lệ",
      });
    }

    const exists = await ThanhToanThue.getById(id);
    if (!exists) {
      return res.status(404).json({
        message: "Không tìm thấy thanh toán thuế",
      });
    }

    const updated = await ThanhToanThue.update(id, req.body);

    res.status(200).json({
      message: "Cập nhật thanh toán thuế thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật thanh toán thuế",
      error: error.message,
    });
  }
};

/**
 * DELETE /thanh-toan-thue/:id
 * ⚠️ Không khuyến khích delete cứng
 */
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({
        message: "id_thanh_toan không hợp lệ",
      });
    }

    await ThanhToanThue.remove(id);

    res.status(200).json({
      message: "Xóa thanh toán thuế thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa thanh toán thuế",
      error: error.message,
    });
  }
};
