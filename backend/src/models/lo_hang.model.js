const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả lô hàng
 */
const getAll = () => {
  return prisma.lo_hang.findMany({
    orderBy: {
      id_lo_hang: 'desc',
    },
  });
};

/**
 * Lấy lô hàng theo ID
 */
const getById = (id_lo_hang) => {
  return prisma.lo_hang.findUnique({
    where: { id_lo_hang },
  });
};

/**
 * Thêm mới lô hàng
 */
const insert = (data) => {
  return prisma.lo_hang.create({
    data: {
      so_lo_hang: data.so_lo_hang,
      id_hop_dong: data.id_hop_dong,
      id_cong_ty: data.id_cong_ty,
      id_dai_ly: data.id_dai_ly,
      id_van_chuyen: data.id_van_chuyen,
      cang_xep_hang: data.cang_xep_hang,
      cang_do_hang: data.cang_do_hang,
      id_loai_van_tai: data.id_loai_van_tai,
      ngay_du_kien_xuat: data.ngay_du_kien_xuat,
      ngay_du_kien_nhap: data.ngay_du_kien_nhap,
      tong_gia_tri: data.tong_gia_tri,
      ma_ngoai_te: data.ma_ngoai_te,
      mo_ta: data.mo_ta,
      nguoi_tao: data.nguoi_tao,
      ngay_tao: data.ngay_tao,
      ngay_cap_nhat: data.ngay_cap_nhat,
    },
  });
};

/**
 * Cập nhật lô hàng
 */
const update = (id_lo_hang, data) => {
  return prisma.lo_hang.update({
    where: { id_lo_hang },
    data: {
      so_lo_hang: data.so_lo_hang,
      id_hop_dong: data.id_hop_dong,
      id_cong_ty: data.id_cong_ty,
      id_dai_ly: data.id_dai_ly,
      id_van_chuyen: data.id_van_chuyen,
      cang_xep_hang: data.cang_xep_hang,
      cang_do_hang: data.cang_do_hang,
      id_loai_van_tai: data.id_loai_van_tai,
      ngay_du_kien_xuat: data.ngay_du_kien_xuat,
      ngay_du_kien_nhap: data.ngay_du_kien_nhap,
      tong_gia_tri: data.tong_gia_tri,
      ma_ngoai_te: data.ma_ngoai_te,
      mo_ta: data.mo_ta,
      nguoi_tao: data.nguoi_tao,
      ngay_cap_nhat: data.ngay_cap_nhat,
    },
  });
};

/**
 * Xóa lô hàng
 * ⚠️ Nghiệp vụ logistics thực tế: nên dùng soft delete / trạng thái HỦY
 */
const remove = (id_lo_hang) => {
  return prisma.lo_hang.update({
    where: { id_lo_hang },
    data: {
      trang_thai: 'HUY',
    },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
