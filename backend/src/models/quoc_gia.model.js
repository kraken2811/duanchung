const prisma = require('@prisma/client').prisma;
const Quoc_gia = (quoc_gia) => {
  this.id_quoc_gia = quoc_gia.id_quoc_gia;
  this.ma_quoc_gia = quoc_gia.ma_quoc_gia;
  this.ten_quoc_gia = quoc_gia.ten_quoc_gia;
  this.ma_vung = quoc_gia.ma_vung;
  this.ngay_tao = quoc_gia.ngay_tao;
};
Quoc_gia.getById = (id_quoc_gia, callback) => {
  const sqlString = "SELECT * FROM quoc_gia WHERE id_quoc_gia = ? ";
  db.query(sqlString, [id_quoc_gia], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Quoc_gia.getAll = (callback) => {
  const sqlString = "SELECT * FROM quoc_gia ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Quoc_gia.insert = (quoc_gia, callBack) => {
  const sqlString = "INSERT INTO quoc_gia SET ?";
  db.query(sqlString, [quoc_gia], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_quoc_gia : res.insertId, ...quoc_gia });
  });
};
Quoc_gia.update = (quoc_gia, id_quoc_gia, callBack) => {
  const sqlString = "UPDATE quoc_gia SET ? WHERE id_quoc_gia = ?";
  db.query(sqlString, [quoc_gia, id_quoc_gia], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật quoc_gia id_quoc_gia = " + "id_quoc_gia" + " thành công");
  });
};
Quoc_gia.delete = (id_quoc_gia, callBack) => {
  db.query("DELETE FROM quoc_gia WHERE id_quoc_gia = ?", [id_quoc_gia], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa quoc_gia id_quoc_gia = " + "id_quoc_gia" + " thành công");
  });
};
module.exports = Quoc_gia;
