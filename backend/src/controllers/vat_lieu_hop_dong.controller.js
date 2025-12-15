// controllers/vat_lieu_hop_dong.controller.js
const VatLieuHopDong = require("../models/vat_lieu_hop_dong.model");

/**
 * GET /vat-lieu-hop-dong
 * Lấy tất cả vật liệu hợp đồng
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await VatLieuHopDong.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách vật liệu hợp đồng",
      error: error.message,
    });
  }
};

/**
 * GET /vat-lieu-hop-dong/:id
 * Lấy vật liệu theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_vat_lieu không hợp lệ" });
    }

    const data = await VatLieuHopDong.getById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy vật liệu hợp đồng",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thông tin vật liệu hợp đồng",
      error: error.message,
    });
  }
};

/**
 * GET /vat-lieu-hop-dong/hop-dong/:id_hop_dong
 * Lấy vật liệu theo hợp đồng
 */
exports.getByHopDong = async (req, res) => {
  try {
    const idHopDong = Number(req.params.id_hop_dong);
    if (!Number.isInteger(idHopDong)) {
      return res.status(400).json({ message: "id_hop_dong không hợp lệ" });
    }

    const data = await VatLieuHopDong.getByHopDong(idHopDong);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy vật liệu theo hợp đồng",
      error: error.message,
    });
  }
};

/**
 * POST /vat-lieu-hop-dong
 * Thêm vật liệu vào hợp đồng
 */
exports.insert = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.id_hop_dong || !payload.ten_vat_lieu) {
      return res.status(400).json({
        message: "Thiếu id_hop_dong hoặc ten_vat_lieu",
      });
    }

    const created = await VatLieuHopDong.insert(payload);

    res.status(201).json({
      message: "Thêm vật liệu hợp đồng thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm vật liệu hợp đồng",
      error: error.message,
    });
  }
};

/**
 * PUT /vat-lieu-hop-dong/:id
 * Cập nhật vật liệu hợp đồng
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_vat_lieu không hợp lệ" });
    }

    const updated = await VatLieuHopDong.update(id, req.body);

    res.status(200).json({
      message: "Cập nhật vật liệu hợp đồng thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật vật liệu hợp đồng",
      error: error.message,
    });
  }
};

/**
 * ❌ KHÔNG KHUYẾN KHÍCH DELETE CỨNG
 * Chỉ dùng khi CHƯA phát sinh nghiệp vụ
 */
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_vat_lieu không hợp lệ" });
    }

    await VatLieuHopDong.remove(id);

    res.status(200).json({
      message: "Xóa vật liệu hợp đồng thành công (KHÔNG KHUYẾN NGHỊ)",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa vật liệu hợp đồng",
      error: error.message,
    });
  }
};
