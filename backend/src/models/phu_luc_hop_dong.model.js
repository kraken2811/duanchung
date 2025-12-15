const prisma = require('@prisma/client').prisma;
const Phu_luc_hop_dong = (phu_luc_hop_dong) => {
  this.id_phu_luc = phu_luc_hop_dong.id_phu_luc;
  this.id_hop_dong = phu_luc_hop_dong.id_hop_dong;
  this.so_phu_luc = phu_luc_hop_dong.so_phu_luc;
  this.ngay_phu_luc = phu_luc_hop_dong.ngay_phu_luc;
  this.mo_ta = phu_luc_hop_dong.mo_ta;
  this.loai_thay_doi = phu_luc_hop_dong.loai_thay_doi;
  this.trang_thai = phu_luc_hop_dong.trang_thai;
  this.nguoi_tao = phu_luc_hop_dong.nguoi_tao;
  this.ngay_tao = phu_luc_hop_dong.ngay_tao;
};
Phu_luc_hop_dong.getById = (id_phu_luc, callback) => {
  const sqlString = "SELECT * FROM phu_luc_hop_dong WHERE id_phu_luc = ? ";
  db.query(sqlString, [id_phu_luc], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Phu_luc_hop_dong.getAll = (callback) => {
  const sqlString = "SELECT * FROM phu_luc_hop_dong ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Phu_luc_hop_dong.insert = (phu_luc_hop_dong, callBack) => {
  const sqlString = "INSERT INTO phu_luc_hop_dong SET ?";
  db.query(sqlString, [phu_luc_hop_dong], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_phu_luc : res.insertId, ...phu_luc_hop_dong });
  });
};
Phu_luc_hop_dong.update = (phu_luc_hop_dong, id_phu_luc, callBack) => {
  const sqlString = "UPDATE phu_luc_hop_dong SET ? WHERE id_phu_luc = ?";
  db.query(sqlString, [phu_luc_hop_dong, id_phu_luc], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật phu_luc_hop_dong id_phu_luc = " + "id_phu_luc" + " thành công");
  });
};
Phu_luc_hop_dong.delete = (id_phu_luc, callBack) => {
  db.query("DELETE FROM phu_luc_hop_dong WHERE id_phu_luc = ?", [id_phu_luc], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa phu_luc_hop_dong id_phu_luc = " + "id_phu_luc" + " thành công");
  });
};
module.exports = Phu_luc_hop_dong;
