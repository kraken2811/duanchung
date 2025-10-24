const db = require("../common/db");
const Phan_hoi_hai_quan = (phan_hoi_hai_quan) => {
  this.id_phan_hoi = phan_hoi_hai_quan.id_phan_hoi;
  this.id_to_khai = phan_hoi_hai_quan.id_to_khai;
  this.loai_thong_diep = phan_hoi_hai_quan.loai_thong_diep;
  this.so_tiep_nhan_vnacss = phan_hoi_hai_quan.so_tiep_nhan_vnacss;
  this.mau_kenh = phan_hoi_hai_quan.mau_kenh;
  this.ma_thong_diep = phan_hoi_hai_quan.ma_thong_diep;
  this.noi_dung_thong_diep = phan_hoi_hai_quan.noi_dung_thong_diep;
  this.du_lieu_goc = phan_hoi_hai_quan.du_lieu_goc;
  this.ngay_nhan = phan_hoi_hai_quan.ngay_nhan;
};
Phan_hoi_hai_quan.getById = (id_phan_hoi, callback) => {
  const sqlString = "SELECT * FROM phan_hoi_hai_quan WHERE id_phan_hoi = ? ";
  db.query(sqlString, [id_phan_hoi], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Phan_hoi_hai_quan.getAll = (callback) => {
  const sqlString = "SELECT * FROM phan_hoi_hai_quan ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Phan_hoi_hai_quan.insert = (phan_hoi_hai_quan, callBack) => {
  const sqlString = "INSERT INTO phan_hoi_hai_quan SET ?";
  db.query(sqlString, [phan_hoi_hai_quan], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_phan_hoi : res.insertId, ...phan_hoi_hai_quan });
  });
};
Phan_hoi_hai_quan.update = (phan_hoi_hai_quan, id_phan_hoi, callBack) => {
  const sqlString = "UPDATE phan_hoi_hai_quan SET ? WHERE id_phan_hoi = ?";
  db.query(sqlString, [phan_hoi_hai_quan, id_phan_hoi], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật phan_hoi_hai_quan id_phan_hoi = " + "id_phan_hoi" + " thành công");
  });
};
Phan_hoi_hai_quan.delete = (id_phan_hoi, callBack) => {
  db.query("DELETE FROM phan_hoi_hai_quan WHERE id_phan_hoi = ?", [id_phan_hoi], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa phan_hoi_hai_quan id_phan_hoi = " + "id_phan_hoi" + " thành công");
  });
};
module.exports = Phan_hoi_hai_quan;
