const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả tờ khai
 */
const getAll = () => {
  return prisma.to_khai_hai_quan.findMany({
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Lấy tờ khai theo ID
 */
const getById = (id_to_khai) => {
  return prisma.to_khai_hai_quan.findUnique({
    where: { id_to_khai },
  });
};

/**
 * Lấy tờ khai theo lô hàng
 */
const getByLoHang = (id_lo_hang) => {
  return prisma.to_khai_hai_quan.findMany({
    where: { id_lo_hang },
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Lấy tờ khai theo công ty
 */
const getByCongTy = (id_cong_ty) => {
  return prisma.to_khai_hai_quan.findMany({
    where: { id_cong_ty },
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Tạo mới tờ khai hải quan
 */
const insert = (data) => {
  return prisma.to_khai_hai_quan.create({
    data: {
      so_to_khai: data.so_to_khai,
      id_lo_hang: data.id_lo_hang,
      loai_to_khai: data.loai_to_khai,
      id_loai_hinh: data.id_loai_hinh,
      id_hop_dong: data.id_hop_dong,
      id_cong_ty: data.id_cong_ty,

      trang_thai_gui: data.trang_thai_gui ?? 'DRAFT',

      ma_thong_diep_vnacss: data.ma_thong_diep_vnacss,
      so_tiep_nhan_vnacss: data.so_tiep_nhan_vnacss,
      mau_kenh: data.mau_kenh,
      so_thong_bao_thue: data.so_thong_bao_thue,
      phan_loai: data.phan_loai,
      so_tien_thue: data.so_tien_thue,

      ma_cuc_hai_quan: data.ma_cuc_hai_quan,
      ngay_khai_bao: data.ngay_khai_bao,

      nguoi_tao: data.nguoi_tao,
      ngay_tao: data.ngay_tao ?? new Date(),
    },
  });
};

/**
 * Cập nhật tờ khai
 * ⚠️ Chỉ cho phép khi chưa gửi VNACCS
 */
const update = (id_to_khai, data) => {
  return prisma.to_khai_hai_quan.update({
    where: { id_to_khai },
    data: {
      loai_to_khai: data.loai_to_khai,
      id_loai_hinh: data.id_loai_hinh,
      trang_thai_gui: data.trang_thai_gui,
      so_tien_thue: data.so_tien_thue,
      phan_loai: data.phan_loai,
      mau_kenh: data.mau_kenh,
      so_thong_bao_thue: data.so_thong_bao_thue,
      ngay_cap_nhat: new Date(),
    },
  });
};

/**
 * Cập nhật trạng thái sau phản hồi VNACCS
 */
const updateVNACCS = (id_to_khai, vnaccsData) => {
  return prisma.to_khai_hai_quan.update({
    where: { id_to_khai },
    data: {
      trang_thai_gui: vnaccsData.trang_thai_gui,
      ma_thong_diep_vnacss: vnaccsData.ma_thong_diep_vnacss,
      so_tiep_nhan_vnacss: vnaccsData.so_tiep_nhan_vnacss,
      mau_kenh: vnaccsData.mau_kenh,
      phan_loai: vnaccsData.phan_loai,
      ngay_cap_nhat: new Date(),
    },
  });
};

/**
 * ❌ TUYỆT ĐỐI KHÔNG DELETE TỜ KHAI
 * Nếu cần → HỦY / VOID
 */
const remove = (id_to_khai) => {
  return prisma.to_khai_hai_quan.delete({
    where: { id_to_khai },
  });
};

module.exports = {
  getAll,
  getById,
  getByLoHang,
  getByCongTy,
  insert,
  update,
  updateVNACCS,
  remove,
};
