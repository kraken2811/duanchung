const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả cấu hình hệ thống
 */
const getAll = () => {
  return prisma.cau_hinh_he_thong.findMany({
    orderBy: {
      id_cau_hinh: 'desc',
    },
  });
};

/**
 * Lấy cấu hình theo ID
 */
const getById = (id_cau_hinh) => {
  return prisma.cau_hinh_he_thong.findUnique({
    where: { id_cau_hinh },
  });
};

/**
 * Thêm cấu hình hệ thống
 */
const insert = (data) => {
  return prisma.cau_hinh_he_thong.create({
    data: {
      khoa_cau_hinh: data.khoa_cau_hinh,
      gia_tri_cau_hinh: data.gia_tri_cau_hinh,
      mo_ta: data.mo_ta,
      nguoi_cap_nhat: data.nguoi_cap_nhat,
      ngay_cap_nhat: data.ngay_cap_nhat,
    },
  });
};

/**
 * Cập nhật cấu hình hệ thống
 */
const update = (id_cau_hinh, data) => {
  return prisma.cau_hinh_he_thong.update({
    where: { id_cau_hinh },
    data: {
      khoa_cau_hinh: data.khoa_cau_hinh,
      gia_tri_cau_hinh: data.gia_tri_cau_hinh,
      mo_ta: data.mo_ta,
      nguoi_cap_nhat: data.nguoi_cap_nhat,
      ngay_cap_nhat: data.ngay_cap_nhat,
    },
  });
};

/**
 * Xóa cấu hình hệ thống
 */
const remove = (id_cau_hinh) => {
  return prisma.cau_hinh_he_thong.delete({
    where: { id_cau_hinh },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
