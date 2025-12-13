// controllers/danh_muc.controller.js
const DanhMuc = require("../../models/danh_muc.model");

// Chuẩn hoá dữ liệu đầu vào (ép số, trim chuỗi, rỗng -> null)
function normalize(body = {}) {
  const data = { ...body };
  const toNumOrNull = (v) =>
    v === undefined || v === null || v === "" || Number.isNaN(Number(v))
      ? null
      : Number(v);

  // các khoá ngoại / số
  data.id_hop_dong   = toNumOrNull(data.id_hop_dong);
  data.id_san_pham   = toNumOrNull(data.id_san_pham);
  data.id_vat_lieu   = toNumOrNull(data.id_vat_lieu);
  data.ty_le_hao_hut = toNumOrNull(data.ty_le_hao_hut);
  data.nam_tai_chinh = toNumOrNull(data.nam_tai_chinh);
  data.trang_thai    = toNumOrNull(data.trang_thai);

  // chuỗi: trim
  ["danh_muc", "ma_lenh_san_xuat"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // ngày: cho phép null nếu chuỗi rỗng
  ["ngay_gui", "ngay_duyet", "ngay_tao"].forEach((k) => {
    if (data[k] === "") data[k] = null;
  });

  return data;
}

// GET /danh_muc/all
exports.getAll = (_req, res) => {
  DanhMuc.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// GET /danh_muc/:id
exports.getById = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  DanhMuc.getById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(rows[0]);
  });
};

// POST /danh_muc
exports.insert = (req, res) => {
  const payload = normalize(req.body);

  // (tuỳ chọn) validate nhanh:
  // if (!payload.danh_muc) return res.status(400).json({ error: "thiếu danh_muc" });

  DanhMuc.insert(payload, (err, created) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(created);
  });
};

// PUT /danh_muc/:id
exports.update = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  DanhMuc.update(payload, id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};

// DELETE /danh_muc/:id
exports.delete = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  DanhMuc.delete(id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};
