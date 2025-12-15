const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả vật liệu theo hợp đồng
 */
const getAll = () => {
  return prisma.vat_lieu_hop_dong.findMany({
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Lấy vật liệu theo ID
 */
const getById = (id_vat_lieu) => {
  return prisma.vat_lieu_hop_dong.findUnique({
    where: { id_vat_lieu },
  });
};

/**
 * Lấy vật liệu theo hợp đồng
 */
const getByHopDong = (id_hop_dong) => {
  return prisma.vat_lieu_hop_dong.findMany({
    where: { id_hop_dong },
    orderBy: {
      ngay_tao: 'asc',
    },
  });
};

/**
 * Thêm vật liệu vào hợp đồng
 */
const insert = (data) => {
  return prisma.vat_lieu_hop_dong.create({
    data: {
      id_hop_dong: data.id_hop_dong,
      ma_vat_lieu: data.ma_vat_lieu,
      ten_vat_lieu: data.ten_vat_lieu,
      don_vi_tinh: data.don_vi_tinh,
      so_luong: data.so_luong,
      nguon_goc: data.nguon_goc,
      ma_hs: data.ma_hs,
      don_gia: data.don_gia,
      tong_gia_tri: data.tong_gia_tri,
      ngay_tao: data.ngay_tao ?? new Date(),
    },
  });
};

/**
 * Cập nhật vật liệu hợp đồng
 * ⚠️ Chỉ cho phép khi CHƯA phát sinh tờ khai
 */
const update = (id_vat_lieu, data) => {
  return prisma.vat_lieu_hop_dong.update({
    where: { id_vat_lieu },
    data: {
      ma_vat_lieu: data.ma_vat_lieu,
      ten_vat_lieu: data.ten_vat_lieu,
      don_vi_tinh: data.don_vi_tinh,
      so_luong: data.so_luong,
      nguon_goc: data.nguon_goc,
      ma_hs: data.ma_hs,
      don_gia: data.don_gia,
      tong_gia_tri: data.tong_gia_tri,
    },
  });
};

/**
 * ❌ Không khuyến khích xoá cứng
 * Chỉ dùng khi chưa liên kết nghiệp vụ
 */
const remove = (id_vat_lieu) => {
  return prisma.vat_lieu_hop_dong.delete({
    where: { id_vat_lieu },
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
