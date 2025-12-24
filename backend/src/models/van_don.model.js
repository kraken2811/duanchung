const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả vận đơn
 */
const getAll = () => {
  return prisma.van_don.findMany({
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Lấy vận đơn theo ID
 */
const getById = (id_van_don) => {
  return prisma.van_don.findUnique({
    where: { id_van_don },
  });
};

/**
 * Lấy vận đơn theo lô hàng
 */
const getByLoHang = (id_lo_hang) => {
  return prisma.van_don.findMany({
    where: { id_lo_hang },
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Tạo mới vận đơn
 */
const insert = (data) => {
  return prisma.van_don.create({
    data: {
      so_van_don: data.so_van_don,
      id_lo_hang: data.id_lo_hang,
      ten_tau: data.ten_tau,
      hanh_trinh: data.hanh_trinh,
      so_container: data.so_container,
      ngay_tao: data.ngay_tao ?? new Date(),
    },
  });
};

/**
 * Cập nhật vận đơn
 * ⚠️ Chỉ nên cho phép khi CHƯA dùng cho tờ khai
 */
const update = (id_van_don, data) => {
  return prisma.van_don.update({
    where: { id_van_don },
    data: {
      so_van_don: data.so_van_don,
      ten_tau: data.ten_tau,
      hanh_trinh: data.hanh_trinh,
      so_container: data.so_container,
    },
  });
};

/**
 * ❌ KHÔNG KHUYẾN KHÍCH delete cứng
 * Nếu cần → soft delete / void
 */
const remove = (id_van_don) => {
  return prisma.van_don.update({
    where: { id_van_don },
    data: {
      trang_thai: 'HUY',
    },
  });
};

module.exports = {
  getAll,
  getById,
  getByLoHang,
  insert,
  update,
  remove,
};
