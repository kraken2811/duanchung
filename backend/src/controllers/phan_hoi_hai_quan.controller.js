// controllers/phan_hoi_hai_quan.controller.js
const PhanHoiHaiQuan = require("../models/phan_hoi_hai_quan.model");

/**
 * GET /phan-hoi-hai-quan
 * Lấy tất cả phản hồi hải quan
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await PhanHoiHaiQuan.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách phản hồi hải quan",
      error: error.message,
    });
  }
};

/**
 * GET /phan-hoi-hai-quan/:id
 * Lấy phản hồi theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id không hợp lệ" });
    }

    const data = await PhanHoiHaiQuan.getById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy phản hồi hải quan",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy phản hồi hải quan",
      error: error.message,
    });
  }
};

/**
 * GET /phan-hoi-hai-quan/to-khai/:id_to_khai
 * Lấy phản hồi theo tờ khai
 */
exports.getByToKhai = async (req, res) => {
  try {
    const idToKhai = Number(req.params.id_to_khai);
    if (!Number.isInteger(idToKhai)) {
      return res.status(400).json({ message: "id_to_khai không hợp lệ" });
    }

    const data = await PhanHoiHaiQuan.getByToKhai(idToKhai);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy phản hồi theo tờ khai",
      error: error.message,
    });
  }
};

/**
 * POST /phan-hoi-hai-quan
 * Thêm mới phản hồi hải quan (VNACCS)
 */
exports.insert = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.id_to_khai || !payload.ma_thong_diep) {
      return res.status(400).json({
        message: "Thiếu dữ liệu bắt buộc",
      });
    }

    const created = await PhanHoiHaiQuan.insert(payload);

    res.status(201).json({
      message: "Thêm phản hồi hải quan thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm phản hồi hải quan",
      error: error.message,
    });
  }
};

/**
 * PUT /phan-hoi-hai-quan/:id
 * ⚠️ Không khuyến nghị – chỉ update diễn giải
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id không hợp lệ" });
    }

    const { noi_dung_thong_diep } = req.body;
    if (!noi_dung_thong_diep) {
      return res.status(400).json({
        message: "Chỉ cho phép cập nhật nội dung thông điệp",
      });
    }

    const updated = await PhanHoiHaiQuan.update(id, { noi_dung_thong_diep });

    res.status(200).json({
      message: "Cập nhật phản hồi hải quan thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật phản hồi hải quan",
      error: error.message,
    });
  }
};

/**
 * DELETE /phan-hoi-hai-quan/:id
 * ❌ Không khuyến nghị – chỉ dùng khi bắt buộc
 */
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id không hợp lệ" });
    }

    await PhanHoiHaiQuan.remove(id);

    res.status(200).json({
      message: "Xóa phản hồi hải quan thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa phản hồi hải quan",
      error: error.message,
    });
  }
};
