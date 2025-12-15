const prisma = require('@prisma/client').prisma;
const Bieu_thue = (bieu_thue) => {
  this.id_bieu_thue = bieu_thue.id_bieu_thue;
  this.ma_hs = bieu_thue.ma_hs;
  this.hieu_luc_tu = bieu_thue.hieu_luc_tu;
  this.hieu_luc_den = bieu_thue.hieu_luc_den;
  this.thue_suat = bieu_thue.thue_suat;
  this.thue_vat = bieu_thue.thue_vat;
  this.thue_tieu_thu_dac_biet = bieu_thue.thue_tieu_thu_dac_biet;
  this.ghi_chu = bieu_thue.ghi_chu;
};
Bieu_thue.getById = (id_bieu_thue, callback) => {
  const sqlString = "SELECT * FROM bieu_thue WHERE id_bieu_thue = ? ";
  db.query(sqlString, [id_bieu_thue], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Bieu_thue.getAll = (callback) => {
  const sqlString = "SELECT * FROM bieu_thue ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Bieu_thue.insert = (bieu_thue, callBack) => {
  const sqlString = "INSERT INTO bieu_thue SET ?";
  db.query(sqlString, [bieu_thue], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_bieu_thue : res.insertId, ...bieu_thue });
  });
};
Bieu_thue.update = (bieu_thue, id_bieu_thue, callBack) => {
  const sqlString = "UPDATE bieu_thue SET ? WHERE id_bieu_thue = ?";
  db.query(sqlString, [bieu_thue, id_bieu_thue], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật bieu_thue id_bieu_thue = " + "id_bieu_thue" + " thành công");
  });
};
Bieu_thue.delete = (id_bieu_thue, callBack) => {
  db.query("DELETE FROM bieu_thue WHERE id_bieu_thue = ?", [id_bieu_thue], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa bieu_thue id_bieu_thue = " + "id_bieu_thue" + " thành công");
  });
};
module.exports = Bieu_thue;
