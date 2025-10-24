const db = require("../common/db");
const To_khai_hai_quan = (to_khai_hai_quan) => {
  this.id_to_khai = to_khai_hai_quan.id_to_khai;
  this.so_to_khai = to_khai_hai_quan.so_to_khai;
  this.id_lo_hang = to_khai_hai_quan.id_lo_hang;
  this.loai_to_khai = to_khai_hai_quan.loai_to_khai;
  this.id_loai_hinh = to_khai_hai_quan.id_loai_hinh;
  this.id_hop_dong = to_khai_hai_quan.id_hop_dong;
  this.id_cong_ty = to_khai_hai_quan.id_cong_ty;
  this.trang_thai_gui = to_khai_hai_quan.trang_thai_gui;
  this.ma_thong_diep_vnacss = to_khai_hai_quan.ma_thong_diep_vnacss;
  this.so_tiep_nhan_vnacss = to_khai_hai_quan.so_tiep_nhan_vnacss;
  this.mau_kenh = to_khai_hai_quan.mau_kenh;
  this.so_thong_bao_thue = to_khai_hai_quan.so_thong_bao_thue;
  this.phan_loai = to_khai_hai_quan.phan_loai;
  this.so_tien_thue = to_khai_hai_quan.so_tien_thue;
  this.ma_cuc_hai_quan = to_khai_hai_quan.ma_cuc_hai_quan;
  this.ngay_khai_bao = to_khai_hai_quan.ngay_khai_bao;
  this.nguoi_tao = to_khai_hai_quan.nguoi_tao;
  this.ngay_tao = to_khai_hai_quan.ngay_tao;
  this.ngay_cap_nhat = to_khai_hai_quan.ngay_cap_nhat;
};
To_khai_hai_quan.getById = (id_to_khai, callback) => {
  const sqlString = "SELECT * FROM to_khai_hai_quan WHERE id_to_khai = ? ";
  db.query(sqlString, [id_to_khai], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
To_khai_hai_quan.getAll = (callback) => {
  const sqlString = "SELECT * FROM to_khai_hai_quan ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
To_khai_hai_quan.insert = (to_khai_hai_quan, callBack) => {
  const sqlString = "INSERT INTO to_khai_hai_quan SET ?";
  db.query(sqlString, [to_khai_hai_quan], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_to_khai : res.insertId, ...to_khai_hai_quan });
  });
};
To_khai_hai_quan.update = (to_khai_hai_quan, id_to_khai, callBack) => {
  const sqlString = "UPDATE to_khai_hai_quan SET ? WHERE id_to_khai = ?";
  db.query(sqlString, [to_khai_hai_quan, id_to_khai], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật to_khai_hai_quan id_to_khai = " + "id_to_khai" + " thành công");
  });
};
To_khai_hai_quan.delete = (id_to_khai, callBack) => {
  db.query("DELETE FROM to_khai_hai_quan WHERE id_to_khai = ?", [id_to_khai], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa to_khai_hai_quan id_to_khai = " + "id_to_khai" + " thành công");
  });
};
module.exports = To_khai_hai_quan;
