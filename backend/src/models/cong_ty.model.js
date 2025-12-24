const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả công ty
 */
const getAll = () => {
  return prisma.cong_ty.findMany({
    orderBy: {
      id_cong_ty: 'desc',
    },
  });
};

const existsByMaSoThue = (ma_so_thue, excludeId = null) => {
  return prisma.cong_ty.findFirst({
    where: {
      ma_so_thue,
      ...(excludeId && {
        id_cong_ty: { not: excludeId },
      }),
    },
  });
};

/**
 * Lấy công ty theo ID
 */
const getById = (id_cong_ty) => {
  return prisma.cong_ty.findUnique({
    where: { id_cong_ty },
  });
};

/**
 * Thêm mới công ty
 */
const insert = (data) => {
  return prisma.cong_ty.create({
    data: {
      ma_so_thue: data.ma_so_thue,
      ten_cong_ty: data.ten_cong_ty,
      dia_chi: data.dia_chi,
      ma_quoc_gia: data.ma_quoc_gia,
      nguoi_lien_he: data.nguoi_lien_he,
      dien_thoai: data.dien_thoai,
      email: data.email,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Cập nhật công ty
 */
const update = (id_cong_ty, data) => {
  return prisma.cong_ty.update({
    where: { id_cong_ty },
    data: {
      ma_so_thue: data.ma_so_thue,
      ten_cong_ty: data.ten_cong_ty,
      dia_chi: data.dia_chi,
      ma_quoc_gia: data.ma_quoc_gia,
      nguoi_lien_he: data.nguoi_lien_he,
      dien_thoai: data.dien_thoai,
      email: data.email,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Xóa công ty
 */
const remove = (id_cong_ty) => {
  return prisma.cong_ty.update({
    where: { id_cong_ty },
    data: {
      trang_thai: 'HUY',
    },
  });
};

module.exports = {
  getAll,
  getById,
  existsByMaSoThue,
  insert,
  update,
  remove,
};
