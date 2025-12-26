const DiaDiemKhoBai = require("../models/dia_diem_kho_bai.model");

// Chuẩn hoá dữ liệu đầu vào (ép số, trim chuỗi, rỗng -> null)
function normalize(body = {}) {
  const data = { ...body };
  const toNumOrNull = (v) =>
    v === undefined || v === null || v === "" || Number.isNaN(Number(v))
      ? null
      : Number(v);

  data.id_tinh_thanh = toNumOrNull(data.id_tinh_thanh);

  ["ma_dia_diem", "ten_dia_diem", "dia_chi", "loai_dia_diem", "ma_cuc_hai_quan"]
    .forEach((k) => {
      if (typeof data[k] === "string") data[k] = data[k].trim();
    });

  if (data.ngay_tao === "") data.ngay_tao = null;

  return data;
}

/* ================= GET ALL ================= */
exports.getAll = async (_req, res) => {
  try {
    const rows = await DiaDiemKhoBai.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET BY ID ================= */
exports.getById = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    const row = await DiaDiemKhoBai.getById(id);
    if (!row) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= INSERT ================= */
exports.insert = async (req, res) => {
  try {
    const payload = normalize(req.body);
    const created = await DiaDiemKhoBai.insert(payload);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ================= UPDATE ================= */
exports.update = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    const payload = normalize(req.body);
    await DiaDiemKhoBai.update(id, payload);
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ================= DELETE ================= */
exports.delete = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    await DiaDiemKhoBai.remove(id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
