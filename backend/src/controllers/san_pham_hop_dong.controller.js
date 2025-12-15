// controllers/san_pham_hop_dong.controller.js
const SanPhamHopDong = require("../models/san_pham_hop_dong.model");

/**
 * GET /san-pham-hop-dong
 * Lấy tất cả sản phẩm hợp đồng
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await SanPhamHopDong.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách sản phẩm hợp đồng",
      error: error.message,
    });
  }
};

/**
 * GET /san-pham-hop-dong/:id
 * Lấy sản phẩm hợp đồng theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_san_pham không hợp lệ" });
    }

    const data = await SanPhamHopDong.getById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm hợp đồng",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy sản phẩm hợp đồng",
      error: error.message,
    });
  }
};

/**
 * GET /san-pham-hop-dong/hop-dong/:id_hop_dong
 * Lấy danh sách sản phẩm theo hợp đồng
 */
exports.getByHopDong = async (req, res) => {
  try {
    const id_hop_dong = Number(req.params.id_hop_dong);
    if (!Number.isInteger(id_hop_dong)) {
      return res.status(400).json({ message: "id_hop_dong không hợp lệ" });
    }

    const data = await SanPhamHopDong.getByHopDong(id_hop_dong);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy sản phẩm theo hợp đồng",
      error: error.message,
    });
  }
};

/**
 * POST /san-pham-hop-dong
 * Thêm mới sản phẩm hợp đồng
 */
exports.insert = async (req, res) => {
  try {
    const { id_hop_dong, ten_san_pham } = req.body;

    if (!id_hop_dong || !ten_san_pham) {
      return res.status(400).json({
        message: "Thiếu dữ liệu bắt buộc (id_hop_dong, ten_san_pham)",
      });
    }

    const created = await SanPhamHopDong.insert(req.body);

    res.status(201).json({
      message: "Thêm sản phẩm hợp đồng thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm sản phẩm hợp đồng",
      error: error.message,
    });
  }
};

/**
 * PUT /san-pham-hop-dong/:id
 * Cập nhật sản phẩm hợp đồng
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_san_pham không hợp lệ" });
    }

    // kiểm tra tồn tại
    const exists = await SanPhamHopDong.getById(id);
    if (!exists) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm hợp đồng",
      });
    }

    const updated = await SanPhamHopDong.update(id, req.body);

    res.status(200).json({
      message: "Cập nhật sản phẩm hợp đồng thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật sản phẩm hợp đồng",
      error: error.message,
    });
  }
};

/**
 * DELETE /san-pham-hop-dong/:id
 * ⚠️ Không khuyến nghị delete cứng
 */
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_san_pham không hợp lệ" });
    }

    await SanPhamHopDong.remove(id);

    res.status(200).json({
      message: "Xóa sản phẩm hợp đồng thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa sản phẩm hợp đồng",
      error: error.message,
    });
  }
};
