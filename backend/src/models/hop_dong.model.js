<<<<<<< Updated upstream
const prisma = require('@prisma/client').prisma;
=======
const db = require("../../common/db");
>>>>>>> Stashed changes
const Hop_dong = (hop_dong) => {
  this.id_hop_dong = hop_dong.id_hop_dong;
  this.so_hop_dong = hop_dong.so_hop_dong;
  this.loai_hop_dong = hop_dong.loai_hop_dong;
  this.id_cong_ty = hop_dong.id_cong_ty;
  this.id_doi_tac = hop_dong.id_doi_tac;
  this.ngay_ky = hop_dong.ngay_ky;
  this.ngay_het_han = hop_dong.ngay_het_han;
  this.hieu_luc_tu = hop_dong.hieu_luc_tu;
  this.hieu_luc_den = hop_dong.hieu_luc_den;
  this.trang_thai = hop_dong.trang_thai;
  this.tong_gia_tri = hop_dong.tong_gia_tri;
  this.phi_gia_cong = hop_dong.phi_gia_cong;
  this.ma_ngoai_te = hop_dong.ma_ngoai_te;
  this.dieu_kien_thanh_toan = hop_dong.dieu_kien_thanh_toan;
  this.ma_cuc_hai_quan = hop_dong.ma_cuc_hai_quan;
  this.nguoi_tao = hop_dong.nguoi_tao;
  this.ngay_tao = hop_dong.ngay_tao;
  this.ngay_cap_nhat = hop_dong.ngay_cap_nhat;
};
Hop_dong.getById = (id_hop_dong, callback) => {
  const sqlString = "SELECT * FROM hop_dong WHERE id_hop_dong = ? ";
  db.query(sqlString, [id_hop_dong], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Hop_dong.getAll = (callback) => {
  const sqlString = "SELECT * FROM hop_dong ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Hop_dong.insert = (hop_dong, callBack) => {
  const sqlString = "INSERT INTO hop_dong SET ?";
  db.query(sqlString, [hop_dong], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_hop_dong : res.insertId, ...hop_dong });
  });
};
Hop_dong.update = (hop_dong, id_hop_dong, callBack) => {
  const sqlString = "UPDATE hop_dong SET ? WHERE id_hop_dong = ?";
  db.query(sqlString, [hop_dong, id_hop_dong], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật hop_dong id_hop_dong = " + "id_hop_dong" + " thành công");
  });
};
Hop_dong.delete = (id_hop_dong, callBack) => {
  db.query("DELETE FROM hop_dong WHERE id_hop_dong = ?", [id_hop_dong], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa hop_dong id_hop_dong = " + "id_hop_dong" + " thành công");
  });
};
module.exports = Hop_dong;
