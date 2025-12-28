
const toISO = (d) => (d ? new Date(d).toISOString() : null);


export const emptyEDAGen1 = {
  declarationNumber: null,
  typeCode: null,
  customsOffice: null,
  regDate: null,

  exporter: {
    companyId: null,
    taxCode: null,
    name: null,
    address: null,
    phone: null,
  },

  importer: {
    doiTacId: null,
    name: null,
    address: null,
    countryCode: null,
    phone: null,
    email: null,
  },
};

export const emptyEDAGoodsItem = {
  hsCode: null,
  description: null,
  quantity: 0,
  unit: null,
  unitPrice: 0,
  totalValue: 0,
  origin: null,
};

export const emptyEDAGen2 = {
  invoice: {
    number: null,
    date: null,
    totalValue: null,
    currency: null,
    incoterms: null,
  },

  contract: {
    number: null,
    date: null,
    type: null,
  },

  transport: {
    portOfLoading: null,
    portOfDischarge: null,
    estimatedExportDate: null,
    estimatedImportDate: null,
    description: null,
  },

  containers: [],
  goods: [],
};

export const formatEDAGen1 = (form) => ({
  loai_to_khai: "EDA",
  phan_loai: "EDA",
  ma_cuc_hai_quan: form.customsOffice ?? null,
  ngay_khai_bao: toISO(form.regDate),
  id_cong_ty: form.exporter?.companyId ?? null,
});

export const formatEDAGen2 = (form) => ({
  invoice: {
    number: form.invoice?.number,
    date: toISO(form.invoice?.date),
    totalValue: form.invoice?.totalValue,
    currency: form.invoice?.currency,
    incoterms: form.invoice?.incoterms,
  },

  contract: {
    number: form.contract?.number,
    date: toISO(form.contract?.date),
    type: form.contract?.type,
  },

  transport: {
    portOfLoading: form.transport?.portOfLoading,
    portOfDischarge: form.transport?.portOfDischarge,
    estimatedExportDate: toISO(form.transport?.estimatedExportDate),
    estimatedImportDate: toISO(form.transport?.estimatedImportDate),
    description: form.transport?.description,
  },

  containers: form.containers || [],
  goods: formatEDAGoods(form.goods || []),
});

export const formatEDAGoods = (goods = []) =>
  goods.map((g, index) => ({
    so_dong: index + 1,
    ma_hs: g.hsCode,
    mo_ta_hang_hoa: g.description,
    so_luong: g.quantity,
    don_gia: g.unitPrice,
    tong_gia_tri: g.totalValue,
    ma_quoc_gia: g.origin,
  }));
