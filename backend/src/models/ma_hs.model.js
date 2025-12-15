const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả mã HS
 */
const getAll = () => {
  return prisma.ma_hs.findMany({
    orderBy: {
      ma_hs: 'asc',
    },
  });
};

/**
 * Lấy mã HS theo ID
 */
const getById = (id_ma_hs) => {
  return prisma.ma_hs.findUnique({
    where: { id_ma_hs },
  });
};

/**
 * Thêm mới mã HS
 */
const insert = (data) => {
  return prisma.ma_hs.create({
    data: {
      ma_hs: data.ma_hs,
      mo_ta: data.mo_ta,
      cap_do: data.cap_do,
      ma_cha: data.ma_cha,
      thue_nhap_khau: data.thue_nhap_khau,
      thue_vat: data.thue_vat,
      thue_xuat_khau: data.thue_xuat_khau,
      thue_tieu_thu_dac_biet: data.thue_tieu_thu_dac_biet,
      thue_bao_ve_moi_trung: data.thue_bao_ve_moi_trung,
      yeu_cau_giay_phep: data.yeu_cau_giay_phep,
      loai_giay_phep: data.loai_giay_phep,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Cập nhật mã HS
 */
const update = (id_ma_hs, data) => {
  return prisma.ma_hs.update({
    where: { id_ma_hs },
    data: {
      ma_hs: data.ma_hs,
      mo_ta: data.mo_ta,
      cap_do: data.cap_do,
      ma_cha: data.ma_cha,
      thue_nhap_khau: data.thue_nhap_khau,
      thue_vat: data.thue_vat,
      thue_xuat_khau: data.thue_xuat_khau,
      thue_tieu_thu_dac_biet: data.thue_tieu_thu_dac_biet,
      thue_bao_ve_moi_trung: data.thue_bao_ve_moi_trung,
      yeu_cau_giay_phep: data.yeu_cau_giay_phep,
      loai_giay_phep: data.loai_giay_phep,
    },
  });
};

/**
 * Xóa mã HS
 * ⚠️ Thực tế nghiệp vụ: mã HS thường KHÔNG nên delete cứng
 */
const remove = (id_ma_hs) => {
  return prisma.ma_hs.delete({
    where: { id_ma_hs },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
