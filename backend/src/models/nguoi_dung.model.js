const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy danh sách người dùng (KHÔNG trả mật khẩu)
 */
const getAll = () => {
  return prisma.nguoi_dung.findMany({
    select: {
      id_nguoi_dung: true,
      ten_dang_nhap: true,
      ho_ten: true,
      email: true,
      dien_thoai: true,
      id_vai_tro: true,
      id_cong_ty: true,
      kich_hoat: true,
      ngay_tao: true,
      ngay_cap_nhat: true,
    },
    orderBy: {
      id_nguoi_dung: 'desc',
    },
  });
};

/**
 * Lấy người dùng theo ID (KHÔNG trả mật khẩu)
 */
const getById = (id_nguoi_dung) => {
  return prisma.nguoi_dung.findUnique({
    where: { id_nguoi_dung },
    select: {
      id_nguoi_dung: true,
      ten_dang_nhap: true,
      ho_ten: true,
      email: true,
      dien_thoai: true,
      id_vai_tro: true,
      id_cong_ty: true,
      kich_hoat: true,
      ngay_tao: true,
      ngay_cap_nhat: true,
    },
  });
};

/**
 * Lấy user để login (CÓ mật khẩu – dùng nội bộ)
 */
const getByUsername = (ten_dang_nhap) => {
  return prisma.nguoi_dung.findUnique({
    where: { ten_dang_nhap },
  });
};

/**
 * Thêm mới người dùng
 * 👉 mat_khau PHẢI là password đã hash
 */
const insert = (data) => {
  return prisma.nguoi_dung.create({
    data: {
      ten_dang_nhap: data.ten_dang_nhap,
      mat_khau: data.mat_khau, // hash rồi
      ho_ten: data.ho_ten,
      email: data.email,
      dien_thoai: data.dien_thoai,
      id_vai_tro: data.id_vai_tro,
      id_cong_ty: data.id_cong_ty,
      kich_hoat: data.kich_hoat ?? true,
      ngay_tao: new Date(),
    },
  });
};

/**
 * Cập nhật thông tin người dùng (KHÔNG cập nhật mật khẩu)
 */
const update = (id_nguoi_dung, data) => {
  return prisma.nguoi_dung.update({
    where: { id_nguoi_dung },
    data: {
      ho_ten: data.ho_ten,
      email: data.email,
      dien_thoai: data.dien_thoai,
      id_vai_tro: data.id_vai_tro,
      id_cong_ty: data.id_cong_ty,
      kich_hoat: data.kich_hoat,
      ngay_cap_nhat: new Date(),
    },
  });
};

/**
 * Đổi mật khẩu
 */
const updatePassword = (id_nguoi_dung, mat_khau_hash) => {
  return prisma.nguoi_dung.update({
    where: { id_nguoi_dung },
    data: {
      mat_khau: mat_khau_hash,
      ngay_cap_nhat: new Date(),
    },
  });
};

/**
 * ❌ KHÔNG DELETE cứng user
 * 👉 Chỉ deactivate
 */
const deactivate = (id_nguoi_dung) => {
  return prisma.nguoi_dung.update({
    where: { id_nguoi_dung },
    data: {
      kich_hoat: false,
      ngay_cap_nhat: new Date(),
    },
  });
};

module.exports = {
  getAll,
  getById,
  getByUsername,
  insert,
  update,
  updatePassword,
  deactivate,
};
