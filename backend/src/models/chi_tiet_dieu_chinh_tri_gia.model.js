const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả chi tiết điều chỉnh trị giá
 */
const getAll = () => {
  return prisma.chi_tiet_dieu_chinh_tri_gia.findMany({
    orderBy: {
      id_chi_tiet: 'desc',
    },
  });
};

/**
 * Lấy chi tiết điều chỉnh trị giá theo ID
 */
const getById = (id_chi_tiet) => {
  return prisma.chi_tiet_dieu_chinh_tri_gia.findUnique({
    where: { id_chi_tiet },
  });
};

/**
 * Thêm mới chi tiết điều chỉnh trị giá
 */
const insert = (data) => {
  return prisma.chi_tiet_dieu_chinh_tri_gia.create({
    data: {
      id_khoan_dieu_chinh: data.id_khoan_dieu_chinh,
      ma_loai: data.ma_loai,
      ma_tien_te: data.ma_tien_te,
      phi: data.phi,
      so_dang_ky: data.so_dang_ky,
      mo_ta: data.mo_ta,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Cập nhật chi tiết điều chỉnh trị giá
 */
const update = (id_chi_tiet, data) => {
  return prisma.chi_tiet_dieu_chinh_tri_gia.update({
    where: { id_chi_tiet },
    data: {
      id_khoan_dieu_chinh: data.id_khoan_dieu_chinh,
      ma_loai: data.ma_loai,
      ma_tien_te: data.ma_tien_te,
      phi: data.phi,
      so_dang_ky: data.so_dang_ky,
      mo_ta: data.mo_ta,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Xóa chi tiết điều chỉnh trị giá
 */
const remove = (id_chi_tiet) => {
  return prisma.chi_tiet_dieu_chinh_tri_gia.delete({
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
