const BieuThue = require("../models/bieu_thue.model");

/* ================= GET ALL ================= */
exports.getAll = async (_req, res) => {
  try {
    const rows = await BieuThue.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET BY ID ================= */
exports.getById = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    const row = await BieuThue.getById(id);
    if (!row) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= INSERT ================= */
exports.insert = async (req, res) => {
  try {
    const created = await BieuThue.insert(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ================= UPDATE ================= */
exports.update = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    await BieuThue.update(id, req.body);
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ================= DELETE ================= */
exports.delete = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    await BieuThue.remove(id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
