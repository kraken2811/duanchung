<<<<<<< Updated upstream
const prisma = require('@prisma/client').prisma;
=======
const db = require("../../common/db");
>>>>>>> Stashed changes
const Lich_su_trang_thai = (lich_su_trang_thai) => {
  this.id_lich_su = lich_su_trang_thai.id_lich_su;
  this.id_to_khai = lich_su_trang_thai.id_to_khai;
  this.trang_thai_cu = lich_su_trang_thai.trang_thai_cu;
  this.trang_thai_moi = lich_su_trang_thai.trang_thai_moi;
  this.nguoi_thay_doi = lich_su_trang_thai.nguoi_thay_doi;
  this.ngay_thay_doi = lich_su_trang_thai.ngay_thay_doi;
  this.ghi_chu = lich_su_trang_thai.ghi_chu;
};
Lich_su_trang_thai.getById = (id_lich_su, callback) => {
  const sqlString = "SELECT * FROM lich_su_trang_thai WHERE id_lich_su = ? ";
  db.query(sqlString, [id_lich_su], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Lich_su_trang_thai.getAll = (callback) => {
  const sqlString = "SELECT * FROM lich_su_trang_thai ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Lich_su_trang_thai.insert = (lich_su_trang_thai, callBack) => {
  const sqlString = "INSERT INTO lich_su_trang_thai SET ?";
  db.query(sqlString, [lich_su_trang_thai], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_lich_su : res.insertId, ...lich_su_trang_thai });
  });
};
Lich_su_trang_thai.update = (lich_su_trang_thai, id_lich_su, callBack) => {
  const sqlString = "UPDATE lich_su_trang_thai SET ? WHERE id_lich_su = ?";
  db.query(sqlString, [lich_su_trang_thai, id_lich_su], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật lich_su_trang_thai id_lich_su = " + "id_lich_su" + " thành công");
  });
};
Lich_su_trang_thai.delete = (id_lich_su, callBack) => {
  db.query("DELETE FROM lich_su_trang_thai WHERE id_lich_su = ?", [id_lich_su], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa lich_su_trang_thai id_lich_su = " + "id_lich_su" + " thành công");
  });
};
module.exports = Lich_su_trang_thai;
