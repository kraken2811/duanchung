const prisma = require('@prisma/client').prisma;
const Doi_tac = (doi_tac) => {
  this.id_doi_tac = doi_tac.id_doi_tac;
  this.ma_so_thue = doi_tac.ma_so_thue;
  this.ten_doi_tac = doi_tac.ten_doi_tac;
  this.dia_chi = doi_tac.dia_chi;
  this.ma_quoc_gia = doi_tac.ma_quoc_gia;
  this.nguoi_lien_he = doi_tac.nguoi_lien_he;
  this.dien_thoai_lien_he = doi_tac.dien_thoai_lien_he;
  this.email_lien_he = doi_tac.email_lien_he;
  this.loai_doi_tac = doi_tac.loai_doi_tac;
  this.id_cong_ty = doi_tac.id_cong_ty;
  this.ngay_tao = doi_tac.ngay_tao;
};
Doi_tac.getById = (id_doi_tac, callback) => {
  const sqlString = "SELECT * FROM doi_tac WHERE id_doi_tac = ? ";
  db.query(sqlString, [id_doi_tac], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Doi_tac.getAll = (callback) => {
  const sqlString = "SELECT * FROM doi_tac ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Doi_tac.insert = (doi_tac, callBack) => {
  const sqlString = "INSERT INTO doi_tac SET ?";
  db.query(sqlString, [doi_tac], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_doi_tac : res.insertId, ...doi_tac });
  });
};
Doi_tac.update = (doi_tac, id_doi_tac, callBack) => {
  const sqlString = "UPDATE doi_tac SET ? WHERE id_doi_tac = ?";
  db.query(sqlString, [doi_tac, id_doi_tac], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật doi_tac id_doi_tac = " + "id_doi_tac" + " thành công");
  });
};
Doi_tac.delete = (id_doi_tac, callBack) => {
  db.query("DELETE FROM doi_tac WHERE id_doi_tac = ?", [id_doi_tac], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa doi_tac id_doi_tac = " + "id_doi_tac" + " thành công");
  });
};
module.exports = Doi_tac;
