const prisma = require('@prisma/client').prisma;
const Giao_dich_ngan_hang = (giao_dich_ngan_hang) => {
  this.id_giao_dich = giao_dich_ngan_hang.id_giao_dich;
  this.id_thanh_toan = giao_dich_ngan_hang.id_thanh_toan;
  this.ten_ngan_hang = giao_dich_ngan_hang.ten_ngan_hang;
  this.tai_khoan_ngan_hang = giao_dich_ngan_hang.tai_khoan_ngan_hang;
  this.so_tien = giao_dich_ngan_hang.so_tien;
  this.thoi_gian_giao_dich = giao_dich_ngan_hang.thoi_gian_giao_dich;
  this.ma_phan_hoi = giao_dich_ngan_hang.ma_phan_hoi;
  this.thong_diep_phan_hoi = giao_dich_ngan_hang.thong_diep_phan_hoi;
  this.ngay_tao = giao_dich_ngan_hang.ngay_tao;
};
Giao_dich_ngan_hang.getById = (id_giao_dich, callback) => {
  const sqlString = "SELECT * FROM giao_dich_ngan_hang WHERE id_giao_dich = ? ";
  db.query(sqlString, [id_giao_dich], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Giao_dich_ngan_hang.getAll = (callback) => {
  const sqlString = "SELECT * FROM giao_dich_ngan_hang ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Giao_dich_ngan_hang.insert = (giao_dich_ngan_hang, callBack) => {
  const sqlString = "INSERT INTO giao_dich_ngan_hang SET ?";
  db.query(sqlString, [giao_dich_ngan_hang], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_giao_dich : res.insertId, ...giao_dich_ngan_hang });
  });
};
Giao_dich_ngan_hang.update = (giao_dich_ngan_hang, id_giao_dich, callBack) => {
  const sqlString = "UPDATE giao_dich_ngan_hang SET ? WHERE id_giao_dich = ?";
  db.query(sqlString, [giao_dich_ngan_hang, id_giao_dich], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật giao_dich_ngan_hang id_giao_dich = " + "id_giao_dich" + " thành công");
  });
};
Giao_dich_ngan_hang.delete = (id_giao_dich, callBack) => {
  db.query("DELETE FROM giao_dich_ngan_hang WHERE id_giao_dich = ?", [id_giao_dich], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa giao_dich_ngan_hang id_giao_dich = " + "id_giao_dich" + " thành công");
  });
};
module.exports = Giao_dich_ngan_hang;
