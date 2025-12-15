const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả thông báo
 */
const getAll = () => {
  return prisma.thong_bao_he_thong.findMany({
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Lấy thông báo theo ID
 */
const getById = (id_thong_bao) => {
  return prisma.thong_bao_he_thong.findUnique({
    where: { id_thong_bao },
  });
};

/**
 * Lấy thông báo theo người dùng
 */
const getByNguoiDung = (id_nguoi_dung) => {
  return prisma.thong_bao_he_thong.findMany({
    where: { id_nguoi_dung },
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Lấy thông báo chưa đọc
 */
const getUnreadByNguoiDung = (id_nguoi_dung) => {
  return prisma.thong_bao_he_thong.findMany({
    where: {
      id_nguoi_dung,
      da_doc: false,
    },
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Tạo mới thông báo
 */
const insert = (data) => {
  return prisma.thong_bao_he_thong.create({
    data: {
      id_nguoi_dung: data.id_nguoi_dung,
      tieu_de: data.tieu_de,
      noi_dung: data.noi_dung,
      loai_thong_bao: data.loai_thong_bao,
      id_lien_quan: data.id_lien_quan,
      da_doc: data.da_doc ?? false,
      ngay_tao: data.ngay_tao ?? new Date(),
    },
  });
};

/**
 * Đánh dấu thông báo đã đọc
 */
const markAsRead = (id_thong_bao) => {
  return prisma.thong_bao_he_thong.update({
    where: { id_thong_bao },
    data: {
      da_doc: true,
    },
  });
};

/**
 * Đánh dấu tất cả thông báo của user là đã đọc
 */
const markAllAsRead = (id_nguoi_dung) => {
  return prisma.thong_bao_he_thong.updateMany({
    where: {
      id_nguoi_dung,
      da_doc: false,
    },
    data: {
      da_doc: true,
    },
  });
};

/**
 * ❌ KHÔNG KHUYẾN KHÍCH delete cứng
 * Nếu bắt buộc → soft delete / ẩn
 */
const remove = (id_thong_bao) => {
  return prisma.thong_bao_he_thong.delete({
    where: { id_thong_bao },
  });
};

module.exports = {
  getAll,
  getById,
  getByNguoiDung,
  getUnreadByNguoiDung,
  insert,
  markAsRead,
  markAllAsRead,
  remove,
};
