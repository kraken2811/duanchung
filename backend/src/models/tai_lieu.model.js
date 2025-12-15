const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả tài liệu
 */
const getAll = () => {
  return prisma.tai_lieu.findMany({
    orderBy: {
      id_tai_lieu: 'desc',
    },
  });
};

/**
 * Lấy tài liệu theo ID
 */
const getById = (id_tai_lieu) => {
  return prisma.tai_lieu.findUnique({
    where: { id_tai_lieu },
  });
};

/**
 * Lấy tài liệu theo đối tượng (đa hình)
 */
const getByDoiTuong = (loai_doi_tuong, id_doi_tuong) => {
  return prisma.tai_lieu.findMany({
    where: {
      loai_doi_tuong,
      id_doi_tuong,
    },
    orderBy: {
      ngay_tai_len: 'desc',
    },
  });
};

/**
 * Lấy tài liệu theo tờ khai
 */
const getByToKhai = (id_to_khai) => {
  return prisma.tai_lieu.findMany({
    where: { id_to_khai },
    orderBy: {
      ngay_tai_len: 'desc',
    },
  });
};

/**
 * Thêm mới tài liệu
 */
const insert = (data) => {
  return prisma.tai_lieu.create({
    data: {
      loai_doi_tuong: data.loai_doi_tuong,
      id_doi_tuong: data.id_doi_tuong,
      loai_tai_lieu: data.loai_tai_lieu,
      ten_file: data.ten_file,
      duong_dan: data.duong_dan,
      kich_thuoc: data.kich_thuoc,
      loai_mime: data.loai_mime,
      ma_kiem_tra: data.ma_kiem_tra,
      chu_ky_so: data.chu_ky_so,
      nguoi_ky: data.nguoi_ky,
      ngay_ky: data.ngay_ky,
      nguoi_tai_len: data.nguoi_tai_len,
      ngay_tai_len: data.ngay_tai_len ?? new Date(),
      ma_cuc_hai_quan: data.ma_cuc_hai_quan,
      nhom_xu_ly_ho_so: data.nhom_xu_ly_ho_so,
      phan_loai_khai_bao: data.phan_loai_khai_bao,
      so_dien_thoai_nguoi_khai: data.so_dien_thoai_nguoi_khai,
      so_quan_ly_noi_bo: data.so_quan_ly_noi_bo,
      ghi_chu: data.ghi_chu,
      so_dinh_kem: data.so_dinh_kem,
      trang_thai_gui: data.trang_thai_gui ?? 'CHUA_GUI',
      ngay_gui: data.ngay_gui,
      id_to_khai: data.id_to_khai,
    },
  });
};

/**
 * Cập nhật metadata tài liệu
 */
const update = (id_tai_lieu, data) => {
  return prisma.tai_lieu.update({
    where: { id_tai_lieu },
    data: {
      loai_tai_lieu: data.loai_tai_lieu,
      ghi_chu: data.ghi_chu,
      so_dinh_kem: data.so_dinh_kem,
      trang_thai_gui: data.trang_thai_gui,
      ngay_gui: data.ngay_gui,
      chu_ky_so: data.chu_ky_so,
      nguoi_ky: data.nguoi_ky,
      ngay_ky: data.ngay_ky,
    },
  });
};

/**
 * ❌ KHÔNG KHUYẾN KHÍCH delete cứng
 * Nếu bắt buộc → soft delete / trạng thái
 */
const remove = (id_tai_lieu) => {
  return prisma.tai_lieu.delete({
    where: { id_tai_lieu },
  });
};

module.exports = {
  getAll,
  getById,
  getByDoiTuong,
  getByToKhai,
  insert,
  update,
  remove,
};
