const CauHinh = require("../models/cau_hinh_he_thong.model");

// helper normalize giữ nguyên
function normalize(body = {}) {
  const data = { ...body };

  ["khoa_cau_hinh", "gia_tri_cau_hinh", "mo_ta", "nguoi_cap_nhat"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  if (data.ngay_cap_nhat === "") data.ngay_cap_nhat = null;

  return data;
}

/* ================= GET ALL ================= */
exports.getAll = async (_req, res) => {
  try {
    const rows = await CauHinh.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET BY ID ================= */
exports.getById = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    const row = await CauHinh.getById(id);
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
    const created = await CauHinh.insert(payload);
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
    await CauHinh.update(id, payload);
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ================= DELETE ================= */
exports.delete = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    await CauHinh.remove(id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
