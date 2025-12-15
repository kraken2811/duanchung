const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả khoản điều chỉnh trị giá
 */
const getAll = () => {
  return prisma.khoan_dieu_chinh_tri_gia.findMany({
    orderBy: {
      id_khoan_dieu_chinh: 'desc',
    },
  });
};

/**
 * Lấy khoản điều chỉnh trị giá theo ID
 */
const getById = (id_khoan_dieu_chinh) => {
  return prisma.khoan_dieu_chinh_tri_gia.findUnique({
    where: { id_khoan_dieu_chinh },
  });
};

/**
 * Thêm mới khoản điều chỉnh trị giá
 */
const insert = (data) => {
  return prisma.khoan_dieu_chinh_tri_gia.create({
    data: {
      id_to_khai_tri_gia: data.id_to_khai_tri_gia,
      stt: data.stt,
      ma_ten: data.ma_ten,
      ma_phan_loai: data.ma_phan_loai,
      ma_tien_te: data.ma_tien_te,
      tri_gia_dieu_chinh: data.tri_gia_dieu_chinh,
      tong_he_so_phan_bo: data.tong_he_so_phan_bo,
      loai_dieu_chinh: data.loai_dieu_chinh,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Cập nhật khoản điều chỉnh trị giá
 */
const update = (id_khoan_dieu_chinh, data) => {
  return prisma.khoan_dieu_chinh_tri_gia.update({
    where: { id_khoan_dieu_chinh },
    data: {
      id_to_khai_tri_gia: data.id_to_khai_tri_gia,
      stt: data.stt,
      ma_ten: data.ma_ten,
      ma_phan_loai: data.ma_phan_loai,
      ma_tien_te: data.ma_tien_te,
      tri_gia_dieu_chinh: data.tri_gia_dieu_chinh,
      tong_he_so_phan_bo: data.tong_he_so_phan_bo,
      loai_dieu_chinh: data.loai_dieu_chinh,
      ngay_tao: data.ngay_tao,
    },
  });
};

/**
 * Xóa khoản điều chỉnh trị giá
 * ⚠️ Nghiệp vụ tài chính: nên cân nhắc soft delete
 */
const remove = (id_khoan_dieu_chinh) => {
  return prisma.khoan_dieu_chinh_tri_gia.delete({
    where: { id_khoan_dieu_chinh },
  });
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
