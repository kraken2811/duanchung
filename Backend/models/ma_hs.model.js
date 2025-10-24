const db = require("../common/db");
const Ma_hs = (ma_hs) => {
  this.id_ma_hs = ma_hs.id_ma_hs;
  this.ma_hs = ma_hs.ma_hs;
  this.mo_ta = ma_hs.mo_ta;
  this.cap_do = ma_hs.cap_do;
  this.ma_cha = ma_hs.ma_cha;
  this.thue_nhap_khau = ma_hs.thue_nhap_khau;
  this.thue_vat = ma_hs.thue_vat;
  this.thue_xuat_khau = ma_hs.thue_xuat_khau;
  this.thue_tieu_thu_dac_biet = ma_hs.thue_tieu_thu_dac_biet;
  this.thue_bao_ve_moi_trung = ma_hs.thue_bao_ve_moi_trung;
  this.yeu_cau_giay_phep = ma_hs.yeu_cau_giay_phep;
  this.loai_giay_phep = ma_hs.loai_giay_phep;
  this.ngay_tao = ma_hs.ngay_tao;
};
Ma_hs.getById = (id_ma_hs, callback) => {
  const sqlString = "SELECT * FROM ma_hs WHERE id_ma_hs = ? ";
  db.query(sqlString, [id_ma_hs], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Ma_hs.getAll = (callback) => {
  const sqlString = "SELECT * FROM ma_hs ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Ma_hs.insert = (ma_hs, callBack) => {
  const sqlString = "INSERT INTO ma_hs SET ?";
  db.query(sqlString, [ma_hs], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_ma_hs : res.insertId, ...ma_hs });
  });
};
Ma_hs.update = (ma_hs, id_ma_hs, callBack) => {
  const sqlString = "UPDATE ma_hs SET ? WHERE id_ma_hs = ?";
  db.query(sqlString, [ma_hs, id_ma_hs], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật ma_hs id_ma_hs = " + "id_ma_hs" + " thành công");
  });
};
Ma_hs.delete = (id_ma_hs, callBack) => {
  db.query("DELETE FROM ma_hs WHERE id_ma_hs = ?", [id_ma_hs], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa ma_hs id_ma_hs = " + "id_ma_hs" + " thành công");
  });
};
module.exports = Ma_hs;
