const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả container
 */
const getAll = () => {
  return prisma.container.findMany({
    orderBy: {
      id_container: 'desc',
    },
  });
};

/**
 * Lấy container theo ID
 */
const getById = (id_container) => {
  return prisma.container.findUnique({
    where: { id_container },
  });
};

/**
 * Thêm mới container
 */
const insert = (data) => {
  return prisma.container.create({
    data: {
      id_lo_hang: data.id_lo_hang,
      so_container: data.so_container,
      so_chi: data.so_chi,
      loai_container: data.loai_container,
      trong_luong_brut: data.trong_luong_brut,
      trong_luong_net: data.trong_luong_net,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Cập nhật container
 */
const update = (id_container, data) => {
  return prisma.container.update({
    where: { id_container },
    data: {
      id_lo_hang: data.id_lo_hang,
      so_container: data.so_container,
      so_chi: data.so_chi,
      loai_container: data.loai_container,
      trong_luong_brut: data.trong_luong_brut,
      trong_luong_net: data.trong_luong_net,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Xóa container
 */
const remove = (id_container) => {
  return prisma.container.delete({
    where: { id_container },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
