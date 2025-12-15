const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả vai trò
 */
const getAll = () => {
  return prisma.vai_tro.findMany({
    orderBy: {
      ten_vai_tro: 'asc',
    },
  });
};

/**
 * Lấy vai trò theo ID
 */
const getById = (id_vai_tro) => {
  return prisma.vai_tro.findUnique({
    where: { id_vai_tro },
  });
};

/**
 * Lấy vai trò theo mã
 */
const getByMa = (ma_vai_tro) => {
  return prisma.vai_tro.findUnique({
    where: { ma_vai_tro },
  });
};

/**
 * Tạo mới vai trò
 */
const insert = (data) => {
  return prisma.vai_tro.create({
    data: {
      ma_vai_tro: data.ma_vai_tro,
      ten_vai_tro: data.ten_vai_tro,
      ghi_chu: data.ghi_chu,
      ngay_tao: data.ngay_tao ?? new Date(),
    },
  });
};

/**
 * Cập nhật vai trò
 */
const update = (id_vai_tro, data) => {
  return prisma.vai_tro.update({
    where: { id_vai_tro },
    data: {
      ten_vai_tro: data.ten_vai_tro,
      ghi_chu: data.ghi_chu,
    },
  });
};

/**
 * ❌ KHÔNG KHUYẾN KHÍCH delete cứng
 * Nếu bắt buộc → soft delete / is_active
 */
const remove = (id_vai_tro) => {
  return prisma.vai_tro.delete({
    where: { id_vai_tro },
  });
};

module.exports = {
  getAll,
  getById,
  getByMa,
  insert,
  update,
  remove,
};
