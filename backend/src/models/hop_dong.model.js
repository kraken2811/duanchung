const prisma = require('../prisma/client');

/**
 * Lấy tất cả hợp đồng
 */
const getAll = () => {
  return prisma.hop_dong.findMany({
    orderBy: {
      ngay_tao: 'desc',
    },
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
  return prisma.$transaction(async (tx) => {
    const hopDong = await tx.hop_dong.create({
      data: {
        so_hop_dong: payload.so_hop_dong,
        loai_hop_dong: payload.loai_hop_dong,
        id_cong_ty: payload.id_cong_ty,
        id_doi_tac: payload.id_doi_tac,
        ma_ngoai_te: payload.ma_ngoai_te,
        trang_thai: 'NHAP',
        nguoi_tao: userId,
      },
    });

    let tongGiaTri = 0;

    if (payload.vat_lieus?.length) {
      const materials = payload.vat_lieus.map(v => {
        const so_luong = v.so_luong ?? 0;
        const don_gia = v.don_gia ?? 0;
        const thanh_tien = so_luong * don_gia;
        tongGiaTri += thanh_tien;

        return {
          id_hop_dong: hopDong.id_hop_dong,
          ma_vat_lieu: v.ma_vat_lieu,
          ten_vat_lieu: v.ten_vat_lieu,
          don_vi_tinh: v.don_vi_tinh,
          so_luong,
          ma_hs: v.ma_hs,
          nguon_goc: v.nguon_goc,
          don_gia,
          tong_gia_tri: thanh_tien,
        };
      });

      await tx.vat_lieu_hop_dong.createMany({ data: materials });
    }

    if (payload.san_phams?.length) {
      const products = payload.san_phams.map(sp => {
        const so_luong = sp.so_luong ?? 0;
        const don_gia = sp.don_gia ?? 0;
        const thanh_tien = so_luong * don_gia;
        tongGiaTri += thanh_tien;

        return {
          id_hop_dong: hopDong.id_hop_dong,
          ma_san_pham: sp.ma_san_pham,
          ten_san_pham: sp.ten_san_pham,
          don_vi_tinh: sp.don_vi_tinh,
          so_luong,
          ma_hs: sp.ma_hs,
          don_gia,
          tong_gia_tri: thanh_tien,
        };
      });

      await tx.san_pham_hop_dong.createMany({ data: products });
    }

    await tx.hop_dong.update({
      where: { id_hop_dong: hopDong.id_hop_dong },
      data: { tong_gia_tri: tongGiaTri },
    });

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
      ngay_ky: data.ngay_ky,
      ngay_het_han: data.ngay_het_han,
      hieu_luc_tu: data.hieu_luc_tu,
      hieu_luc_den: data.hieu_luc_den,
      trang_thai: data.trang_thai,
      tong_gia_tri: data.tong_gia_tri,
      phi_gia_cong: data.phi_gia_cong,
      ma_ngoai_te: data.ma_ngoai_te,
      dieu_kien_thanh_toan: data.dieu_kien_thanh_toan,
      ma_cuc_hai_quan: data.ma_cuc_hai_quan,
      nguoi_tao: data.nguoi_tao,
      ngay_cap_nhat: data.ngay_cap_nhat,
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
    data: {
      trang_thai: 'HUY',
    },
  });
};

module.exports = {
  getAll,
  getById,
  createFullContract,
  update,
  remove,
};
