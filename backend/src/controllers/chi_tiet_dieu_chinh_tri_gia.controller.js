// controllers/chi_tiet_dieu_chinh_tri_gia.controller.js
const ChiTietDieuChinhTriGia = require(
  "../models/chi_tiet_dieu_chinh_tri_gia.model"
);

// helper: chuẩn hoá dữ liệu đầu vào
function normalize(body = {}) {
  const data = { ...body };

  const toNumOrNull = (v) =>
    v === undefined || v === null || v === "" || Number.isNaN(Number(v))
      ? null
      : Number(v);

  data.id_khoan_dieu_chinh = toNumOrNull(data.id_khoan_dieu_chinh);
  data.phi = toNumOrNull(data.phi);

  // string fields
  ["ma_loai", "ma_tien_te", "so_dang_ky", "mo_ta"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  data.ngay_tao = data.ngay_tao ?? null;

  return data;
}

// GET /chi_tiet_dieu_chinh_tri_gia
exports.getAll = (_req, res) => {
  ChiTietDieuChinhTriGia.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// GET /chi_tiet_dieu_chinh_tri_gia/:id
exports.getById = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  ChiTietDieuChinhTriGia.getById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0)
      return res.status(404).json({ error: "Không tìm thấy" });

    res.json(rows[0]);
  });
};

// POST /chi_tiet_dieu_chinh_tri_gia
exports.insert = (req, res) => {
  const payload = normalize(req.body);

  ChiTietDieuChinhTriGia.insert(payload, (err, created) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(created);
  });
};

// PUT /chi_tiet_dieu_chinh_tri_gia/:id
exports.update = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  ChiTietDieuChinhTriGia.update(payload, id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};

// DELETE /chi_tiet_dieu_chinh_tri_gia/:id
exports.delete = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  ChiTietDieuChinhTriGia.remove(id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};
