const prisma = require('@prisma/client').prisma;
const Vat_lieu_hop_dong = (vat_lieu_hop_dong) => {
  this.id_vat_lieu = vat_lieu_hop_dong.id_vat_lieu;
  this.id_hop_dong = vat_lieu_hop_dong.id_hop_dong;
  this.ma_vat_lieu = vat_lieu_hop_dong.ma_vat_lieu;
  this.ten_vat_lieu = vat_lieu_hop_dong.ten_vat_lieu;
  this.don_vi_tinh = vat_lieu_hop_dong.don_vi_tinh;
  this.so_luong = vat_lieu_hop_dong.so_luong;
  this.nguon_goc = vat_lieu_hop_dong.nguon_goc;
  this.ma_hs = vat_lieu_hop_dong.ma_hs;
  this.don_gia = vat_lieu_hop_dong.don_gia;
  this.tong_gia_tri = vat_lieu_hop_dong.tong_gia_tri;
  this.ngay_tao = vat_lieu_hop_dong.ngay_tao;
};
Vat_lieu_hop_dong.getById = (id_vat_lieu, callback) => {
  const sqlString = "SELECT * FROM vat_lieu_hop_dong WHERE id_vat_lieu = ? ";
  db.query(sqlString, [id_vat_lieu], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Vat_lieu_hop_dong.getAll = (callback) => {
  const sqlString = "SELECT * FROM vat_lieu_hop_dong ";
  db.query(sqlString, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
Vat_lieu_hop_dong.insert = (vat_lieu_hop_dong, callBack) => {
  const sqlString = "INSERT INTO vat_lieu_hop_dong SET ?";
  db.query(sqlString, [vat_lieu_hop_dong], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null,{id_vat_lieu : res.insertId, ...vat_lieu_hop_dong });
  });
};
Vat_lieu_hop_dong.update = (vat_lieu_hop_dong, id_vat_lieu, callBack) => {
  const sqlString = "UPDATE vat_lieu_hop_dong SET ? WHERE id_vat_lieu = ?";
  db.query(sqlString, [vat_lieu_hop_dong, id_vat_lieu], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Cập nhật vat_lieu_hop_dong id_vat_lieu = " + "id_vat_lieu" + " thành công");
  });
};
Vat_lieu_hop_dong.delete = (id_vat_lieu, callBack) => {
  db.query("DELETE FROM vat_lieu_hop_dong WHERE id_vat_lieu = ?", [id_vat_lieu], (err, res) => {
    if (err) {
      return callBack(err, null);
    }
    callBack(null, "Xóa vat_lieu_hop_dong id_vat_lieu = " + "id_vat_lieu" + " thành công");
  });
};
module.exports = Vat_lieu_hop_dong;
