export const IDA_DEFAULT = {
  // Thông tin đầu tờ khai
  declarationNumber: "",
  type: "",
  customsOffice: "",
  department: "",
  regDate: null,

  // Người nhập khẩu
  importer: {
    taxCode: "",
    name: "",
    address: "",
    postalCode: "",
    phone: "",
  },

  // Người xuất khẩu
  exporter: {
    code: "",
    name: "",
    address: "",
    postalCode: "",
    countryCode: "",
  },

  // Đại lý hải quan (nếu có)
  agent: {
    taxCode: "",
    name: "",
  },

  // Vận đơn
  billOfLading: {
    number: "",
    date: null,
    packages: 0,
    packageType: "",
    grossWeight: 0,
  },

  // Phương tiện vận chuyển
  transport: {
    method: "",
    vehicle: "",
    voyageNumber: "",
    arrivalDate: null,
    portOfLoading: "",
    portOfDischarge: "",
  },

  // Kho bãi
  warehouse: {
    code: "",
    name: "",
  },

  // Hóa đơn thương mại
  invoice: {
    type: "A",
    number: "",
    date: null,
    paymentMethod: "",
    incoterms: "",
    currency: "USD",
    totalValue: 0,
  },

  // Trị giá tính thuế
  customsValue: {
    method: "1",
    freight: 0,
    insurance: 0,
    adjustments: 0,
  },

  // Thuế
  tax: {
    payer: "1",
    paymentDeadline: "",
    guarantee: {
      bankCode: "",
      year: "",
      symbol: "",
      number: "",
    },
  },

  // Hợp đồng
  contract: {
    number: "",
    date: null,
  },

  // Ghi chú
  notes: "",

  // Danh sách hàng hóa
  goods: [],
};

// Cấu trúc một dòng hàng hóa
export const GOODS_ITEM_DEFAULT = {
  id: null,
  index: 0,
  description: "",
  hsCode: "",
  managementCode: "",
  origin: "",
  quantity: 0,
  unit: "",
  unitPrice: 0,
  totalValue: 0,
  
  // Thuế
  importDuty: {
    schedule: "",
    rate: 0,
    amount: 0,
    exemptionCode: "",
  },
  vat: {
    rate: 0,
    amount: 0,
  },
  exciseTax: {
    rate: 0,
    amount: 0,
  },
  environmentTax: {
    rate: 0,
    amount: 0,
  },
};