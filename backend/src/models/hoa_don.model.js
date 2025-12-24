const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả hóa đơn
 */
const getAll = () => {
  return prisma.hoa_don.findMany({
    orderBy: {
      id_hoa_don: 'desc',
    },
  });
};

/**
 * Lấy hóa đơn theo ID
 */
const getById = (id_hoa_don) => {
  return prisma.hoa_don.findUnique({
    where: { id_hoa_don },
  });
};

/**
 * Thêm mới hóa đơn
 */
const insert = (data) => {
  return prisma.hoa_don.create({
    data: {
      so_hoa_don: data.so_hoa_don,
      ngay_hoa_don: data.ngay_hoa_don,
      id_lo_hang: data.id_lo_hang,
      id_nguoi_ban: data.id_nguoi_ban,
      id_nguoi_mua: data.id_nguoi_mua,
      tong_tien: data.tong_tien,
      ma_ngoai_te: data.ma_ngoai_te,
      dieu_kien_giao_hang: data.dieu_kien_giao_hang,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Cập nhật hóa đơn
 */
const update = (id_hoa_don, data) => {
  return prisma.hoa_don.update({
    where: { id_hoa_don },
    data: {
      so_hoa_don: data.so_hoa_don,
      ngay_hoa_don: data.ngay_hoa_don,
      id_lo_hang: data.id_lo_hang,
      id_nguoi_ban: data.id_nguoi_ban,
      id_nguoi_mua: data.id_nguoi_mua,
      tong_tien: data.tong_tien,
      ma_ngoai_te: data.ma_ngoai_te,
      dieu_kien_giao_hang: data.dieu_kien_giao_hang,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Xóa hóa đơn
 * ⚠️ Nghiệp vụ thực tế: nên dùng soft delete
 */
const remove = (id_hoa_don) => {
  return prisma.hoa_don.update({
    where: { id_hoa_don },
    data: {
      trang_thai: 'HUY',
    },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
