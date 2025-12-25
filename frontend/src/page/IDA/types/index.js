export const formatIDA = ({ goods = [], ...form }) => {
  const invoice = form.invoice ?? {};
  const bill = form.billOfLading ?? {};

  return {
    toKhai: {
      so_to_khai: form.declarationNumber ?? null,
      loai_to_khai: form.type ?? null,
      ma_cuc_hai_quan: form.customsOffice ?? null,
      ngay_khai_bao: form.regDate ?? null,
      phan_loai: "IDA",
    },

    invoice: invoice.number
      ? {
          so_hoa_don: invoice.number,
          ngay_hoa_don: invoice.date ?? null,
          tong_tien: invoice.totalValue ?? 0,
          ma_ngoai_te: invoice.currency ?? null,
          dieu_kien_giao_hang: invoice.incoterms ?? null,
        }
      : null,

    billOfLading: bill.number
      ? {
          so_van_don: bill.number,
          ten_tau: bill.vehicleName ?? null,
          so_container: bill.packages ?? 0,
        }
      : null,

    goods: goods.map((g, i) => ({
      so_dong: i + 1,
      ma_hs: g?.hsCode ?? null,
      mo_ta_hang_hoa: g?.description ?? null,
      so_luong: g?.quantity ?? 0,
      don_vi_tinh: g?.unit ?? null,
      don_gia: g?.unitPrice ?? 0,
      tong_gia_tri: g?.totalValue ?? 0,
      ma_quoc_gia: g?.origin ?? null,
    })),
  };
};
