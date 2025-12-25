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

  ["ma_loai", "ma_tien_te", "so_dang_ky", "mo_ta"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  data.ngay_tao = data.ngay_tao ?? null;

  return data;
}

/* ================= GET ALL ================= */
exports.getAll = async (_req, res) => {
  try {
    const rows = await ChiTietDieuChinhTriGia.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET BY ID ================= */
exports.getById = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    const row = await ChiTietDieuChinhTriGia.getById(id);
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
    const created = await ChiTietDieuChinhTriGia.insert(payload);
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
    await ChiTietDieuChinhTriGia.update(id, payload);
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ================= DELETE ================= */
exports.delete = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    await ChiTietDieuChinhTriGia.remove(id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
