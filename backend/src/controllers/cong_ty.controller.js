// controllers/cong_ty.controller.js
const CongTy = require("../models/cong_ty.model");

// GET /cong_tys/all
exports.getAll = (req, res) => {
  CongTy.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// GET /cong_tys/:id
exports.getById = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  CongTy.getById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(rows[0]);
  });
};

// POST /cong_tys
exports.insert = (req, res) => {
  const data = req.body || {};
  // (tuỳ chọn) validate nhanh:
  // if (!data.ten_cong_ty) return res.status(400).json({ error: "thiếu ten_cong_ty" });

  CongTy.insert(data, (err, created) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(created);
  });
};

// PUT /cong_tys/:id
exports.update = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  const data = req.body || {};
  CongTy.update(data, id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    // Model hiện trả về chuỗi thông báo; bạn có thể đổi về JSON cho nhất quán
    res.json({ message: msg });
  });
};

// DELETE /cong_tys/:id
exports.delete = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  CongTy.remove(id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};
