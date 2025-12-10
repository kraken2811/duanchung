const db = require("../common/db");
const Van_don = (van_don) => {
  this.id_van_don = van_don.id_van_don;
  this.so_van_don = van_don.so_van_don;
  this.id_lo_hang = van_don.id_lo_hang;
  this.ten_tau = van_don.ten_tau;
  this.hanh_trinh = van_don.hanh_trinh;
  this.so_container = van_don.so_container;
  this.ngay_tao = van_don.ngay_tao;
};
Van_don.getById = (id_van_don, callback) => {
  const sqlString = "SELECT * FROM van_don WHERE id_van_don = ? ";
  db.query(sqlString, [id_van_don], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Van_don.getAll = (callback) => {
  const sqlString = "SELECT * FROM van_don ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Van_don.insert = (van_don, callBack) => {
  const sqlString = "INSERT INTO van_don SET ?";
  db.query(sqlString, [van_don], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_van_don : res.insertId, ...van_don });
  });
};
Van_don.update = (van_don, id_van_don, callBack) => {
  const sqlString = "UPDATE van_don SET ? WHERE id_van_don = ?";
  db.query(sqlString, [van_don, id_van_don], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật van_don id_van_don = " + "id_van_don" + " thành công");
  });
};
Van_don.delete = (id_van_don, callBack) => {
  db.query("DELETE FROM van_don WHERE id_van_don = ?", [id_van_don], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa van_don id_van_don = " + "id_van_don" + " thành công");
  });
};
module.exports = Van_don;
