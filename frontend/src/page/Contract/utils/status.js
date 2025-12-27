// src/page/Contract/utils/status.js

import dayjs from "dayjs";

/**
 * Format payload tạo Hợp đồng FULL (dùng cho createFullContract backend)
 */
export const formatContractPayload = (formData, materials = [], products = []) => {
  return {
    so_hop_dong: formData.so_hop_dong?.trim(),
    loai_hop_dong: formData.loai_hop_dong || "GIA_CONG",
    id_cong_ty: formData.id_cong_ty,
    id_doi_tac: formData.id_doi_tac,
    ma_ngoai_te: formData.ma_ngoai_te || "USD",
    trang_thai: "NHAP",
    dieu_kien_thanh_toan: formData.dieu_kien_thanh_toan?.trim(),
    ma_cuc_hai_quan: formData.ma_cuc_hai_quan?.trim(),
    phi_gia_cong: formData.phi_gia_cong || null,

    // Ngày
    ngay_ky: formData.ngay_ky ? dayjs(formData.ngay_ky).format("YYYY-MM-DD") : null,
    ngay_het_han: formData.ngay_het_han ? dayjs(formData.ngay_het_han).format("YYYY-MM-DD") : null,
    hieu_luc_tu: formData.hieu_luc_tu ? dayjs(formData.hieu_luc_tu).format("YYYY-MM-DD") : null,
    hieu_luc_den: formData.hieu_luc_den ? dayjs(formData.hieu_luc_den).format("YYYY-MM-DD") : null,

    // Ghi chú
    ghi_chu: formData.ghi_chu?.trim(),

    // Chi tiết
    vat_lieus: materials.map(m => ({
      ma_vat_lieu: m.ma_vat_lieu?.trim(),
      ten_vat_lieu: m.ten_vat_lieu?.trim(),
      don_vi_tinh: m.don_vi_tinh?.trim(),
      so_luong: Number(m.so_luong) || 0,
      ma_hs: m.ma_hs?.trim(),
      nguon_goc: m.nguon_goc?.trim(),
      don_gia: Number(m.don_gia) || 0,
    })),

    san_phams: products.map(p => ({
      ma_san_pham: p.ma_san_pham?.trim(),
      ten_san_pham: p.ten_san_pham?.trim(),
      don_vi_tinh: p.don_vi_tinh?.trim(),
      so_luong: Number(p.so_luong) || 0,
      ma_hs: p.ma_hs?.trim(),
      don_gia: Number(p.don_gia) || 0,
    })),
  };
};

/**
 * Format payload tạo Phụ lục hợp đồng
 * @param {object} formData - Dữ liệu form phụ lục
 * @param {array} selectedTypes - Mảng các loại thay đổi đã chọn (từ state selectedAccessoryTypes)
 */
export const formatAppendixPayload = (formData, selectedTypes = []) => {
  return {
    id_hop_dong: formData.baseContractId,
    so_phu_luc: formData.so_phu_luc?.trim(),
    ngay_phu_luc: formData.ngay_phu_luc
      ? dayjs(formData.ngay_phu_luc).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),
    mo_ta: formData.mo_ta?.trim(),
    loai_thay_doi: selectedTypes.map(t => t.code).join(","),
    trang_thai: "DRAFT",
  };
};