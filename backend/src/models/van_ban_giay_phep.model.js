const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả văn bản / giấy phép
 */
const getAll = () => {
  return prisma.van_ban_giay_phep.findMany({
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Lấy văn bản theo ID
 */
const getById = (id_van_ban) => {
  return prisma.van_ban_giay_phep.findUnique({
    where: { id_van_ban },
  });
};

/**
 * Lấy văn bản theo hợp đồng
 */
const getByHopDong = (id_hop_dong) => {
  return prisma.van_ban_giay_phep.findMany({
    where: { id_hop_dong },
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Tạo mới văn bản / giấy phép
 */
const insert = (data) => {
  return prisma.van_ban_giay_phep.create({
    data: {
      id_hop_dong: data.id_hop_dong,
      ma_so: data.ma_so,
      loai: data.loai,
      ngay_tao: data.ngay_tao ?? new Date(),
    },
  });
};

/**
 * Cập nhật văn bản / giấy phép
 */
const update = (id_van_ban, data) => {
  return prisma.van_ban_giay_phep.update({
    where: { id_van_ban },
    data: {
      ma_so: data.ma_so,
      loai: data.loai,
    },
  });
};

/**
 * ❌ KHÔNG KHUYẾN KHÍCH delete cứng
 * Nếu cần → soft delete / trạng thái HẾT HIỆU LỰC
 */
const remove = (id_van_ban) => {
  return prisma.van_ban_giay_phep.delete({
    where: { id_van_ban },
  });
};

module.exports = {
  getAll,
  getById,
  getByHopDong,
  insert,
  update,
  remove,
};
