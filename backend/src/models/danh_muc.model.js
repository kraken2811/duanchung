const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả danh mục
 */
const getAll = () => {
  return prisma.danh_muc.findMany({
    orderBy: {
      id_danh_muc: 'desc',
    },
  });
};

/**
 * Lấy danh mục theo ID
 */
const getById = (id_danh_muc) => {
  return prisma.danh_muc.findUnique({
    where: { id_danh_muc },
  });
};

/**
 * Thêm mới danh mục
 */
const insert = (data) => {
  return prisma.danh_muc.create({
    data: {
      id_hop_dong: data.id_hop_dong,
      id_san_pham: data.id_san_pham,
      id_vat_lieu: data.id_vat_lieu,
      danh_muc: data.danh_muc,
      ty_le_hao_hut: data.ty_le_hao_hut,
      ma_lenh_san_xuat: data.ma_lenh_san_xuat,
      nam_tai_chinh: data.nam_tai_chinh,
      trang_thai: data.trang_thai,
      ngay_gui: data.ngay_gui,
      ngay_duyet: data.ngay_duyet,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Cập nhật danh mục
 */
const update = (id_danh_muc, data) => {
  return prisma.danh_muc.update({
    where: { id_danh_muc },
    data: {
      id_hop_dong: data.id_hop_dong,
      id_san_pham: data.id_san_pham,
      id_vat_lieu: data.id_vat_lieu,
      danh_muc: data.danh_muc,
      ty_le_hao_hut: data.ty_le_hao_hut,
      ma_lenh_san_xuat: data.ma_lenh_san_xuat,
      nam_tai_chinh: data.nam_tai_chinh,
      trang_thai: data.trang_thai,
      ngay_gui: data.ngay_gui,
      ngay_duyet: data.ngay_duyet,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Xóa danh mục
 */
const remove = (id_danh_muc) => {
  return prisma.danh_muc.delete({
    where: { id_danh_muc },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
