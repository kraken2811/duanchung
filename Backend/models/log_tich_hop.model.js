const db = require("../common/db");
const Log_tich_hop = (log_tich_hop) => {
  this.id_log = log_tich_hop.id_log;
  this.ten_he_thong = log_tich_hop.ten_he_thong;
  this.huong = log_tich_hop.huong;
  this.ma_tuong_quan = log_tich_hop.ma_tuong_quan;
  this.du_lieu_yeu_cau = log_tich_hop.du_lieu_yeu_cau;
  this.du_lieu_phan_hoi = log_tich_hop.du_lieu_phan_hoi;
  this.trang_thai = log_tich_hop.trang_thai;
  this.thong_bao_loi = log_tich_hop.thong_bao_loi;
  this.ngay_tao = log_tich_hop.ngay_tao;
};
Log_tich_hop.getById = (id_log, callback) => {
  const sqlString = "SELECT * FROM log_tich_hop WHERE id_log = ? ";
  db.query(sqlString, [id_log], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Log_tich_hop.getAll = (callback) => {
  const sqlString = "SELECT * FROM log_tich_hop ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Log_tich_hop.insert = (log_tich_hop, callBack) => {
  const sqlString = "INSERT INTO log_tich_hop SET ?";
  db.query(sqlString, [log_tich_hop], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_log : res.insertId, ...log_tich_hop });
  });
};
Log_tich_hop.update = (log_tich_hop, id_log, callBack) => {
  const sqlString = "UPDATE log_tich_hop SET ? WHERE id_log = ?";
  db.query(sqlString, [log_tich_hop, id_log], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật log_tich_hop id_log = " + "id_log" + " thành công");
  });
};
Log_tich_hop.delete = (id_log, callBack) => {
  db.query("DELETE FROM log_tich_hop WHERE id_log = ?", [id_log], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa log_tich_hop id_log = " + "id_log" + " thành công");
  });
};
module.exports = Log_tich_hop;
