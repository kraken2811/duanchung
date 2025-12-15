const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả quốc gia
 */
const getAll = () => {
  return prisma.quoc_gia.findMany({
    orderBy: {
      ten_quoc_gia: 'asc',
    },
  });
};

/**
 * Lấy quốc gia theo ID
 */
const getById = (id_quoc_gia) => {
  return prisma.quoc_gia.findUnique({
    where: { id_quoc_gia },
  });
};

/**
 * Lấy quốc gia theo mã quốc gia
 */
const getByMa = (ma_quoc_gia) => {
  return prisma.quoc_gia.findUnique({
    where: { ma_quoc_gia },
  });
};

/**
 * Thêm mới quốc gia
 */
const insert = (data) => {
  return prisma.quoc_gia.create({
    data: {
      ma_quoc_gia: data.ma_quoc_gia,
      ten_quoc_gia: data.ten_quoc_gia,
      ma_vung: data.ma_vung,
      ngay_tao: data.ngay_tao ?? new Date(),
    },
  });
};

/**
 * Cập nhật quốc gia
 */
const update = (id_quoc_gia, data) => {
  return prisma.quoc_gia.update({
    where: { id_quoc_gia },
    data: {
      ma_quoc_gia: data.ma_quoc_gia,
      ten_quoc_gia: data.ten_quoc_gia,
      ma_vung: data.ma_vung,
    },
  });
};

/**
 * ❌ KHÔNG NÊN delete cứng quốc gia
 * Nếu bắt buộc → soft delete / is_active
 */
const remove = (id_quoc_gia) => {
  return prisma.quoc_gia.delete({
    where: { id_quoc_gia },
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
