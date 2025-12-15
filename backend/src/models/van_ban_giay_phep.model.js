const prisma = require('@prisma/client').prisma;
const Van_ban_giay_phep = (van_ban_giay_phep) => {
  this.id_van_ban = van_ban_giay_phep.id_van_ban;
  this.id_hop_dong = van_ban_giay_phep.id_hop_dong;
  this.ma_so = van_ban_giay_phep.ma_so;
  this.loai = van_ban_giay_phep.loai;
  this.ngay_tao = van_ban_giay_phep.ngay_tao;
};
Van_ban_giay_phep.getById = (id_van_ban, callback) => {
  const sqlString = "SELECT * FROM van_ban_giay_phep WHERE id_van_ban = ? ";
  db.query(sqlString, [id_van_ban], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Van_ban_giay_phep.getAll = (callback) => {
  const sqlString = "SELECT * FROM van_ban_giay_phep ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Van_ban_giay_phep.insert = (van_ban_giay_phep, callBack) => {
  const sqlString = "INSERT INTO van_ban_giay_phep SET ?";
  db.query(sqlString, [van_ban_giay_phep], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_van_ban : res.insertId, ...van_ban_giay_phep });
  });
};
Van_ban_giay_phep.update = (van_ban_giay_phep, id_van_ban, callBack) => {
  const sqlString = "UPDATE van_ban_giay_phep SET ? WHERE id_van_ban = ?";
  db.query(sqlString, [van_ban_giay_phep, id_van_ban], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật van_ban_giay_phep id_van_ban = " + "id_van_ban" + " thành công");
  });
};
Van_ban_giay_phep.delete = (id_van_ban, callBack) => {
  db.query("DELETE FROM van_ban_giay_phep WHERE id_van_ban = ?", [id_van_ban], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa van_ban_giay_phep id_van_ban = " + "id_van_ban" + " thành công");
  });
};
module.exports = Van_ban_giay_phep;
