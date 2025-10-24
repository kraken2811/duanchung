const db = require("../common/db");
const San_pham_hop_dong = (san_pham_hop_dong) => {
  this.id_san_pham = san_pham_hop_dong.id_san_pham;
  this.id_hop_dong = san_pham_hop_dong.id_hop_dong;
  this.ma_san_pham = san_pham_hop_dong.ma_san_pham;
  this.ten_san_pham = san_pham_hop_dong.ten_san_pham;
  this.don_vi_tinh = san_pham_hop_dong.don_vi_tinh;
  this.so_luong = san_pham_hop_dong.so_luong;
  this.ma_hs = san_pham_hop_dong.ma_hs;
  this.don_gia = san_pham_hop_dong.don_gia;
  this.tong_gia_tri = san_pham_hop_dong.tong_gia_tri;
  this.ngay_tao = san_pham_hop_dong.ngay_tao;
};
San_pham_hop_dong.getById = (id_san_pham, callback) => {
  const sqlString = "SELECT * FROM san_pham_hop_dong WHERE id_san_pham = ? ";
  db.query(sqlString, [id_san_pham], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
San_pham_hop_dong.getAll = (callback) => {
  const sqlString = "SELECT * FROM san_pham_hop_dong ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
San_pham_hop_dong.insert = (san_pham_hop_dong, callBack) => {
  const sqlString = "INSERT INTO san_pham_hop_dong SET ?";
  db.query(sqlString, [san_pham_hop_dong], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_san_pham : res.insertId, ...san_pham_hop_dong });
  });
};
San_pham_hop_dong.update = (san_pham_hop_dong, id_san_pham, callBack) => {
  const sqlString = "UPDATE san_pham_hop_dong SET ? WHERE id_san_pham = ?";
  db.query(sqlString, [san_pham_hop_dong, id_san_pham], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật san_pham_hop_dong id_san_pham = " + "id_san_pham" + " thành công");
  });
};
San_pham_hop_dong.delete = (id_san_pham, callBack) => {
  db.query("DELETE FROM san_pham_hop_dong WHERE id_san_pham = ?", [id_san_pham], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa san_pham_hop_dong id_san_pham = " + "id_san_pham" + " thành công");
  });
};
module.exports = San_pham_hop_dong;
