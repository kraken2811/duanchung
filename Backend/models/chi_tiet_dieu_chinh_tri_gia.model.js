const db = require("../common/db");
const Chi_tiet_dieu_chinh_tri_gia = (chi_tiet_dieu_chinh_tri_gia) => {
  this.id_chi_tiet = chi_tiet_dieu_chinh_tri_gia.id_chi_tiet;
  this.id_khoan_dieu_chinh = chi_tiet_dieu_chinh_tri_gia.id_khoan_dieu_chinh;
  this.ma_loai = chi_tiet_dieu_chinh_tri_gia.ma_loai;
  this.ma_tien_te = chi_tiet_dieu_chinh_tri_gia.ma_tien_te;
  this.phi = chi_tiet_dieu_chinh_tri_gia.phi;
  this.so_dang_ky = chi_tiet_dieu_chinh_tri_gia.so_dang_ky;
  this.mo_ta = chi_tiet_dieu_chinh_tri_gia.mo_ta;
  this.ngay_tao = chi_tiet_dieu_chinh_tri_gia.ngay_tao;
};
Chi_tiet_dieu_chinh_tri_gia.getById = (id_chi_tiet, callback) => {
  const sqlString = "SELECT * FROM chi_tiet_dieu_chinh_tri_gia WHERE id_chi_tiet = ? ";
  db.query(sqlString, [id_chi_tiet], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Chi_tiet_dieu_chinh_tri_gia.getAll = (callback) => {
  const sqlString = "SELECT * FROM chi_tiet_dieu_chinh_tri_gia ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Chi_tiet_dieu_chinh_tri_gia.insert = (chi_tiet_dieu_chinh_tri_gia, callBack) => {
  const sqlString = "INSERT INTO chi_tiet_dieu_chinh_tri_gia SET ?";
  db.query(sqlString, [chi_tiet_dieu_chinh_tri_gia], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_chi_tiet : res.insertId, ...chi_tiet_dieu_chinh_tri_gia });
  });
};
Chi_tiet_dieu_chinh_tri_gia.update = (chi_tiet_dieu_chinh_tri_gia, id_chi_tiet, callBack) => {
  const sqlString = "UPDATE chi_tiet_dieu_chinh_tri_gia SET ? WHERE id_chi_tiet = ?";
  db.query(sqlString, [chi_tiet_dieu_chinh_tri_gia, id_chi_tiet], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật chi_tiet_dieu_chinh_tri_gia id_chi_tiet = " + "id_chi_tiet" + " thành công");
  });
};
Chi_tiet_dieu_chinh_tri_gia.delete = (id_chi_tiet, callBack) => {
  db.query("DELETE FROM chi_tiet_dieu_chinh_tri_gia WHERE id_chi_tiet = ?", [id_chi_tiet], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa chi_tiet_dieu_chinh_tri_gia id_chi_tiet = " + "id_chi_tiet" + " thành công");
  });
};
module.exports = Chi_tiet_dieu_chinh_tri_gia;
