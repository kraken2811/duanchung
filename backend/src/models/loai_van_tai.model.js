<<<<<<< Updated upstream
const prisma = require('@prisma/client').prisma;
=======
const db = require("../../common/db");
>>>>>>> Stashed changes
const Loai_van_tai = (loai_van_tai) => {
  this.id_loai_van_tai = loai_van_tai.id_loai_van_tai;
  this.ma_loai_van_tai = loai_van_tai.ma_loai_van_tai;
  this.ten_loai_van_tai = loai_van_tai.ten_loai_van_tai;
  this.mo_ta = loai_van_tai.mo_ta;
  this.ngay_tao = loai_van_tai.ngay_tao;
};
Loai_van_tai.getById = (id_loai_van_tai, callback) => {
  const sqlString = "SELECT * FROM loai_van_tai WHERE id_loai_van_tai = ? ";
  db.query(sqlString, [id_loai_van_tai], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Loai_van_tai.getAll = (callback) => {
  const sqlString = "SELECT * FROM loai_van_tai ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Loai_van_tai.insert = (loai_van_tai, callBack) => {
  const sqlString = "INSERT INTO loai_van_tai SET ?";
  db.query(sqlString, [loai_van_tai], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_loai_van_tai : res.insertId, ...loai_van_tai });
  });
};
Loai_van_tai.update = (loai_van_tai, id_loai_van_tai, callBack) => {
  const sqlString = "UPDATE loai_van_tai SET ? WHERE id_loai_van_tai = ?";
  db.query(sqlString, [loai_van_tai, id_loai_van_tai], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật loai_van_tai id_loai_van_tai = " + "id_loai_van_tai" + " thành công");
  });
};
Loai_van_tai.delete = (id_loai_van_tai, callBack) => {
  db.query("DELETE FROM loai_van_tai WHERE id_loai_van_tai = ?", [id_loai_van_tai], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa loai_van_tai id_loai_van_tai = " + "id_loai_van_tai" + " thành công");
  });
};
module.exports = Loai_van_tai;
