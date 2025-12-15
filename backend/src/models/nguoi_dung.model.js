const prisma = require('@prisma/client').prisma;
const Nguoi_dung = (nguoi_dung) => {
  this.id_nguoi_dung = nguoi_dung.id_nguoi_dung;
  this.ten_dang_nhap = nguoi_dung.ten_dang_nhap;
  this.mat_khau = nguoi_dung.mat_khau;
  this.ho_ten = nguoi_dung.ho_ten;
  this.email = nguoi_dung.email;
  this.dien_thoai = nguoi_dung.dien_thoai;
  this.id_vai_tro = nguoi_dung.id_vai_tro;
  this.id_cong_ty = nguoi_dung.id_cong_ty;
  this.kich_hoat = nguoi_dung.kich_hoat;
  this.ngay_tao = nguoi_dung.ngay_tao;
  this.ngay_cap_nhat = nguoi_dung.ngay_cap_nhat;
};
Nguoi_dung.getById = (id_nguoi_dung, callback) => {
  const sqlString = "SELECT * FROM nguoi_dung WHERE id_nguoi_dung = ? ";
  db.query(sqlString, [id_nguoi_dung], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Nguoi_dung.getAll = (callback) => {
  const sqlString = "SELECT * FROM nguoi_dung ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Nguoi_dung.insert = (nguoi_dung, callBack) => {
  const sqlString = "INSERT INTO nguoi_dung SET ?";
  db.query(sqlString, [nguoi_dung], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_nguoi_dung : res.insertId, ...nguoi_dung });
  });
};
Nguoi_dung.update = (nguoi_dung, id_nguoi_dung, callBack) => {
  const sqlString = "UPDATE nguoi_dung SET ? WHERE id_nguoi_dung = ?";
  db.query(sqlString, [nguoi_dung, id_nguoi_dung], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật nguoi_dung id_nguoi_dung = " + "id_nguoi_dung" + " thành công");
  });
};
Nguoi_dung.delete = (id_nguoi_dung, callBack) => {
  db.query("DELETE FROM nguoi_dung WHERE id_nguoi_dung = ?", [id_nguoi_dung], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa nguoi_dung id_nguoi_dung = " + "id_nguoi_dung" + " thành công");
  });
};
module.exports = Nguoi_dung;
