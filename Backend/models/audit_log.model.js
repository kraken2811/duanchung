// models/audit_log.model.js
const db = require("../common/db");

// KHÔNG dùng arrow + this làm "constructor" vì không cần; giữ lại nếu bạn muốn.
const Audit_log = function (audit_log) {
  this.id_log = audit_log.id_log;
  this.id_nguoi_dung = audit_log.id_nguoi_dung;
  this.ten_bang = audit_log.ten_bang;
  this.id_ban_ghi = audit_log.id_ban_ghi;
  this.hanh_dong = audit_log.hanh_dong;
  this.du_lieu_cu = audit_log.du_lieu_cu;
  this.du_lieu_moi = audit_log.du_lieu_moi;
  this.ngay_tao = audit_log.ngay_tao;
};

// LẤY 1 BẢN GHI
Audit_log.getById = (id_log, callback) => {
  const sql = "SELECT * FROM audit_log WHERE id_log = ?";
  db.query(sql, [id_log], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};

// LẤY TẤT CẢ
Audit_log.getAll = (callback) => {
  const sql = "SELECT * FROM audit_log";
  db.query(sql, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};

// THÊM
Audit_log.insert = (audit_log, callback) => {
  const sql = "INSERT INTO audit_log SET ?";
  db.query(sql, [audit_log], (err, res) => {
    if (err) return callback(err, null);
    callback(null, { id_log: res.insertId, ...audit_log });
  });
};

// CẬP NHẬT
Audit_log.update = (audit_log, id_log, callback) => {
  const sql = "UPDATE audit_log SET ? WHERE id_log = ?";
  db.query(sql, [audit_log, id_log], (err, res) => {
    if (err) return callback(err, null);
    callback(null, `Cập nhật audit_log id_log = ${id_log} thành công`);
  });
};

// XOÁ
Audit_log.delete = (id_log, callback) => {
  const sql = "DELETE FROM audit_log WHERE id_log = ?";
  db.query(sql, [id_log], (err, res) => {
    if (err) return callback(err, null);
    callback(null, `Xóa audit_log id_log = ${id_log} thành công`);
  });
};

module.exports = Audit_log; // Dùng DUY NHẤT cách export này
