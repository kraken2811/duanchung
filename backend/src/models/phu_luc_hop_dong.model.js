const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả phụ lục hợp đồng
 */
const getAll = () => {
  return prisma.phu_luc_hop_dong.findMany({
    orderBy: {
      id_phu_luc: 'desc',
    },
  });
};

/**
 * Lấy phụ lục hợp đồng theo ID
 */
const getById = (id_phu_luc) => {
  return prisma.phu_luc_hop_dong.findUnique({
    where: { id_phu_luc },
  });
};

/**
 * Lấy phụ lục theo hợp đồng
 */
const getByHopDong = (id_hop_dong) => {
  return prisma.phu_luc_hop_dong.findMany({
    where: { id_hop_dong },
    orderBy: {
      ngay_phu_luc: 'desc',
    },
  });
};

/**
 * Thêm mới phụ lục hợp đồng
 */
const insert = (data) => {
  return prisma.phu_luc_hop_dong.create({
    data: {
      id_hop_dong: data.id_hop_dong,
      so_phu_luc: data.so_phu_luc,
      ngay_phu_luc: data.ngay_phu_luc,
      mo_ta: data.mo_ta,
      loai_thay_doi: data.loai_thay_doi,
      trang_thai: data.trang_thai ?? 'DRAFT',
      nguoi_tao: data.nguoi_tao,
      ngay_tao: data.ngay_tao ?? new Date(),
    },
  });
};

/**
 * Cập nhật phụ lục hợp đồng
 * ⚠️ Chỉ nên cho update khi còn DRAFT
 */
const update = (id_phu_luc, data) => {
  return prisma.phu_luc_hop_dong.update({
    where: { id_phu_luc },
    data: {
      mo_ta: data.mo_ta,
      loai_thay_doi: data.loai_thay_doi,
      trang_thai: data.trang_thai,
    },
  });
};

/**
 * ❌ KHÔNG NÊN delete phụ lục hợp đồng
 * Nếu bắt buộc → soft delete / trạng thái HỦY
 */
const remove = (id_phu_luc) => {
  return prisma.phu_luc_hop_dong.delete({
    where: { id_phu_luc },
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
