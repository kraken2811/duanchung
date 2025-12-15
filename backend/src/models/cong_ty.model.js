<<<<<<< Updated upstream
const prisma = require('@prisma/client').prisma;
=======
const db = require("../../common/db");
>>>>>>> Stashed changes
const Cong_ty = (cong_ty) => {
  this.id_cong_ty = cong_ty.id_cong_ty;
  this.ma_so_thue = cong_ty.ma_so_thue;
  this.ten_cong_ty = cong_ty.ten_cong_ty;
  this.dia_chi = cong_ty.dia_chi;
  this.ma_quoc_gia = cong_ty.ma_quoc_gia;
  this.nguoi_lien_he = cong_ty.nguoi_lien_he;
  this.dien_thoai = cong_ty.dien_thoai;
  this.email = cong_ty.email;
  this.ngay_tao = cong_ty.ngay_tao;
};
Cong_ty.getById = (id_cong_ty, callback) => {
  const sqlString = "SELECT * FROM cong_ty WHERE id_cong_ty = ? ";
  db.query(sqlString, [id_cong_ty], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Cong_ty.getAll = (callback) => {
  const sqlString = "SELECT * FROM cong_ty ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Cong_ty.insert = (cong_ty, callBack) => {
  const sqlString = "INSERT INTO cong_ty SET ?";
  db.query(sqlString, [cong_ty], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_cong_ty : res.insertId, ...cong_ty });
  });
};
Cong_ty.update = (cong_ty, id_cong_ty, callBack) => {
  const sqlString = "UPDATE cong_ty SET ? WHERE id_cong_ty = ?";
  db.query(sqlString, [cong_ty, id_cong_ty], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật cong_ty id_cong_ty = " + "id_cong_ty" + " thành công");
  });
};
Cong_ty.delete = (id_cong_ty, callBack) => {
  db.query("DELETE FROM cong_ty WHERE id_cong_ty = ?", [id_cong_ty], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa cong_ty id_cong_ty = " + "id_cong_ty" + " thành công");
  });
};
module.exports = Cong_ty;
