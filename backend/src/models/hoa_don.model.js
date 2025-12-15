const prisma = require('@prisma/client').prisma;
const Hoa_don = (hoa_don) => {
  this.id_hoa_don = hoa_don.id_hoa_don;
  this.so_hoa_don = hoa_don.so_hoa_don;
  this.ngay_hoa_don = hoa_don.ngay_hoa_don;
  this.id_lo_hang = hoa_don.id_lo_hang;
  this.id_nguoi_ban = hoa_don.id_nguoi_ban;
  this.id_nguoi_mua = hoa_don.id_nguoi_mua;
  this.tong_tien = hoa_don.tong_tien;
  this.ma_ngoai_te = hoa_don.ma_ngoai_te;
  this.dieu_kien_giao_hang = hoa_don.dieu_kien_giao_hang;
  this.ngay_tao = hoa_don.ngay_tao;
};
Hoa_don.getById = (id_hoa_don, callback) => {
  const sqlString = "SELECT * FROM hoa_don WHERE id_hoa_don = ? ";
  db.query(sqlString, [id_hoa_don], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Hoa_don.getAll = (callback) => {
  const sqlString = "SELECT * FROM hoa_don ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Hoa_don.insert = (hoa_don, callBack) => {
  const sqlString = "INSERT INTO hoa_don SET ?";
  db.query(sqlString, [hoa_don], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_hoa_don : res.insertId, ...hoa_don });
  });
};
Hoa_don.update = (hoa_don, id_hoa_don, callBack) => {
  const sqlString = "UPDATE hoa_don SET ? WHERE id_hoa_don = ?";
  db.query(sqlString, [hoa_don, id_hoa_don], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật hoa_don id_hoa_don = " + "id_hoa_don" + " thành công");
  });
};
Hoa_don.delete = (id_hoa_don, callBack) => {
  db.query("DELETE FROM hoa_don WHERE id_hoa_don = ?", [id_hoa_don], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa hoa_don id_hoa_don = " + "id_hoa_don" + " thành công");
  });
};
module.exports = Hoa_don;
