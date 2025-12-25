const DanhMuc = require("../models/danh_muc.model");

// Chuẩn hoá dữ liệu đầu vào (ép số, trim chuỗi, rỗng -> null)
function normalize(body = {}) {
  const data = { ...body };
  const toNumOrNull = (v) =>
    v === undefined || v === null || v === "" || Number.isNaN(Number(v))
      ? null
      : Number(v);

  data.id_hop_dong   = toNumOrNull(data.id_hop_dong);
  data.id_san_pham   = toNumOrNull(data.id_san_pham);
  data.id_vat_lieu   = toNumOrNull(data.id_vat_lieu);
  data.ty_le_hao_hut = toNumOrNull(data.ty_le_hao_hut);
  data.nam_tai_chinh = toNumOrNull(data.nam_tai_chinh);
  data.trang_thai    = toNumOrNull(data.trang_thai);

  ["danh_muc", "ma_lenh_san_xuat"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  ["ngay_gui", "ngay_duyet", "ngay_tao"].forEach((k) => {
    if (data[k] === "") data[k] = null;
  });

  return data;
}

/* ================= GET ALL ================= */
exports.getAll = async (_req, res) => {
  try {
    const rows = await DanhMuc.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET BY ID ================= */
exports.getById = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    const row = await DanhMuc.getById(id);
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
    const created = await DanhMuc.insert(payload);
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
    await DanhMuc.update(id, payload);
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ================= DELETE ================= */
exports.delete = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    await DanhMuc.remove(id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
