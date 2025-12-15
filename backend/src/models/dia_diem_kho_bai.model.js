const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả địa điểm kho bãi
 */
const getAll = () => {
  return prisma.dia_diem_kho_bai.findMany({
    orderBy: {
      id_dia_diem: 'desc',
    },
  });
};

/**
 * Lấy địa điểm kho bãi theo ID
 */
const getById = (id_dia_diem) => {
  return prisma.dia_diem_kho_bai.findUnique({
    where: { id_dia_diem },
  });
};

/**
 * Thêm mới địa điểm kho bãi
 */
const insert = (data) => {
  return prisma.dia_diem_kho_bai.create({
    data: {
      ma_dia_diem: data.ma_dia_diem,
      ten_dia_diem: data.ten_dia_diem,
      dia_chi: data.dia_chi,
      loai_dia_diem: data.loai_dia_diem,
      ma_cuc_hai_quan: data.ma_cuc_hai_quan,
      id_tinh_thanh: data.id_tinh_thanh,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Cập nhật địa điểm kho bãi
 */
const update = (id_dia_diem, data) => {
  return prisma.dia_diem_kho_bai.update({
    where: { id_dia_diem },
    data: {
      ma_dia_diem: data.ma_dia_diem,
      ten_dia_diem: data.ten_dia_diem,
      dia_chi: data.dia_chi,
      loai_dia_diem: data.loai_dia_diem,
      ma_cuc_hai_quan: data.ma_cuc_hai_quan,
      id_tinh_thanh: data.id_tinh_thanh,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Xóa địa điểm kho bãi
 */
const remove = (id_dia_diem) => {
  return prisma.dia_diem_kho_bai.delete({
    where: { id_dia_diem },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
