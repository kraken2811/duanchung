const db = require("../common/db");
const Khoan_dieu_chinh_tri_gia = (khoan_dieu_chinh_tri_gia) => {
  this.id_khoan_dieu_chinh = khoan_dieu_chinh_tri_gia.id_khoan_dieu_chinh;
  this.id_to_khai_tri_gia = khoan_dieu_chinh_tri_gia.id_to_khai_tri_gia;
  this.stt = khoan_dieu_chinh_tri_gia.stt;
  this.ma_ten = khoan_dieu_chinh_tri_gia.ma_ten;
  this.ma_phan_loai = khoan_dieu_chinh_tri_gia.ma_phan_loai;
  this.ma_tien_te = khoan_dieu_chinh_tri_gia.ma_tien_te;
  this.tri_gia_dieu_chinh = khoan_dieu_chinh_tri_gia.tri_gia_dieu_chinh;
  this.tong_he_so_phan_bo = khoan_dieu_chinh_tri_gia.tong_he_so_phan_bo;
  this.loai_dieu_chinh = khoan_dieu_chinh_tri_gia.loai_dieu_chinh;
  this.ngay_tao = khoan_dieu_chinh_tri_gia.ngay_tao;
};
Khoan_dieu_chinh_tri_gia.getById = (id_khoan_dieu_chinh, callback) => {
  const sqlString = "SELECT * FROM khoan_dieu_chinh_tri_gia WHERE id_khoan_dieu_chinh = ? ";
  db.query(sqlString, [id_khoan_dieu_chinh], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Khoan_dieu_chinh_tri_gia.getAll = (callback) => {
  const sqlString = "SELECT * FROM khoan_dieu_chinh_tri_gia ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Khoan_dieu_chinh_tri_gia.insert = (khoan_dieu_chinh_tri_gia, callBack) => {
  const sqlString = "INSERT INTO khoan_dieu_chinh_tri_gia SET ?";
  db.query(sqlString, [khoan_dieu_chinh_tri_gia], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_khoan_dieu_chinh : res.insertId, ...khoan_dieu_chinh_tri_gia });
  });
};
Khoan_dieu_chinh_tri_gia.update = (khoan_dieu_chinh_tri_gia, id_khoan_dieu_chinh, callBack) => {
  const sqlString = "UPDATE khoan_dieu_chinh_tri_gia SET ? WHERE id_khoan_dieu_chinh = ?";
  db.query(sqlString, [khoan_dieu_chinh_tri_gia, id_khoan_dieu_chinh], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật khoan_dieu_chinh_tri_gia id_khoan_dieu_chinh = " + "id_khoan_dieu_chinh" + " thành công");
  });
};
Khoan_dieu_chinh_tri_gia.delete = (id_khoan_dieu_chinh, callBack) => {
  db.query("DELETE FROM khoan_dieu_chinh_tri_gia WHERE id_khoan_dieu_chinh = ?", [id_khoan_dieu_chinh], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa khoan_dieu_chinh_tri_gia id_khoan_dieu_chinh = " + "id_khoan_dieu_chinh" + " thành công");
  });
};
module.exports = Khoan_dieu_chinh_tri_gia;
