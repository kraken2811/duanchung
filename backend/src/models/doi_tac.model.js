const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả đối tác
 */
const getAll = () => {
  return prisma.doi_tac.findMany({
    orderBy: {
      id_doi_tac: 'desc',
    },
  });
};

/**
 * Lấy đối tác theo ID
 */
const getById = (id_doi_tac) => {
  return prisma.doi_tac.findUnique({
    where: { id_doi_tac },
  });
};

/**
 * Thêm mới đối tác
 */
const insert = (data) => {
  return prisma.doi_tac.create({
    data: {
      ma_so_thue: data.ma_so_thue,
      ten_doi_tac: data.ten_doi_tac,
      dia_chi: data.dia_chi,
      ma_quoc_gia: data.ma_quoc_gia,
      nguoi_lien_he: data.nguoi_lien_he,
      dien_thoai_lien_he: data.dien_thoai_lien_he,
      email_lien_he: data.email_lien_he,
      loai_doi_tac: data.loai_doi_tac,
      id_cong_ty: data.id_cong_ty,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Cập nhật đối tác
 */
const update = (id_doi_tac, data) => {
  return prisma.doi_tac.update({
    where: { id_doi_tac },
    data: {
      ma_so_thue: data.ma_so_thue,
      ten_doi_tac: data.ten_doi_tac,
      dia_chi: data.dia_chi,
      ma_quoc_gia: data.ma_quoc_gia,
      nguoi_lien_he: data.nguoi_lien_he,
      dien_thoai_lien_he: data.dien_thoai_lien_he,
      email_lien_he: data.email_lien_he,
      loai_doi_tac: data.loai_doi_tac,
      id_cong_ty: data.id_cong_ty,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Xóa đối tác
 */
const remove = (id_doi_tac) => {
  return prisma.doi_tac.delete({
    where: { id_doi_tac },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
