const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả chi tiết tờ khai
 */
const getAll = () => {
  return prisma.chi_tiet_to_khai.findMany({
    orderBy: {
      id_chi_tiet: 'desc',
    },
  });
};

/**
 * Lấy chi tiết tờ khai theo ID
 */
const getById = (id_chi_tiet) => {
  return prisma.chi_tiet_to_khai.findUnique({
    where: { id_chi_tiet },
  });
};

/**
 * Thêm mới chi tiết tờ khai
 */
const insert = (data) => {
  return prisma.chi_tiet_to_khai.create({
    data: {
      id_to_khai: data.id_to_khai,
      so_dong: data.so_dong,
      ma_hs: data.ma_hs,
      mo_ta_hang_hoa: data.mo_ta_hang_hoa,
      so_luong: data.so_luong,
      don_vi_tinh: data.don_vi_tinh,
      don_gia: data.don_gia,
      tong_gia_tri: data.tong_gia_tri,
      ma_ngoai_te: data.ma_ngoai_te,
      ma_quoc_gia: data.ma_quoc_gia,
      id_bieu_thue: data.id_bieu_thue,
      tien_thue: data.tien_thue,
      tien_vat: data.tien_vat,
      thue_bo_sung: data.thue_bo_sung,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Cập nhật chi tiết tờ khai
 */
const update = (id_chi_tiet, data) => {
  return prisma.chi_tiet_to_khai.update({
    where: { id_chi_tiet },
    data: {
      id_to_khai: data.id_to_khai,
      so_dong: data.so_dong,
      ma_hs: data.ma_hs,
      mo_ta_hang_hoa: data.mo_ta_hang_hoa,
      so_luong: data.so_luong,
      don_vi_tinh: data.don_vi_tinh,
      don_gia: data.don_gia,
      tong_gia_tri: data.tong_gia_tri,
      ma_ngoai_te: data.ma_ngoai_te,
      ma_quoc_gia: data.ma_quoc_gia,
      id_bieu_thue: data.id_bieu_thue,
      tien_thue: data.tien_thue,
      tien_vat: data.tien_vat,
      thue_bo_sung: data.thue_bo_sung,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Xóa chi tiết tờ khai
 */
const remove = (id_chi_tiet) => {
  return prisma.chi_tiet_to_khai.delete({
    where: { id_chi_tiet },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
