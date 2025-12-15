const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả loại hình đặc biệt
 */
const getAll = () => {
  return prisma.loai_hinh_dac_biet.findMany({
    orderBy: {
      id_loai_hinh: 'desc',
    },
  });
};

/**
 * Lấy loại hình đặc biệt theo ID
 */
const getById = (id_loai_hinh) => {
  return prisma.loai_hinh_dac_biet.findUnique({
    where: { id_loai_hinh },
  });
};

/**
 * Thêm mới loại hình đặc biệt
 */
const insert = (data) => {
  return prisma.loai_hinh_dac_biet.create({
    data: {
      ma_loai_hinh: data.ma_loai_hinh,
      ten_loai_hinh: data.ten_loai_hinh,
      mo_ta: data.mo_ta,
    },
  });
};

/**
 * Cập nhật loại hình đặc biệt
 */
const update = (id_loai_hinh, data) => {
  return prisma.loai_hinh_dac_biet.update({
    where: { id_loai_hinh },
    data: {
      ma_loai_hinh: data.ma_loai_hinh,
      ten_loai_hinh: data.ten_loai_hinh,
      mo_ta: data.mo_ta,
    },
  });
};

/**
 * Xóa loại hình đặc biệt
 * ⚠️ Danh mục dùng lâu dài → nên cân nhắc soft delete
 */
const remove = (id_loai_hinh) => {
  return prisma.loai_hinh_dac_biet.delete({
    where: { id_loai_hinh },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
