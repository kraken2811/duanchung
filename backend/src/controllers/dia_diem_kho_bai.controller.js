// controllers/dia_diem_kho_bai.controller.js
const DiaDiemKhoBai = require("../models/dia_diem_kho_bai.model");

// Chuẩn hoá dữ liệu đầu vào (ép số, trim chuỗi, rỗng -> null)
function normalize(body = {}) {
  const data = { ...body };
  const toNumOrNull = (v) =>
    v === undefined || v === null || v === "" || Number.isNaN(Number(v))
      ? null
      : Number(v);

  data.id_tinh_thanh = toNumOrNull(data.id_tinh_thanh);

  // Chuỗi: trim
  ["ma_dia_diem", "ten_dia_diem", "dia_chi", "loai_dia_diem", "ma_cuc_hai_quan"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // Ngày: cho phép null nếu rỗng
  if (data.ngay_tao === "") data.ngay_tao = null;

  return data;
}

// GET /dia_diem_kho_bai/all
exports.getAll = (_req, res) => {
  DiaDiemKhoBai.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// GET /dia_diem_kho_bai/:id
exports.getById = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  DiaDiemKhoBai.getById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(rows[0]);
  });
};

// POST /dia_diem_kho_bai
exports.insert = (req, res) => {
  const payload = normalize(req.body);

  // (tuỳ chọn) validate tối thiểu
  // if (!payload.ma_dia_diem || !payload.ten_dia_diem)
  //   return res.status(400).json({ error: "thiếu ma_dia_diem hoặc ten_dia_diem" });

  DiaDiemKhoBai.insert(payload, (err, created) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(created);
  });
};

// PUT /dia_diem_kho_bai/:id
exports.update = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  DiaDiemKhoBai.update(payload, id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};

// DELETE /dia_diem_kho_bai/:id
exports.delete = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  DiaDiemKhoBai.remove(id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};
