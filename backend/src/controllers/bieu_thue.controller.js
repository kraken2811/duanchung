// controllers/bieu_thue.controller.js
const BieuThue = require("../models/bieu_thue.model");

// (helper) chuẩn hoá dữ liệu đầu vào (ép kiểu số, rỗng -> null)
function normalize(body = {}) {
  const data = { ...body };

  const toNumOrNull = (v) =>
    v === undefined || v === null || v === "" || Number.isNaN(Number(v))
      ? null
      : Number(v);

  data.thue_suat = toNumOrNull(data.thue_suat);
  data.thue_vat = toNumOrNull(data.thue_vat);
  data.thue_tieu_thu_dac_biet = toNumOrNull(data.thue_tieu_thu_dac_biet);

  // giữ nguyên chuỗi/ngày; nếu muốn chặt chẽ hơn có thể validate format YYYY-MM-DD
  data.hieu_luc_tu = data.hieu_luc_tu ?? null;
  data.hieu_luc_den = data.hieu_luc_den ?? null;

  // các trường text có thể trim
  ["ma_hs", "ghi_chu"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  return data;
}

// GET /bieu_thue/all
exports.getAll = (_req, res) => {
  BieuThue.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// GET /bieu_thue/:id
exports.getById = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  BieuThue.getById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(rows[0]);
  });
};

// POST /bieu_thue
exports.insert = (req, res) => {
  const payload = normalize(req.body);

  // (tuỳ chọn) kiểm tra nhanh
  // if (!payload.ma_hs) return res.status(400).json({ error: "thiếu ma_hs" });

  BieuThue.insert(payload, (err, created) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(created);
  });
};

// PUT /bieu_thue/:id
exports.update = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  BieuThue.update(payload, id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};

// DELETE /bieu_thue/:id
exports.delete = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  BieuThue.remove(id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};
