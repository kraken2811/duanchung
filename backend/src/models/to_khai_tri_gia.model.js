const prisma = require('@prisma/client').prisma;
const To_khai_tri_gia = (to_khai_tri_gia) => {
  this.id_to_khai_tri_gia = to_khai_tri_gia.id_to_khai_tri_gia;
  this.id_to_khai_hai_quan = to_khai_tri_gia.id_to_khai_hai_quan;
  this.ma_phan_loai_khai_tri_gia = to_khai_tri_gia.ma_phan_loai_khai_tri_gia;
  this.so_tiep_nhan_to_khai_tri_gia_tong_hop = to_khai_tri_gia.so_tiep_nhan_to_khai_tri_gia_tong_hop;
  this.ma_tien_te = to_khai_tri_gia.ma_tien_te;
  this.gia_co_so_hieu_chinh = to_khai_tri_gia.gia_co_so_hieu_chinh;
  this.tong_he_so_phan_bo = to_khai_tri_gia.tong_he_so_phan_bo;
  this.nguoi_nop_thue = to_khai_tri_gia.nguoi_nop_thue;
  this.ngay_tao = to_khai_tri_gia.ngay_tao;
  this.nguoi_tao = to_khai_tri_gia.nguoi_tao;
};
To_khai_tri_gia.getById = (id_to_khai_tri_gia, callback) => {
  const sqlString = "SELECT * FROM to_khai_tri_gia WHERE id_to_khai_tri_gia = ? ";
  db.query(sqlString, [id_to_khai_tri_gia], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
To_khai_tri_gia.getAll = (callback) => {
  const sqlString = "SELECT * FROM to_khai_tri_gia ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
To_khai_tri_gia.insert = (to_khai_tri_gia, callBack) => {
  const sqlString = "INSERT INTO to_khai_tri_gia SET ?";
  db.query(sqlString, [to_khai_tri_gia], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_to_khai_tri_gia : res.insertId, ...to_khai_tri_gia });
  });
};
To_khai_tri_gia.update = (to_khai_tri_gia, id_to_khai_tri_gia, callBack) => {
  const sqlString = "UPDATE to_khai_tri_gia SET ? WHERE id_to_khai_tri_gia = ?";
  db.query(sqlString, [to_khai_tri_gia, id_to_khai_tri_gia], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật to_khai_tri_gia id_to_khai_tri_gia = " + "id_to_khai_tri_gia" + " thành công");
  });
};
To_khai_tri_gia.delete = (id_to_khai_tri_gia, callBack) => {
  db.query("DELETE FROM to_khai_tri_gia WHERE id_to_khai_tri_gia = ?", [id_to_khai_tri_gia], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa to_khai_tri_gia id_to_khai_tri_gia = " + "id_to_khai_tri_gia" + " thành công");
  });
};
module.exports = To_khai_tri_gia;
