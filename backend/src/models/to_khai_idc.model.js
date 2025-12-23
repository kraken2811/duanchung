const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findTokhaiBySoToKhai = (so_to_khai) => {
    return prisma.to_khai_hai_quan.findUnique({
        where: { so_to_khai },
        include: {
            chi_tiet_to_khai: true,
        },
    });
};

const findChiTietById = (id_chi_tiet) => {
    return prisma.chi_tiet_to_khai.findUnique({
        where: { id_chi_tiet },
    });
};

const updateChiTiet = (id_chi_tiet, data) => {
    return prisma.chi_tiet_to_khai.update({
        where: { id_chi_tiet },
        data,
    });
};

const createAuditLog = (data) => {
    return prisma.audit_log.create({
        data,
    });
};

const createLichSuTrangThai = (data) => {
    return prisma.lich_su_trang_thai.create({
        data,
    });
};

const createPhanHoiHaiQuan = (data) => {
    return prisma.phan_hoi_hai_quan.create({
        data,
    });
};

const findToKhaiById = (id_to_khai) => {
    return prisma.to_khai_hai_quan.findUnique({
        where: { id_to_khai },
    });
};

const createTaiLieu = (data) => {
  return prisma.tai_lieu.create({
    data: {
      loai_doi_tuong: "TO_KHAI",
      id_doi_tuong: data.id_to_khai,
      loai_tai_lieu: data.loai_tai_lieu || "CONG_VAN_XIN_HUY",
      ten_file: data.ten_file,
      duong_dan: data.duong_dan,
      kich_thuoc: data.kich_thuoc || null,
      loai_mime: data.loai_mime || null,
      id_to_khai: data.id_to_khai,
      nguoi_tai_len: data.nguoi_tai_len || null,
    },
  });
};

module.exports = {
    findTokhaiBySoToKhai,
    findChiTietById,
    updateChiTiet,
    createAuditLog,
    createLichSuTrangThai,
    createPhanHoiHaiQuan,
    findToKhaiById,
    createTaiLieu,
};