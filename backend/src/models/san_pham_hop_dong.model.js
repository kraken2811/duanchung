const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả sản phẩm hợp đồng
 */
const getAll = () => {
  return prisma.san_pham_hop_dong.findMany({
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Lấy sản phẩm hợp đồng theo ID
 */
const getById = (id_san_pham) => {
  return prisma.san_pham_hop_dong.findUnique({
    where: { id_san_pham },
  });
};

/**
 * Lấy danh sách sản phẩm theo hợp đồng
 */
const getByHopDong = (id_hop_dong) => {
  return prisma.san_pham_hop_dong.findMany({
    where: { id_hop_dong },
    orderBy: {
      ngay_tao: 'asc',
    },
  });
};

/**
 * Thêm mới sản phẩm hợp đồng
 */
const insert = (data) => {
  const so_luong = data.so_luong ?? 0;
  const don_gia = data.don_gia ?? 0;

  return prisma.san_pham_hop_dong.create({
    data: {
      id_hop_dong: data.id_hop_dong,
      ma_san_pham: data.ma_san_pham,
      ten_san_pham: data.ten_san_pham,
      don_vi_tinh: data.don_vi_tinh,
      so_luong,
      ma_hs: data.ma_hs,
      don_gia,
      tong_gia_tri: so_luong * don_gia,
      ngay_tao: data.ngay_tao ?? new Date(),
    },
  });
};

/**
 * Cập nhật sản phẩm hợp đồng
 */
const update = (id_san_pham, data) => {
  const so_luong = data.so_luong ?? 0;
  const don_gia = data.don_gia ?? 0;

  return prisma.san_pham_hop_dong.update({
    where: { id_san_pham },
    data: {
      ma_san_pham: data.ma_san_pham,
      ten_san_pham: data.ten_san_pham,
      don_vi_tinh: data.don_vi_tinh,
      so_luong,
      ma_hs: data.ma_hs,
      don_gia,
      tong_gia_tri: so_luong * don_gia,
    },
  });
};

/**
 * ❌ KHÔNG NÊN delete cứng nếu đã phát sinh nghiệp vụ
 * Nếu bắt buộc → soft delete / trạng thái
 */
const remove = (id_san_pham) => {
  return prisma.san_pham_hop_dong.update({
    where: { id_san_pham },
    data: {
      trang_thai: 'HUY',
    },
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
