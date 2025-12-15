const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả biểu thuế
 */
const getAll = () => {
  return prisma.bieu_thue.findMany({
    orderBy: {
      id_bieu_thue: 'desc',
    },
  });
};

/**
 * Lấy biểu thuế theo ID
 */
const getById = (id_bieu_thue) => {
  return prisma.bieu_thue.findUnique({
    where: { id_bieu_thue },
  });
};

/**
 * Thêm mới biểu thuế
 */
const insert = (data) => {
  return prisma.bieu_thue.create({
    data: {
      ma_hs: data.ma_hs,
      hieu_luc_tu: data.hieu_luc_tu,
      hieu_luc_den: data.hieu_luc_den,
      thue_suat: data.thue_suat,
      thue_vat: data.thue_vat,
      thue_tieu_thu_dac_biet: data.thue_tieu_thu_dac_biet,
      ghi_chu: data.ghi_chu,
    },
  });
};

/**
 * Cập nhật biểu thuế
 */
const update = (id_bieu_thue, data) => {
  return prisma.bieu_thue.update({
    where: { id_bieu_thue },
    data: {
      ma_hs: data.ma_hs,
      hieu_luc_tu: data.hieu_luc_tu,
      hieu_luc_den: data.hieu_luc_den,
      thue_suat: data.thue_suat,
      thue_vat: data.thue_vat,
      thue_tieu_thu_dac_biet: data.thue_tieu_thu_dac_biet,
      ghi_chu: data.ghi_chu,
    },
  });
};

/**
 * Xóa biểu thuế
 */
const remove = (id_bieu_thue) => {
  return prisma.bieu_thue.delete({
    where: { id_bieu_thue },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
