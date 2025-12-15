const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả tờ khai trị giá
 */
const getAll = () => {
  return prisma.to_khai_tri_gia.findMany({
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Lấy tờ khai trị giá theo ID
 */
const getById = (id_to_khai_tri_gia) => {
  return prisma.to_khai_tri_gia.findUnique({
    where: { id_to_khai_tri_gia },
  });
};

/**
 * Lấy tờ khai trị giá theo tờ khai hải quan
 */
const getByToKhaiHaiQuan = (id_to_khai_hai_quan) => {
  return prisma.to_khai_tri_gia.findUnique({
    where: { id_to_khai_hai_quan },
  });
};

/**
 * Tạo mới tờ khai trị giá
 */
const insert = (data) => {
  return prisma.to_khai_tri_gia.create({
    data: {
      id_to_khai_hai_quan: data.id_to_khai_hai_quan,
      ma_phan_loai_khai_tri_gia: data.ma_phan_loai_khai_tri_gia,
      so_tiep_nhan_to_khai_tri_gia_tong_hop:
        data.so_tiep_nhan_to_khai_tri_gia_tong_hop,
      ma_tien_te: data.ma_tien_te,
      gia_co_so_hieu_chinh: data.gia_co_so_hieu_chinh,
      tong_he_so_phan_bo: data.tong_he_so_phan_bo,
      nguoi_nop_thue: data.nguoi_nop_thue,
      nguoi_tao: data.nguoi_tao,
      ngay_tao: data.ngay_tao ?? new Date(),
    },
  });
};

/**
 * Cập nhật tờ khai trị giá
 * ⚠️ Chỉ cho phép khi chưa gửi VNACCS / chưa tính thuế
 */
const update = (id_to_khai_tri_gia, data) => {
  return prisma.to_khai_tri_gia.update({
    where: { id_to_khai_tri_gia },
    data: {
      ma_phan_loai_khai_tri_gia: data.ma_phan_loai_khai_tri_gia,
      ma_tien_te: data.ma_tien_te,
      gia_co_so_hieu_chinh: data.gia_co_so_hieu_chinh,
      tong_he_so_phan_bo: data.tong_he_so_phan_bo,
      nguoi_nop_thue: data.nguoi_nop_thue,
    },
  });
};

/**
 * ❌ TUYỆT ĐỐI KHÔNG DELETE nếu đã phát sinh thuế
 * Nếu cần → VOID / HỦY
 */
const remove = (id_to_khai_tri_gia) => {
  return prisma.to_khai_tri_gia.delete({
    where: { id_to_khai_tri_gia },
  });
};

module.exports = {
  getAll,
  getById,
  getByToKhaiHaiQuan,
  insert,
  update,
  remove,
};
