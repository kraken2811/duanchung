const prisma = require('@prisma/client').prisma;
const Vai_tro = (vai_tro) => {
  this.id_vai_tro = vai_tro.id_vai_tro;
  this.ma_vai_tro = vai_tro.ma_vai_tro;
  this.ten_vai_tro = vai_tro.ten_vai_tro;
  this.ghi_chu = vai_tro.ghi_chu;
  this.ngay_tao = vai_tro.ngay_tao;
};
Vai_tro.getById = (id_vai_tro, callback) => {
  const sqlString = "SELECT * FROM vai_tro WHERE id_vai_tro = ? ";
  db.query(sqlString, [id_vai_tro], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Vai_tro.getAll = (callback) => {
  const sqlString = "SELECT * FROM vai_tro ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Vai_tro.insert = (vai_tro, callBack) => {
  const sqlString = "INSERT INTO vai_tro SET ?";
  db.query(sqlString, [vai_tro], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_vai_tro : res.insertId, ...vai_tro });
  });
};
Vai_tro.update = (vai_tro, id_vai_tro, callBack) => {
  const sqlString = "UPDATE vai_tro SET ? WHERE id_vai_tro = ?";
  db.query(sqlString, [vai_tro, id_vai_tro], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật vai_tro id_vai_tro = " + "id_vai_tro" + " thành công");
  });
};
Vai_tro.delete = (id_vai_tro, callBack) => {
  db.query("DELETE FROM vai_tro WHERE id_vai_tro = ?", [id_vai_tro], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa vai_tro id_vai_tro = " + "id_vai_tro" + " thành công");
  });
};
module.exports = Vai_tro;
