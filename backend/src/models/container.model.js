const prisma = require('@prisma/client').prisma;
const Container = (container) => {
  this.id_container = container.id_container;
  this.id_lo_hang = container.id_lo_hang;
  this.so_container = container.so_container;
  this.so_chi = container.so_chi;
  this.loai_container = container.loai_container;
  this.trong_luong_brut = container.trong_luong_brut;
  this.trong_luong_net = container.trong_luong_net;
  this.ngay_tao = container.ngay_tao;
};
Container.getById = (id_container, callback) => {
  const sqlString = "SELECT * FROM container WHERE id_container = ? ";
  db.query(sqlString, [id_container], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Container.getAll = (callback) => {
  const sqlString = "SELECT * FROM container ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Container.insert = (container, callBack) => {
  const sqlString = "INSERT INTO container SET ?";
  db.query(sqlString, [container], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_container : res.insertId, ...container });
  });
};
Container.update = (container, id_container, callBack) => {
  const sqlString = "UPDATE container SET ? WHERE id_container = ?";
  db.query(sqlString, [container, id_container], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật container id_container = " + "id_container" + " thành công");
  });
};
Container.delete = (id_container, callBack) => {
  db.query("DELETE FROM container WHERE id_container = ?", [id_container], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa container id_container = " + "id_container" + " thành công");
  });
};
module.exports = Container;
