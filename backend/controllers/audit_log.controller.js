// controllers/audit_log.controller.js
const AuditLog = require("../models/audit_log.model");

exports.getAll = (_req, res) => {
  AuditLog.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getById = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  AuditLog.getById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows || rows.length === 0) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(rows[0]);
  });
};

exports.insert = (req, res) => {
  const body = { ...req.body };
  if (body.du_lieu_cu && typeof body.du_lieu_cu === "object") body.du_lieu_cu = JSON.stringify(body.du_lieu_cu);
  if (body.du_lieu_moi && typeof body.du_lieu_moi === "object") body.du_lieu_moi = JSON.stringify(body.du_lieu_moi);

  AuditLog.insert(body, (err, created) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(created);
  });
};

exports.update = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  const body = { ...req.body };
  if (body.du_lieu_cu && typeof body.du_lieu_cu === "object") body.du_lieu_cu = JSON.stringify(body.du_lieu_cu);
  if (body.du_lieu_moi && typeof body.du_lieu_moi === "object") body.du_lieu_moi = JSON.stringify(body.du_lieu_moi);

  AuditLog.update(body, id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};

exports.delete = (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id không hợp lệ" });

  AuditLog.delete(id, (err, msg) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: msg });
  });
};
