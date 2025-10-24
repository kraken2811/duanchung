const db = require("../common/db");
const Chi_tiet_to_khai = (chi_tiet_to_khai) => {
  this.id_chi_tiet = chi_tiet_to_khai.id_chi_tiet;
  this.id_to_khai = chi_tiet_to_khai.id_to_khai;
  this.so_dong = chi_tiet_to_khai.so_dong;
  this.ma_hs = chi_tiet_to_khai.ma_hs;
  this.mo_ta_hang_hoa = chi_tiet_to_khai.mo_ta_hang_hoa;
  this.so_luong = chi_tiet_to_khai.so_luong;
  this.don_vi_tinh = chi_tiet_to_khai.don_vi_tinh;
  this.don_gia = chi_tiet_to_khai.don_gia;
  this.tong_gia_tri = chi_tiet_to_khai.tong_gia_tri;
  this.ma_ngoai_te = chi_tiet_to_khai.ma_ngoai_te;
  this.ma_quoc_gia = chi_tiet_to_khai.ma_quoc_gia;
  this.id_bieu_thue = chi_tiet_to_khai.id_bieu_thue;
  this.tien_thue = chi_tiet_to_khai.tien_thue;
  this.tien_vat = chi_tiet_to_khai.tien_vat;
  this.thue_bo_sung = chi_tiet_to_khai.thue_bo_sung;
  this.ngay_tao = chi_tiet_to_khai.ngay_tao;
};
Chi_tiet_to_khai.getById = (id_chi_tiet, callback) => {
  const sqlString = "SELECT * FROM chi_tiet_to_khai WHERE id_chi_tiet = ? ";
  db.query(sqlString, [id_chi_tiet], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Chi_tiet_to_khai.getAll = (callback) => {
  const sqlString = "SELECT * FROM chi_tiet_to_khai ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Chi_tiet_to_khai.insert = (chi_tiet_to_khai, callBack) => {
  const sqlString = "INSERT INTO chi_tiet_to_khai SET ?";
  db.query(sqlString, [chi_tiet_to_khai], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_chi_tiet : res.insertId, ...chi_tiet_to_khai });
  });
};
Chi_tiet_to_khai.update = (chi_tiet_to_khai, id_chi_tiet, callBack) => {
  const sqlString = "UPDATE chi_tiet_to_khai SET ? WHERE id_chi_tiet = ?";
  db.query(sqlString, [chi_tiet_to_khai, id_chi_tiet], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật chi_tiet_to_khai id_chi_tiet = " + "id_chi_tiet" + " thành công");
  });
};
Chi_tiet_to_khai.delete = (id_chi_tiet, callBack) => {
  db.query("DELETE FROM chi_tiet_to_khai WHERE id_chi_tiet = ?", [id_chi_tiet], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa chi_tiet_to_khai id_chi_tiet = " + "id_chi_tiet" + " thành công");
  });
};
module.exports = Chi_tiet_to_khai;
