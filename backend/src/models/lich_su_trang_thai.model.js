const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả lịch sử trạng thái
 */
const getAll = () => {
  return prisma.lich_su_trang_thai.findMany({
    orderBy: {
      id_lich_su: 'desc',
    },
  });
};

/**
 * Lấy lịch sử trạng thái theo ID
 */
const getById = (id_lich_su) => {
  return prisma.lich_su_trang_thai.findUnique({
    where: { id_lich_su },
  });
};

/**
 * Thêm mới lịch sử trạng thái
 * ⚠️ Thực tế nghiệp vụ: chỉ nên INSERT (append-only)
 */
const insert = (data) => {
  return prisma.lich_su_trang_thai.create({
    data: {
      id_to_khai: data.id_to_khai,
      trang_thai_cu: data.trang_thai_cu,
      trang_thai_moi: data.trang_thai_moi,
      nguoi_thay_doi: data.nguoi_thay_doi,
      ngay_thay_doi: data.ngay_thay_doi,
      ghi_chu: data.ghi_chu,
    },
  });
};

/**
 * ❌ KHÔNG NÊN update lịch sử trạng thái (audit trail)
 * Nếu vẫn cần (không khuyến nghị)
 */
const update = (id_lich_su, data) => {
  return prisma.lich_su_trang_thai.update({
    where: { id_lich_su },
    data: {
      ghi_chu: data.ghi_chu,
    },
  });
};

/**
 * ❌ KHÔNG NÊN delete lịch sử trạng thái
 * Nếu bắt buộc (không khuyến nghị)
 */
const remove = (id_lich_su) => {
  return prisma.lich_su_trang_thai.delete({
    where: { id_lich_su },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
