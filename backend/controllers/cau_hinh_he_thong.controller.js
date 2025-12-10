// controllers/cau_hinh_he_thong.controller.js
const CauHinh = require("../models/cau_hinh_he_thong.model");

// (helper) chuẩn hoá dữ liệu đầu vào
function normalize(body = {}) {
  const data = { ...body };

  // trim chuỗi
  ["khoa_cau_hinh", "gia_tri_cau_hinh", "mo_ta", "nguoi_cap_nhat"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // ngày: cho phép null nếu rỗng
  if (data.ngay_cap_nhat === "") data.ngay_cap_nhat = null;

  return data;
}

// GET /cau_hinh_he_thong/all
exports.getAll = (_req, res) => {
  CauHinh.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// GET /cau_hinh_he_thong/:id
exports.getById = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  CauHinh.getById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(rows[0]);
  });
};

// POST /cau_hinh_he_thong
exports.insert = (req, res) => {
  const payload = normalize(req.body);

  // (tuỳ chọn) validate tối thiểu
  // if (!payload.khoa_cau_hinh) return res.status(400).json({ error: "thiếu khoa_cau_hinh" });

  CauHinh.insert(payload, (err, created) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(created);
  });
};

// PUT /cau_hinh_he_thong/:id
exports.update = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  CauHinh.update(payload, id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};

// DELETE /cau_hinh_he_thong/:id
exports.delete = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  CauHinh.delete(id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};
