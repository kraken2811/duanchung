// controllers/phu_luc_hop_dong.controller.js
const PhuLucHopDong = require("../models/phu_luc_hop_dong.model");

/**
 * GET /phu-luc-hop-dong
 * Lấy tất cả phụ lục hợp đồng
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await PhuLucHopDong.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách phụ lục hợp đồng",
      error: error.message,
    });
  }
};

/**
 * GET /phu-luc-hop-dong/:id
 * Lấy phụ lục hợp đồng theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id không hợp lệ" });
    }

    const data = await PhuLucHopDong.getById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy phụ lục hợp đồng",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy phụ lục hợp đồng",
      error: error.message,
    });
  }
};

/**
 * GET /phu-luc-hop-dong/hop-dong/:id_hop_dong
 * Lấy phụ lục theo hợp đồng
 */
exports.getByHopDong = async (req, res) => {
  try {
    const idHopDong = Number(req.params.id_hop_dong);
    if (!Number.isInteger(idHopDong)) {
      return res.status(400).json({ message: "id_hop_dong không hợp lệ" });
    }

    const data = await PhuLucHopDong.getByHopDong(idHopDong);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy phụ lục theo hợp đồng",
      error: error.message,
    });
  }
};

/**
 * POST /phu-luc-hop-dong
 * Thêm mới phụ lục hợp đồng
 */
exports.insert = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.id_hop_dong || !payload.so_phu_luc) {
      return res.status(400).json({
        message: "Thiếu dữ liệu bắt buộc (id_hop_dong, so_phu_luc)",
      });
    }

    const created = await PhuLucHopDong.insert(payload);

    res.status(201).json({
      message: "Thêm phụ lục hợp đồng thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm phụ lục hợp đồng",
      error: error.message,
    });
  }
};

/**
 * PUT /phu-luc-hop-dong/:id
 * ⚠️ Chỉ cho phép update khi còn DRAFT
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id không hợp lệ" });
    }

    // kiểm tra trạng thái hiện tại
    const current = await PhuLucHopDong.getById(id);
    if (!current) {
      return res.status(404).json({ message: "Không tìm thấy phụ lục hợp đồng" });
    }

    if (current.trang_thai !== "DRAFT") {
      return res.status(400).json({
        message: "Chỉ được cập nhật phụ lục khi trạng thái là DRAFT",
      });
    }

    const updated = await PhuLucHopDong.update(id, req.body);

    res.status(200).json({
      message: "Cập nhật phụ lục hợp đồng thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật phụ lục hợp đồng",
      error: error.message,
    });
  }
};

/**
 * DELETE /phu-luc-hop-dong/:id
 * ❌ Không khuyến nghị – nên chuyển trạng thái HỦY
 */
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id không hợp lệ" });
    }

    await PhuLucHopDong.remove(id);

    res.status(200).json({
      message: "Xóa phụ lục hợp đồng thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa phụ lục hợp đồng",
      error: error.message,
    });
  }
};
