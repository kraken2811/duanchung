const prisma = require('@prisma/client').prisma;
const Danh_muc = (danh_muc) => {
  this.id_danh_muc = danh_muc.id_danh_muc;
  this.id_hop_dong = danh_muc.id_hop_dong;
  this.id_san_pham = danh_muc.id_san_pham;
  this.id_vat_lieu = danh_muc.id_vat_lieu;
  this.danh_muc = danh_muc.danh_muc;
  this.ty_le_hao_hut = danh_muc.ty_le_hao_hut;
  this.ma_lenh_san_xuat = danh_muc.ma_lenh_san_xuat;
  this.nam_tai_chinh = danh_muc.nam_tai_chinh;
  this.trang_thai = danh_muc.trang_thai;
  this.ngay_gui = danh_muc.ngay_gui;
  this.ngay_duyet = danh_muc.ngay_duyet;
  this.ngay_tao = danh_muc.ngay_tao;
};
Danh_muc.getById = (id_danh_muc, callback) => {
  const sqlString = "SELECT * FROM danh_muc WHERE id_danh_muc = ? ";
  db.query(sqlString, [id_danh_muc], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Danh_muc.getAll = (callback) => {
  const sqlString = "SELECT * FROM danh_muc ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Danh_muc.insert = (danh_muc, callBack) => {
  const sqlString = "INSERT INTO danh_muc SET ?";
  db.query(sqlString, [danh_muc], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_danh_muc : res.insertId, ...danh_muc });
  });
};
Danh_muc.update = (danh_muc, id_danh_muc, callBack) => {
  const sqlString = "UPDATE danh_muc SET ? WHERE id_danh_muc = ?";
  db.query(sqlString, [danh_muc, id_danh_muc], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật danh_muc id_danh_muc = " + "id_danh_muc" + " thành công");
  });
};
Danh_muc.delete = (id_danh_muc, callBack) => {
  db.query("DELETE FROM danh_muc WHERE id_danh_muc = ?", [id_danh_muc], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa danh_muc id_danh_muc = " + "id_danh_muc" + " thành công");
  });
};
module.exports = Danh_muc;
