const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả phản hồi hải quan
 */
const getAll = () => {
  return prisma.phan_hoi_hai_quan.findMany({
    orderBy: {
      id_phan_hoi: 'desc',
    },
  });
};

/**
 * Lấy phản hồi hải quan theo ID
 */
const getById = (id_phan_hoi) => {
  return prisma.phan_hoi_hai_quan.findUnique({
    where: { id_phan_hoi },
  });
};

/**
 * Lấy phản hồi theo tờ khai
 */
const getByToKhai = (id_to_khai) => {
  return prisma.phan_hoi_hai_quan.findMany({
    where: { id_to_khai },
    orderBy: {
      ngay_nhan: 'desc',
    },
  });
};

/**
 * Thêm mới phản hồi hải quan (VNACCS trả về)
 */
const insert = (data) => {
  return prisma.phan_hoi_hai_quan.create({
    data: {
      id_to_khai: data.id_to_khai,
      loai_thong_diep: data.loai_thong_diep,
      so_tiep_nhan_vnacss: data.so_tiep_nhan_vnacss,
      mau_kenh: data.mau_kenh,
      ma_thong_diep: data.ma_thong_diep,
      noi_dung_thong_diep: data.noi_dung_thong_diep,
      du_lieu_goc: data.du_lieu_goc,
      ngay_nhan: data.ngay_nhan ?? new Date(),
    },
  });
};

/**
 * ⚠️ KHÔNG KHUYẾN NGHỊ update phản hồi hải quan
 * Chỉ cho phép bổ sung nội dung diễn giải nếu bắt buộc
 */
const update = (id_phan_hoi, data) => {
  return prisma.phan_hoi_hai_quan.update({
    where: { id_phan_hoi },
    data: {
      noi_dung_thong_diep: data.noi_dung_thong_diep,
    },
  });
};

/**
 * ❌ KHÔNG NÊN delete phản hồi hải quan
 * Nếu buộc phải làm (không khuyến nghị)
 */
const remove = (id_phan_hoi) => {
  return prisma.phan_hoi_hai_quan.delete({
    where: { id_phan_hoi },
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
