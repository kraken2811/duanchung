const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả giao dịch ngân hàng
 */
const getAll = () => {
  return prisma.giao_dich_ngan_hang.findMany({
    orderBy: {
      id_giao_dich: 'desc',
    },
  });
};

/**
 * Lấy giao dịch ngân hàng theo ID
 */
const getById = (id_giao_dich) => {
  return prisma.giao_dich_ngan_hang.findUnique({
    where: { id_giao_dich },
  });
};

/**
 * Thêm mới giao dịch ngân hàng
 */
const insert = (data) => {
  return prisma.giao_dich_ngan_hang.create({
    data: {
      id_thanh_toan: data.id_thanh_toan,
      ten_ngan_hang: data.ten_ngan_hang,
      tai_khoan_ngan_hang: data.tai_khoan_ngan_hang,
      so_tien: data.so_tien,
      thoi_gian_giao_dich: data.thoi_gian_giao_dich,
      ma_phan_hoi: data.ma_phan_hoi,
      thong_diep_phan_hoi: data.thong_diep_phan_hoi,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Cập nhật giao dịch ngân hàng
 */
const update = (id_giao_dich, data) => {
  return prisma.giao_dich_ngan_hang.update({
    where: { id_giao_dich },
    data: {
      id_thanh_toan: data.id_thanh_toan,
      ten_ngan_hang: data.ten_ngan_hang,
      tai_khoan_ngan_hang: data.tai_khoan_ngan_hang,
      so_tien: data.so_tien,
      thoi_gian_giao_dich: data.thoi_gian_giao_dich,
      ma_phan_hoi: data.ma_phan_hoi,
      thong_diep_phan_hoi: data.thong_diep_phan_hoi,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Xóa giao dịch ngân hàng
 */
const remove = (id_giao_dich) => {
  return prisma.giao_dich_ngan_hang.delete({
    where: { id_giao_dich },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
