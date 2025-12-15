// controllers/chi_tiet_to_khai.controller.js
const ChiTietToKhai = require("../models/chi_tiet_to_khai.model");

// helper: chuẩn hoá dữ liệu đầu vào
function normalize(body = {}) {
  const data = { ...body };

  const toNumOrNull = (v) =>
    v === undefined || v === null || v === "" || Number.isNaN(Number(v))
      ? null
      : Number(v);

  data.id_to_khai = toNumOrNull(data.id_to_khai);
  data.so_dong = toNumOrNull(data.so_dong);
  data.so_luong = toNumOrNull(data.so_luong);
  data.don_gia = toNumOrNull(data.don_gia);
  data.tong_gia_tri = toNumOrNull(data.tong_gia_tri);
  data.id_bieu_thue = toNumOrNull(data.id_bieu_thue);
  data.tien_thue = toNumOrNull(data.tien_thue);
  data.tien_vat = toNumOrNull(data.tien_vat);
  data.thue_bo_sung = toNumOrNull(data.thue_bo_sung);

  [
    "ma_hs",
    "mo_ta_hang_hoa",
    "don_vi_tinh",
    "ma_ngoai_te",
    "ma_quoc_gia",
  ].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  data.ngay_tao = data.ngay_tao ?? null;

  return data;
}

// GET /chi_tiet_to_khai
exports.getAll = (_req, res) => {
  ChiTietToKhai.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// GET /chi_tiet_to_khai/:id
exports.getById = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  ChiTietToKhai.getById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0)
      return res.status(404).json({ error: "Không tìm thấy" });

    res.json(rows[0]);
  });
};

// POST /chi_tiet_to_khai
exports.insert = (req, res) => {
  const payload = normalize(req.body);

  ChiTietToKhai.insert(payload, (err, created) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(created);
  });
};

// PUT /chi_tiet_to_khai/:id
exports.update = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  ChiTietToKhai.update(payload, id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};

// DELETE /chi_tiet_to_khai/:id
exports.delete = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  // ✅ dùng remove đúng theo model của bạn
  ChiTietToKhai.remove(id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};
