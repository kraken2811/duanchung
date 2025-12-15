<<<<<<< Updated upstream
const prisma = require('@prisma/client').prisma;
=======
const db = require("../../common/db");
>>>>>>> Stashed changes
const Thong_bao_he_thong = (thong_bao_he_thong) => {
  this.id_thong_bao = thong_bao_he_thong.id_thong_bao;
  this.id_nguoi_dung = thong_bao_he_thong.id_nguoi_dung;
  this.tieu_de = thong_bao_he_thong.tieu_de;
  this.noi_dung = thong_bao_he_thong.noi_dung;
  this.loai_thong_bao = thong_bao_he_thong.loai_thong_bao;
  this.id_lien_quan = thong_bao_he_thong.id_lien_quan;
  this.da_doc = thong_bao_he_thong.da_doc;
  this.ngay_tao = thong_bao_he_thong.ngay_tao;
};
Thong_bao_he_thong.getById = (id_thong_bao, callback) => {
  const sqlString = "SELECT * FROM thong_bao_he_thong WHERE id_thong_bao = ? ";
  db.query(sqlString, [id_thong_bao], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Thong_bao_he_thong.getAll = (callback) => {
  const sqlString = "SELECT * FROM thong_bao_he_thong ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Thong_bao_he_thong.insert = (thong_bao_he_thong, callBack) => {
  const sqlString = "INSERT INTO thong_bao_he_thong SET ?";
  db.query(sqlString, [thong_bao_he_thong], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_thong_bao : res.insertId, ...thong_bao_he_thong });
  });
};
Thong_bao_he_thong.update = (thong_bao_he_thong, id_thong_bao, callBack) => {
  const sqlString = "UPDATE thong_bao_he_thong SET ? WHERE id_thong_bao = ?";
  db.query(sqlString, [thong_bao_he_thong, id_thong_bao], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật thong_bao_he_thong id_thong_bao = " + "id_thong_bao" + " thành công");
  });
};
Thong_bao_he_thong.delete = (id_thong_bao, callBack) => {
  db.query("DELETE FROM thong_bao_he_thong WHERE id_thong_bao = ?", [id_thong_bao], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa thong_bao_he_thong id_thong_bao = " + "id_thong_bao" + " thành công");
  });
};
module.exports = Thong_bao_he_thong;
