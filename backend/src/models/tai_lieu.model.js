const prisma = require('@prisma/client').prisma;
const Tai_lieu = (tai_lieu) => {
  this.id_tai_lieu = tai_lieu.id_tai_lieu;
  this.loai_doi_tuong = tai_lieu.loai_doi_tuong;
  this.id_doi_tuong = tai_lieu.id_doi_tuong;
  this.loai_tai_lieu = tai_lieu.loai_tai_lieu;
  this.ten_file = tai_lieu.ten_file;
  this.duong_dan = tai_lieu.duong_dan;
  this.kich_thuoc = tai_lieu.kich_thuoc;
  this.loai_mime = tai_lieu.loai_mime;
  this.ma_kiem_tra = tai_lieu.ma_kiem_tra;
  this.chu_ky_so = tai_lieu.chu_ky_so;
  this.nguoi_ky = tai_lieu.nguoi_ky;
  this.ngay_ky = tai_lieu.ngay_ky;
  this.nguoi_tai_len = tai_lieu.nguoi_tai_len;
  this.ngay_tai_len = tai_lieu.ngay_tai_len;
  this.ma_cuc_hai_quan = tai_lieu.ma_cuc_hai_quan;
  this.nhom_xu_ly_ho_so = tai_lieu.nhom_xu_ly_ho_so;
  this.phan_loai_khai_bao = tai_lieu.phan_loai_khai_bao;
  this.so_dien_thoai_nguoi_khai = tai_lieu.so_dien_thoai_nguoi_khai;
  this.so_quan_ly_noi_bo = tai_lieu.so_quan_ly_noi_bo;
  this.ghi_chu = tai_lieu.ghi_chu;
  this.so_dinh_kem = tai_lieu.so_dinh_kem;
  this.trang_thai_gui = tai_lieu.trang_thai_gui;
  this.ngay_gui = tai_lieu.ngay_gui;
  this.id_to_khai = tai_lieu.id_to_khai;
};
Tai_lieu.getById = (id_tai_lieu, callback) => {
  const sqlString = "SELECT * FROM tai_lieu WHERE id_tai_lieu = ? ";
  db.query(sqlString, [id_tai_lieu], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Tai_lieu.getAll = (callback) => {
  const sqlString = "SELECT * FROM tai_lieu ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Tai_lieu.insert = (tai_lieu, callBack) => {
  const sqlString = "INSERT INTO tai_lieu SET ?";
  db.query(sqlString, [tai_lieu], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_tai_lieu : res.insertId, ...tai_lieu });
  });
};
Tai_lieu.update = (tai_lieu, id_tai_lieu, callBack) => {
  const sqlString = "UPDATE tai_lieu SET ? WHERE id_tai_lieu = ?";
  db.query(sqlString, [tai_lieu, id_tai_lieu], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật tai_lieu id_tai_lieu = " + "id_tai_lieu" + " thành công");
  });
};
Tai_lieu.delete = (id_tai_lieu, callBack) => {
  db.query("DELETE FROM tai_lieu WHERE id_tai_lieu = ?", [id_tai_lieu], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa tai_lieu id_tai_lieu = " + "id_tai_lieu" + " thành công");
  });
};
module.exports = Tai_lieu;
