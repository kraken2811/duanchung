const CongTy = require("../models/cong_ty.model");

/**
 * GET /cong_tys
 * Lấy tất cả công ty
 */
exports.getAll = async (req, res) => {
  try {
    const rows = await CongTy.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /cong_tys/:id
 * Lấy công ty theo ID
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id không hợp lệ" });
  }

  try {
    const row = await CongTy.getById(id);
    if (!row) {
      return res.status(404).json({ error: "Không tìm thấy công ty" });
    }
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /cong_tys/check-ma-so-thue?ma_so_thue=xxx&id=optional
 * Kiểm tra riêng mã số thuế
 */
exports.checkMaSoThue = async (req, res) => {
  const { ma_so_thue, id } = req.query;

  if (!ma_so_thue) {
    return res.status(400).json({ error: "Thiếu mã số thuế" });
  }

  try {
    const existed = await CongTy.existsByMaSoThue(
      ma_so_thue,
      id ? Number(id) : null,
    );

    res.json({
      exists: !!existed, // object | null -> boolean
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /cong_tys
 * Thêm mới công ty (có check MST)
 */
exports.insert = async (req, res) => {
  const data = req.body || {};

  if (!data.ma_so_thue) {
    return res.status(400).json({ error: "Thiếu mã số thuế" });
  }

  try {
    const existed = await CongTy.existsByMaSoThue(data.ma_so_thue);
    if (existed) {
      return res.status(400).json({
        error: "Mã số thuế đã tồn tại",
      });
    }

    const created = await CongTy.insert(data);
    res.status(201).json(created);
  } catch (err) {
    // fallback nếu trùng unique do race condition
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Mã số thuế đã tồn tại" });
    }
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /cong_tys/:id
 * Cập nhật công ty (có check MST)
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id không hợp lệ" });
  }

  const data = req.body || {};
  if (!data.ma_so_thue) {
    return res.status(400).json({ error: "Thiếu mã số thuế" });
  }

  try {
    const existed = await CongTy.existsByMaSoThue(data.ma_so_thue, id);
    if (existed) {
      return res.status(400).json({
        error: "Mã số thuế đã tồn tại ở công ty khác",
      });
    }

    const updated = await CongTy.update(id, data);
    res.json(updated);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Mã số thuế đã tồn tại" });
    }
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /cong_tys/:id
 * Xóa công ty
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id không hợp lệ" });
  }

  try {
    await CongTy.remove(id);
    res.json({ message: "Xóa công ty thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
