const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả log tích hợp
 */
const getAll = () => {
  return prisma.log_tich_hop.findMany({
    orderBy: {
      id_log: 'desc',
    },
  });
};

/**
 * Lấy log tích hợp theo ID
 */
const getById = (id_log) => {
  return prisma.log_tich_hop.findUnique({
    where: { id_log },
  });
};

/**
 * Thêm mới log tích hợp
 * 👉 append-only (nên chỉ INSERT)
 */
const insert = (data) => {
  return prisma.log_tich_hop.create({
    data: {
      ten_he_thong: data.ten_he_thong,
      huong: data.huong,
      ma_tuong_quan: data.ma_tuong_quan,
      du_lieu_yeu_cau: data.du_lieu_yeu_cau,
      du_lieu_phan_hoi: data.du_lieu_phan_hoi,
      trang_thai: data.trang_thai,
      thong_bao_loi: data.thong_bao_loi,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * ⚠️ KHÔNG NÊN update log tích hợp
 * (log hệ thống / tích hợp nên immutable)
 * Nếu bắt buộc (không khuyến nghị)
 */
const update = (id_log, data) => {
  return prisma.log_tich_hop.update({
    where: { id_log },
    data: {
      trang_thai: data.trang_thai,
      du_lieu_phan_hoi: data.du_lieu_phan_hoi,
      thong_bao_loi: data.thong_bao_loi,
    },
  });
};

/**
 * ❌ KHÔNG NÊN delete log tích hợp
 * Nếu buộc phải làm (không khuyến nghị)
 */
const remove = (id_log) => {
  return prisma.log_tich_hop.delete({
    where: { id_log },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
