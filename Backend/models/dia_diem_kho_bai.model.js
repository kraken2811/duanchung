const db = require("../common/db");
const Dia_diem_kho_bai = (dia_diem_kho_bai) => {
  this.id_dia_diem = dia_diem_kho_bai.id_dia_diem;
  this.ma_dia_diem = dia_diem_kho_bai.ma_dia_diem;
  this.ten_dia_diem = dia_diem_kho_bai.ten_dia_diem;
  this.dia_chi = dia_diem_kho_bai.dia_chi;
  this.loai_dia_diem = dia_diem_kho_bai.loai_dia_diem;
  this.ma_cuc_hai_quan = dia_diem_kho_bai.ma_cuc_hai_quan;
  this.id_tinh_thanh = dia_diem_kho_bai.id_tinh_thanh;
  this.ngay_tao = dia_diem_kho_bai.ngay_tao;
};
Dia_diem_kho_bai.getById = (id_dia_diem, callback) => {
  const sqlString = "SELECT * FROM dia_diem_kho_bai WHERE id_dia_diem = ? ";
  db.query(sqlString, [id_dia_diem], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Dia_diem_kho_bai.getAll = (callback) => {
  const sqlString = "SELECT * FROM dia_diem_kho_bai ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Dia_diem_kho_bai.insert = (dia_diem_kho_bai, callBack) => {
  const sqlString = "INSERT INTO dia_diem_kho_bai SET ?";
  db.query(sqlString, [dia_diem_kho_bai], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_dia_diem : res.insertId, ...dia_diem_kho_bai });
  });
};
Dia_diem_kho_bai.update = (dia_diem_kho_bai, id_dia_diem, callBack) => {
  const sqlString = "UPDATE dia_diem_kho_bai SET ? WHERE id_dia_diem = ?";
  db.query(sqlString, [dia_diem_kho_bai, id_dia_diem], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật dia_diem_kho_bai id_dia_diem = " + "id_dia_diem" + " thành công");
  });
};
Dia_diem_kho_bai.delete = (id_dia_diem, callBack) => {
  db.query("DELETE FROM dia_diem_kho_bai WHERE id_dia_diem = ?", [id_dia_diem], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa dia_diem_kho_bai id_dia_diem = " + "id_dia_diem" + " thành công");
  });
};
module.exports = Dia_diem_kho_bai;
