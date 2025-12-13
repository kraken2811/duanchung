const AuditLog = require('../models/audit_log.model');

exports.getAll = async (_req, res) => {
  try {
    const rows = await AuditLog.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'id không hợp lệ' });
  }

  try {
    const row = await AuditLog.getById(id);
    if (!row) return res.status(404).json({ error: 'Không tìm thấy' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.insert = async (req, res) => {
  try {
    const created = await AuditLog.insert(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'id không hợp lệ' });
  }

  try {
    await AuditLog.update(id, req.body);
    res.json({ message: 'Cập nhật thành công' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'id không hợp lệ' });
  }

  try {
    await AuditLog.remove(id);
    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
