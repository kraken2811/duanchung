const db = require("../common/db");
const Loai_hinh_dac_biet = (loai_hinh_dac_biet) => {
  this.id_loai_hinh = loai_hinh_dac_biet.id_loai_hinh;
  this.ma_loai_hinh = loai_hinh_dac_biet.ma_loai_hinh;
  this.ten_loai_hinh = loai_hinh_dac_biet.ten_loai_hinh;
  this.mo_ta = loai_hinh_dac_biet.mo_ta;
};
Loai_hinh_dac_biet.getById = (id_loai_hinh, callback) => {
  const sqlString = "SELECT * FROM loai_hinh_dac_biet WHERE id_loai_hinh = ? ";
  db.query(sqlString, [id_loai_hinh], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Loai_hinh_dac_biet.getAll = (callback) => {
  const sqlString = "SELECT * FROM loai_hinh_dac_biet ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Loai_hinh_dac_biet.insert = (loai_hinh_dac_biet, callBack) => {
  const sqlString = "INSERT INTO loai_hinh_dac_biet SET ?";
  db.query(sqlString, [loai_hinh_dac_biet], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_loai_hinh : res.insertId, ...loai_hinh_dac_biet });
  });
};
Loai_hinh_dac_biet.update = (loai_hinh_dac_biet, id_loai_hinh, callBack) => {
  const sqlString = "UPDATE loai_hinh_dac_biet SET ? WHERE id_loai_hinh = ?";
  db.query(sqlString, [loai_hinh_dac_biet, id_loai_hinh], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật loai_hinh_dac_biet id_loai_hinh = " + "id_loai_hinh" + " thành công");
  });
};
Loai_hinh_dac_biet.delete = (id_loai_hinh, callBack) => {
  db.query("DELETE FROM loai_hinh_dac_biet WHERE id_loai_hinh = ?", [id_loai_hinh], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa loai_hinh_dac_biet id_loai_hinh = " + "id_loai_hinh" + " thành công");
  });
};
module.exports = Loai_hinh_dac_biet;
