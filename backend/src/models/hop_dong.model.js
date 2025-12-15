const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả hợp đồng
 */
const getAll = () => {
  return prisma.hop_dong.findMany({
    orderBy: {
      id_hop_dong: 'desc',
    },
  });
};

/**
 * Lấy hợp đồng theo ID
 */
const getById = (id_hop_dong) => {
  return prisma.hop_dong.findUnique({
    where: { id_hop_dong },
  });
};

/**
 * Thêm mới hợp đồng
 */
const insert = (data) => {
  return prisma.hop_dong.create({
    data: {
      so_hop_dong: data.so_hop_dong,
      loai_hop_dong: data.loai_hop_dong,
      id_cong_ty: data.id_cong_ty,
      id_doi_tac: data.id_doi_tac,
      ngay_ky: data.ngay_ky,
      ngay_het_han: data.ngay_het_han,
      hieu_luc_tu: data.hieu_luc_tu,
      hieu_luc_den: data.hieu_luc_den,
      trang_thai: data.trang_thai,
      tong_gia_tri: data.tong_gia_tri,
      phi_gia_cong: data.phi_gia_cong,
      ma_ngoai_te: data.ma_ngoai_te,
      dieu_kien_thanh_toan: data.dieu_kien_thanh_toan,
      ma_cuc_hai_quan: data.ma_cuc_hai_quan,
      nguoi_tao: data.nguoi_tao,
      ngay_tao: data.ngay_tao,
      ngay_cap_nhat: data.ngay_cap_nhat,
    },
  });
};

/**
 * Cập nhật hợp đồng
 */
const update = (id_hop_dong, data) => {
  return prisma.hop_dong.update({
    where: { id_hop_dong },
    data: {
      so_hop_dong: data.so_hop_dong,
      loai_hop_dong: data.loai_hop_dong,
      id_cong_ty: data.id_cong_ty,
      id_doi_tac: data.id_doi_tac,
      ngay_ky: data.ngay_ky,
      ngay_het_han: data.ngay_het_han,
      hieu_luc_tu: data.hieu_luc_tu,
      hieu_luc_den: data.hieu_luc_den,
      trang_thai: data.trang_thai,
      tong_gia_tri: data.tong_gia_tri,
      phi_gia_cong: data.phi_gia_cong,
      ma_ngoai_te: data.ma_ngoai_te,
      dieu_kien_thanh_toan: data.dieu_kien_thanh_toan,
      ma_cuc_hai_quan: data.ma_cuc_hai_quan,
      nguoi_tao: data.nguoi_tao,
      ngay_cap_nhat: data.ngay_cap_nhat,
    },
  });
};

/**
 * Xóa hợp đồng
 * ⚠️ Thực tế nên dùng soft delete / trạng thái HỦY
 */
const remove = (id_hop_dong) => {
  return prisma.hop_dong.delete({
    where: { id_hop_dong },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
