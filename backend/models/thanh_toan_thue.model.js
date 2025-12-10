const db = require("../common/db");
const Thanh_toan_thue = (thanh_toan_thue) => {
  this.id_thanh_toan = thanh_toan_thue.id_thanh_toan;
  this.id_to_khai = thanh_toan_thue.id_to_khai;
  this.so_tien = thanh_toan_thue.so_tien;
  this.ma_ngoai_te = thanh_toan_thue.ma_ngoai_te;
  this.phuong_thuc_thanh_toan = thanh_toan_thue.phuong_thuc_thanh_toan;
  this.trang_thai_thanh_toan = thanh_toan_thue.trang_thai_thanh_toan;
  this.tham_chieu_ngan_hang = thanh_toan_thue.tham_chieu_ngan_hang;
  this.ngay_thanh_toan = thanh_toan_thue.ngay_thanh_toan;
  this.ngay_tao = thanh_toan_thue.ngay_tao;
};
Thanh_toan_thue.getById = (id_thanh_toan, callback) => {
  const sqlString = "SELECT * FROM thanh_toan_thue WHERE id_thanh_toan = ? ";
  db.query(sqlString, [id_thanh_toan], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Thanh_toan_thue.getAll = (callback) => {
  const sqlString = "SELECT * FROM thanh_toan_thue ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Thanh_toan_thue.insert = (thanh_toan_thue, callBack) => {
  const sqlString = "INSERT INTO thanh_toan_thue SET ?";
  db.query(sqlString, [thanh_toan_thue], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_thanh_toan : res.insertId, ...thanh_toan_thue });
  });
};
Thanh_toan_thue.update = (thanh_toan_thue, id_thanh_toan, callBack) => {
  const sqlString = "UPDATE thanh_toan_thue SET ? WHERE id_thanh_toan = ?";
  db.query(sqlString, [thanh_toan_thue, id_thanh_toan], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật thanh_toan_thue id_thanh_toan = " + "id_thanh_toan" + " thành công");
  });
};
Thanh_toan_thue.delete = (id_thanh_toan, callBack) => {
  db.query("DELETE FROM thanh_toan_thue WHERE id_thanh_toan = ?", [id_thanh_toan], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa thanh_toan_thue id_thanh_toan = " + "id_thanh_toan" + " thành công");
  });
};
module.exports = Thanh_toan_thue;
