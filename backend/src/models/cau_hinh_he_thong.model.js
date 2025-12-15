<<<<<<< Updated upstream
const prisma = require('@prisma/client').prisma;
=======
const db = require("../../common/db");
>>>>>>> Stashed changes
const Cau_hinh_he_thong = (cau_hinh_he_thong) => {
  this.id_cau_hinh = cau_hinh_he_thong.id_cau_hinh;
  this.khoa_cau_hinh = cau_hinh_he_thong.khoa_cau_hinh;
  this.gia_tri_cau_hinh = cau_hinh_he_thong.gia_tri_cau_hinh;
  this.mo_ta = cau_hinh_he_thong.mo_ta;
  this.nguoi_cap_nhat = cau_hinh_he_thong.nguoi_cap_nhat;
  this.ngay_cap_nhat = cau_hinh_he_thong.ngay_cap_nhat;
};
Cau_hinh_he_thong.getById = (id_cau_hinh, callback) => {
  const sqlString = "SELECT * FROM cau_hinh_he_thong WHERE id_cau_hinh = ? ";
  db.query(sqlString, [id_cau_hinh], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Cau_hinh_he_thong.getAll = (callback) => {
  const sqlString = "SELECT * FROM cau_hinh_he_thong ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Cau_hinh_he_thong.insert = (cau_hinh_he_thong, callBack) => {
  const sqlString = "INSERT INTO cau_hinh_he_thong SET ?";
  db.query(sqlString, [cau_hinh_he_thong], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_cau_hinh : res.insertId, ...cau_hinh_he_thong });
  });
};
Cau_hinh_he_thong.update = (cau_hinh_he_thong, id_cau_hinh, callBack) => {
  const sqlString = "UPDATE cau_hinh_he_thong SET ? WHERE id_cau_hinh = ?";
  db.query(sqlString, [cau_hinh_he_thong, id_cau_hinh], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật cau_hinh_he_thong id_cau_hinh = " + "id_cau_hinh" + " thành công");
  });
};
Cau_hinh_he_thong.delete = (id_cau_hinh, callBack) => {
  db.query("DELETE FROM cau_hinh_he_thong WHERE id_cau_hinh = ?", [id_cau_hinh], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa cau_hinh_he_thong id_cau_hinh = " + "id_cau_hinh" + " thành công");
  });
};
module.exports = Cau_hinh_he_thong;
