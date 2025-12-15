// controllers/van_ban_giay_phep.controller.js
const VanBanGiayPhep = require("../models/van_ban_giay_phep.model");

/**
 * GET /van-ban-giay-phep
 * Lấy tất cả văn bản / giấy phép
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await VanBanGiayPhep.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách văn bản / giấy phép",
      error: error.message,
    });
  }
};

/**
 * GET /van-ban-giay-phep/:id
 * Lấy văn bản theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_van_ban không hợp lệ" });
    }

    const data = await VanBanGiayPhep.getById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy văn bản / giấy phép",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy văn bản / giấy phép",
      error: error.message,
    });
  }
};

/**
 * GET /van-ban-giay-phep/hop-dong/:id_hop_dong
 * Lấy văn bản theo hợp đồng
 */
exports.getByHopDong = async (req, res) => {
  try {
    const idHopDong = Number(req.params.id_hop_dong);
    if (!Number.isInteger(idHopDong)) {
      return res.status(400).json({ message: "id_hop_dong không hợp lệ" });
    }

    const data = await VanBanGiayPhep.getByHopDong(idHopDong);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy văn bản theo hợp đồng",
      error: error.message,
    });
  }
};

/**
 * POST /van-ban-giay-phep
 * Tạo mới văn bản / giấy phép
 */
exports.insert = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.id_hop_dong || !payload.ma_so || !payload.loai) {
      return res.status(400).json({
        message: "Thiếu id_hop_dong / ma_so / loai",
      });
    }

    const created = await VanBanGiayPhep.insert(payload);

    res.status(201).json({
      message: "Thêm văn bản / giấy phép thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm văn bản / giấy phép",
      error: error.message,
    });
  }
};

/**
 * PUT /van-ban-giay-phep/:id
 * Cập nhật văn bản / giấy phép
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_van_ban không hợp lệ" });
    }

    const updated = await VanBanGiayPhep.update(id, req.body);

    res.status(200).json({
      message: "Cập nhật văn bản / giấy phép thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật văn bản / giấy phép",
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
      return res.status(400).json({ message: "id_van_ban không hợp lệ" });
    }

    await VanBanGiayPhep.remove(id);

    res.status(200).json({
      message: "Xóa văn bản / giấy phép thành công (KHÔNG KHUYẾN NGHỊ)",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa văn bản / giấy phép",
      error: error.message,
    });
  }
};
