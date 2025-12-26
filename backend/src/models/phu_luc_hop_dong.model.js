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
 * 🛠️ ĐÃ SỬA: Bắt buộc truyền id_phu_luc và xử lý loai_thay_doi đúng cách
 */
const insert = (data) => {
  // Kiểm tra bắt buộc id_phu_luc
  if (!data.id_phu_luc) {
    throw new Error('id_phu_luc là bắt buộc khi tạo phụ lục hợp đồng');
  }

  // Xử lý loai_thay_doi: chuyển array thành JSON string nếu cần
  const loaiThayDoiString = Array.isArray(data.loai_thay_doi)
    ? JSON.stringify(data.loai_thay_doi)
    : data.loai_thay_doi || null; // hoặc để null nếu không bắt buộc

  return prisma.phu_luc_hop_dong.create({
    data: {
      id_phu_luc: data.id_phu_luc,         // ← QUAN TRỌNG: phải truyền vào đây
      id_hop_dong: data.id_hop_dong,
      so_phu_luc: data.so_phu_luc,
      ngay_phu_luc: data.ngay_phu_luc ? new Date(data.ngay_phu_luc) : new Date(),
      mo_ta: data.mo_ta || null,
      loai_thay_doi: loaiThayDoiString,
      trang_thai: data.trang_thai ?? 'DRAFT',
      nguoi_tao: data.nguoi_tao,
      ngay_tao: data.ngay_tao ? new Date(data.ngay_tao) : new Date(),
    },
  });
};

/**
 * Cập nhật phụ lục hợp đồng
 * Chỉ cho phép cập nhật một số trường (an toàn hơn)
 */
const update = (id_phu_luc, data) => {
  if (!id_phu_luc) {
    throw new Error('id_phu_luc là bắt buộc để cập nhật');
  }

  // Chỉ xử lý loai_thay_doi nếu có gửi lên
  const loaiThayDoiUpdate = data.loai_thay_doi !== undefined
    ? Array.isArray(data.loai_thay_doi)
      ? JSON.stringify(data.loai_thay_doi)
      : data.loai_thay_doi
    : undefined;

  return prisma.phu_luc_hop_dong.update({
    where: { id_phu_luc },
    data: {
      so_phu_luc: data.so_phu_luc,
      ngay_phu_luc: data.ngay_phu_luc ? new Date(data.ngay_phu_luc) : undefined,
      mo_ta: data.mo_ta,
      loai_thay_doi: loaiThayDoiUpdate,
      trang_thai: data.trang_thai,
      // Không cho cập nhật id_phu_luc, id_hop_dong, nguoi_tao, ngay_tao sau khi tạo
    },
  });
};

/**
 * Xóa phụ lục (hard delete - chỉ dùng nếu thực sự cần)
 * Khuyến khích dùng soft delete (thêm trường deleted_at hoặc trang_thai = 'HỦY')
 */
const remove = (id_phu_luc) => {
  if (!id_phu_luc) {
    throw new Error('id_phu_luc là bắt buộc để xóa');
  }

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