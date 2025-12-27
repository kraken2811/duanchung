const prisma = require('../prisma/client');

/**
 * Lấy tất cả hợp đồng
 */
const getAll = () => {
  return prisma.hop_dong.findMany({
    orderBy: { ngay_tao: 'desc' },
  });
};

/**
 * Lấy hợp đồng theo ID
 */
const getById = (id_hop_dong) => {
  return prisma.hop_dong.findUnique({
    where: { id_hop_dong },
  });
};

/**
 * Thêm mới hợp đồng
 */
const createFullContract = async (payload, userId) => {
  // 1. Kiểm tra xem người dùng có gửi ID lên không
  if (!payload.id_hop_dong) {
    throw new Error("Bắt buộc phải nhập ID hợp đồng (id_hop_dong)!");
  }

  return prisma.$transaction(async (tx) => {
    // 2. Tạo Hợp đồng với ID từ payload
    const hopDong = await tx.hop_dong.create({
      data: {
        id_hop_dong: payload.id_hop_dong, // <--- LẤY TRỰC TIẾP TỪ INPUT
        so_hop_dong: payload.so_hop_dong,
        loai_hop_dong: payload.loai_hop_dong,
        id_cong_ty: payload.id_cong_ty,
        id_doi_tac: payload.id_doi_tac,
        ma_ngoai_te: payload.ma_ngoai_te,
        trang_thai: 'NHAP',
        nguoi_tao: userId || null, // Tránh lỗi undefined

        // Các trường optional
        ngay_ky: payload.ngay_ky || null,
        ngay_het_han: payload.ngay_het_han || null,
        hieu_luc_tu: payload.hieu_luc_tu || null,
        hieu_luc_den: payload.hieu_luc_den || null,
        dieu_kien_thanh_toan: payload.dieu_kien_thanh_toan || null,
        ma_cuc_hai_quan: payload.ma_cuc_hai_quan || null,
        phi_gia_cong: Number(payload.phi_gia_cong) || 0,
      },
    });

    let tongGiaTri = 0;

    // 3. Xử lý Vật liệu (Dùng ID vừa nhập)
    if (payload.vat_lieus && Array.isArray(payload.vat_lieus) && payload.vat_lieus.length > 0) {
      const materials = payload.vat_lieus.map(v => {
        const so_luong = Number(v.so_luong) || 0;
        const don_gia = Number(v.don_gia) || 0;
        const thanh_tien = so_luong * don_gia;
        tongGiaTri += thanh_tien;

        return {
          id_hop_dong: payload.id_hop_dong, // <--- Dùng ID từ input
          ma_vat_lieu: v.ma_vat_lieu || "",
          ten_vat_lieu: v.ten_vat_lieu || "",
          don_vi_tinh: v.don_vi_tinh || "",
          so_luong,
          ma_hs: v.ma_hs || "",
          nguon_goc: v.nguon_goc || "",
          don_gia,
          tong_gia_tri: thanh_tien,
        };
      });
      await tx.vat_lieu_hop_dong.createMany({ data: materials });
    }

    // 4. Xử lý Sản phẩm (Dùng ID vừa nhập)
    if (payload.san_phams && Array.isArray(payload.san_phams) && payload.san_phams.length > 0) {
      const products = payload.san_phams.map(sp => {
        const so_luong = Number(sp.so_luong) || 0;
        const don_gia = Number(sp.don_gia) || 0;
        const thanh_tien = so_luong * don_gia;
        tongGiaTri += thanh_tien;

        return {
          id_hop_dong: payload.id_hop_dong, // <--- Dùng ID từ input
          ma_san_pham: sp.ma_san_pham || "",
          ten_san_pham: sp.ten_san_pham || "",
          don_vi_tinh: sp.don_vi_tinh || "",
          so_luong,
          ma_hs: sp.ma_hs || "",
          don_gia,
          tong_gia_tri: thanh_tien,
        };
      });
      await tx.san_pham_hop_dong.createMany({ data: products });
    }

    // 5. Cập nhật tổng giá trị
    if (tongGiaTri > 0) {
      await tx.hop_dong.update({
        where: { id_hop_dong: payload.id_hop_dong },
        data: { tong_gia_tri: tongGiaTri },
      });
      hopDong.tong_gia_tri = tongGiaTri;
    }

    return hopDong;
  });
};

/**
 * Cập nhật hợp đồng
 */
const update = (id_hop_dong, data) => {
  return prisma.hop_dong.update({
    where: { id_hop_dong },
    data: {
      so_hop_dong: data.so_hop_dong,
      loai_hop_dong: data.loai_hop_dong,
      id_cong_ty: data.id_cong_ty,
      id_doi_tac: data.id_doi_tac,
      ngay_ky: data.ngay_ky || null,
      ngay_het_han: data.ngay_het_han || null,
      hieu_luc_tu: data.hieu_luc_tu || null,
      hieu_luc_den: data.hieu_luc_den || null,
      trang_thai: data.trang_thai,
      phi_gia_cong: Number(data.phi_gia_cong) || 0,
      ma_ngoai_te: data.ma_ngoai_te,
      dieu_kien_thanh_toan: data.dieu_kien_thanh_toan,
      ma_cuc_hai_quan: data.ma_cuc_hai_quan,
      nguoi_tao: data.nguoi_tao || null,
      ngay_cap_nhat: new Date(),
    },
  });
};

/**
 * Xóa hợp đồng
 * ⚠️ Thực tế nên dùng soft delete / trạng thái HỦY
 */
const remove = (id_hop_dong) => {
  return prisma.hop_dong.update({
    where: { id_hop_dong },
    data: { trang_thai: 'HUY' },
  });
};

module.exports = {
  getAll,
  getById,
  createFullContract,
  update,
  remove,
};
