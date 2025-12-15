const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả thanh toán thuế
 */
const getAll = () => {
  return prisma.thanh_toan_thue.findMany({
    orderBy: {
      id_thanh_toan: 'desc',
    },
  });
};

/**
 * Lấy thanh toán theo ID
 */
const getById = (id_thanh_toan) => {
  return prisma.thanh_toan_thue.findUnique({
    where: { id_thanh_toan },
  });
};

/**
 * Lấy thanh toán theo tờ khai
 */
const getByToKhai = (id_to_khai) => {
  return prisma.thanh_toan_thue.findMany({
    where: { id_to_khai },
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Tạo mới thanh toán thuế
 */
const insert = (data) => {
  return prisma.thanh_toan_thue.create({
    data: {
      id_to_khai: data.id_to_khai,
      so_tien: data.so_tien,
      ma_ngoai_te: data.ma_ngoai_te,
      phuong_thuc_thanh_toan: data.phuong_thuc_thanh_toan,
      trang_thai_thanh_toan: data.trang_thai_thanh_toan ?? 'CHO_THANH_TOAN',
      tham_chieu_ngan_hang: data.tham_chieu_ngan_hang,
      ngay_thanh_toan: data.ngay_thanh_toan,
      ngay_tao: data.ngay_tao ?? new Date(),
    },
  });
};

/**
 * Cập nhật trạng thái thanh toán
 * (ví dụ: ngân hàng phản hồi)
 */
const update = (id_thanh_toan, data) => {
  return prisma.thanh_toan_thue.update({
    where: { id_thanh_toan },
    data: {
      trang_thai_thanh_toan: data.trang_thai_thanh_toan,
      tham_chieu_ngan_hang: data.tham_chieu_ngan_hang,
      ngay_thanh_toan: data.ngay_thanh_toan,
    },
  });
};

/**
 * ❌ KHÔNG NÊN delete cứng thanh toán
 * Chỉ dùng khi tạo nhầm & CHƯA phát sinh giao dịch
 */
const remove = (id_thanh_toan) => {
  return prisma.thanh_toan_thue.delete({
    where: { id_thanh_toan },
  });
};

module.exports = {
  getAll,
  getById,
  getByToKhai,
  insert,
  update,
  remove,
};
