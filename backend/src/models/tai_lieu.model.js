const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Lấy tất cả tài liệu
 */
const getAll = () => {
  return prisma.tai_lieu.findMany({
    orderBy: { id_tai_lieu: "desc" },
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
    orderBy: { ngay_tai_len: "desc" },
  });
};

/**
 * Lấy tài liệu theo tờ khai
 */
const getByToKhai = (id_to_khai) => {
  return prisma.tai_lieu.findMany({
    where: { id_to_khai },
    orderBy: { ngay_tai_len: "desc" },
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
      id_to_khai: data.id_to_khai ?? null,

      phan_loai_khai_bao: data.phan_loai_khai_bao,
      loai_tai_lieu: data.loai_tai_lieu,

      ten_file: data.ten_file,
      duong_dan: data.duong_dan,
      kich_thuoc: data.kich_thuoc,
      loai_mime: data.loai_mime,

      nguoi_tai_len: data.nguoi_tai_len,
      ngay_tai_len: new Date(),

      ghi_chu: data.ghi_chu ?? null,
      trang_thai_gui: data.trang_thai_gui || "NHAP",
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
      trang_thai_gui: data.trang_thai_gui,
      ngay_gui: data.ngay_gui,
      chu_ky_so: data.chu_ky_so,
      nguoi_ky: data.nguoi_ky,
      ngay_ky: data.ngay_ky,
    },
  });
};

/**
 * ❌ Không khuyến khích delete cứng
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
