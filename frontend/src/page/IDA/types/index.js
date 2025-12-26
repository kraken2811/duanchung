

export const emptyGen1 = {
  declarationNumber: null,
  typeCode: null,
  customsOffice: null,
  regDate: null,

  importer: {
    companyId: null,
    taxCode: null,
    name: null,
    address: null,
    phone: null,
  },

  exporter: {
    doiTacId: null,
    name: null,
    address: null,
    countryCode: null,
    phone: null,
    email: null,
  },
};


export const emptyGoodsItem = {
  hsCode: null,
  description: null,
  quantity: 0,
  unit: null,
  unitPrice: 0,
  totalValue: 0,
  origin: null,
};

export const emptyGen2 = {
  goods: [],
};

const toISO = (d) => (d ? new Date(d).toISOString() : null);

export const formatGen1 = (form) => ({
  so_to_khai: form.declarationNumber ?? null,
  loai_to_khai: form.typeCode ?? null,
  id_loai_hinh: form.typeCode ?? null,
  ma_cuc_hai_quan: form.customsOffice ?? null,
  ngay_khai_bao: toISO(form.regDate),
  phan_loai: "IDA",
  trang_thai_gui: "NHAP",
});


export const formatGen2 = (form) => {
  return {
    hoa_don: {
      so_hoa_don: form.invoice?.number,
      ngay_hoa_don: form.invoice?.date,
      tong_tien: form.invoice?.totalValue,
      ma_ngoai_te: form.invoice?.currency,
      dieu_kien_giao_hang: form.invoice?.incoterms,
    },

    tri_gia: {
      phuong_phap: form.customsValue?.method,
      phi_van_chuyen: form.customsValue?.freight || 0,
      phi_bao_hiem: form.customsValue?.insurance || 0,
    },

    thue: {
      nguoi_nop_thue: form.taxesAndGuarantees?.taxPayer,
      hinh_thuc_nop: form.taxesAndGuarantees?.taxDeadline,
    },

    thong_tin_khac: {
      so_hop_dong: form.otherInformation?.contractNumber,
      ngay_hop_dong: form.otherInformation?.contractDate,
      ghi_chu: form.notes,
    },
  };
}; 
