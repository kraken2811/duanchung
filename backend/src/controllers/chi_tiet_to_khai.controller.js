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

/* ================= GET ALL ================= */
exports.getAll = async (_req, res) => {
  try {
    const rows = await ChiTietToKhai.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET BY ID ================= */
exports.getById = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    const row = await ChiTietToKhai.getById(id);
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
    const created = await ChiTietToKhai.insert(payload);
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
    await ChiTietToKhai.update(id, payload);
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ================= DELETE ================= */
exports.delete = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    await ChiTietToKhai.remove(id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
