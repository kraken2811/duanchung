const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả loại vận tải
 */
const getAll = () => {
  return prisma.loai_van_tai.findMany({
    orderBy: {
      id_loai_van_tai: 'desc',
    },
  });
};

/**
 * Lấy loại vận tải theo ID
 */
const getById = (id_loai_van_tai) => {
  return prisma.loai_van_tai.findUnique({
    where: { id_loai_van_tai },
  });
};

/**
 * Thêm mới loại vận tải
 */
const insert = (data) => {
  return prisma.loai_van_tai.create({
    data: {
      ma_loai_van_tai: data.ma_loai_van_tai,
      ten_loai_van_tai: data.ten_loai_van_tai,
      mo_ta: data.mo_ta,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Cập nhật loại vận tải
 */
const update = (id_loai_van_tai, data) => {
  return prisma.loai_van_tai.update({
    where: { id_loai_van_tai },
    data: {
      ma_loai_van_tai: data.ma_loai_van_tai,
      ten_loai_van_tai: data.ten_loai_van_tai,
      mo_ta: data.mo_ta,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Xóa loại vận tải
 * ⚠️ Bảng danh mục → nên cân nhắc soft delete / is_active
 */
const remove = (id_loai_van_tai) => {
  return prisma.loai_van_tai.delete({
    where: { id_loai_van_tai },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
