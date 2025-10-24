// controllers/container.controller.js
const Container = require("../models/container.model");

// (helper) chuẩn hoá dữ liệu vào DB
function normalize(body = {}) {
  const data = { ...body };

  const toNumOrNull = (v) =>
    v === undefined || v === null || v === "" || Number.isNaN(Number(v))
      ? null
      : Number(v);

  data.id_lo_hang = toNumOrNull(data.id_lo_hang);
  data.trong_luong_brut = toNumOrNull(data.trong_luong_brut);
  data.trong_luong_net  = toNumOrNull(data.trong_luong_net);

  // Chuỗi: trim
  ["so_container", "so_chi", "loai_container"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // Ngày cho phép null nếu rỗng
  if (data.ngay_tao === "") data.ngay_tao = null;

  return data;
}

// GET /containers/all
exports.getAll = (_req, res) => {
  Container.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// GET /containers/:id
exports.getById = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  Container.getById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(rows[0]);
  });
};

// POST /containers
exports.insert = (req, res) => {
  const payload = normalize(req.body);

  Container.insert(payload, (err, created) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(created);
  });
};

// PUT /containers/:id
exports.update = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  Container.update(payload, id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};

// DELETE /containers/:id
exports.delete = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  Container.delete(id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};
