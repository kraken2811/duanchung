const prisma = require('@prisma/client').prisma;
const Lo_hang = (lo_hang) => {
  this.id_lo_hang = lo_hang.id_lo_hang;
  this.so_lo_hang = lo_hang.so_lo_hang;
  this.id_hop_dong = lo_hang.id_hop_dong;
  this.id_cong_ty = lo_hang.id_cong_ty;
  this.id_dai_ly = lo_hang.id_dai_ly;
  this.id_van_chuyen = lo_hang.id_van_chuyen;
  this.cang_xep_hang = lo_hang.cang_xep_hang;
  this.cang_do_hang = lo_hang.cang_do_hang;
  this.id_loai_van_tai = lo_hang.id_loai_van_tai;
  this.ngay_du_kien_xuat = lo_hang.ngay_du_kien_xuat;
  this.ngay_du_kien_nhap = lo_hang.ngay_du_kien_nhap;
  this.tong_gia_tri = lo_hang.tong_gia_tri;
  this.ma_ngoai_te = lo_hang.ma_ngoai_te;
  this.mo_ta = lo_hang.mo_ta;
  this.nguoi_tao = lo_hang.nguoi_tao;
  this.ngay_tao = lo_hang.ngay_tao;
  this.ngay_cap_nhat = lo_hang.ngay_cap_nhat;
};
Lo_hang.getById = (id_lo_hang, callback) => {
  const sqlString = "SELECT * FROM lo_hang WHERE id_lo_hang = ? ";
  db.query(sqlString, [id_lo_hang], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Lo_hang.getAll = (callback) => {
  const sqlString = "SELECT * FROM lo_hang ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Lo_hang.insert = (lo_hang, callBack) => {
  const sqlString = "INSERT INTO lo_hang SET ?";
  db.query(sqlString, [lo_hang], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_lo_hang : res.insertId, ...lo_hang });
  });
};
Lo_hang.update = (lo_hang, id_lo_hang, callBack) => {
  const sqlString = "UPDATE lo_hang SET ? WHERE id_lo_hang = ?";
  db.query(sqlString, [lo_hang, id_lo_hang], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật lo_hang id_lo_hang = " + "id_lo_hang" + " thành công");
  });
};
Lo_hang.delete = (id_lo_hang, callBack) => {
  db.query("DELETE FROM lo_hang WHERE id_lo_hang = ?", [id_lo_hang], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa lo_hang id_lo_hang = " + "id_lo_hang" + " thành công");
  });
};
module.exports = Lo_hang;
