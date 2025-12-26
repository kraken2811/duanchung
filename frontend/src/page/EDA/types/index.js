// src/types/eda.js

export const EDA_DEFAULT = {
  // 1. Thông tin đầu tờ khai
  declarationNumber: "",
  type: "B11", // Mặc định loại hình xuất phổ biến
  customsOffice: "",
  regDate: null,

  // 2. Người xuất khẩu (Là doanh nghiệp VN)
  exporter: {
    taxCode: "",
    name: "",
    address: "",
    phone: "",
    postalCode: "",
  },

  // 3. Người nhập khẩu (Là đối tác nước ngoài)
  importer: {
    name: "",
    address: "",
    countryCode: "", // Mã nước đến
  },

  // 4. Ủy thác xuất khẩu (Nếu có)
  trustor: {
    taxCode: "",
    name: "",
  },

  // 5. Vận đơn & Vận chuyển
  transport: {
    billOfLading: "",      // Số vận đơn
    bookingNote: "",       // Số Booking (Quan trọng với xuất khẩu)
    date: null,
    totalPackages: 0,
    packageUnit: "CT",     // Loại kiện
    grossWeight: 0,        // Trọng lượng
    weightUnit: "KGM",
    loadingPort: "",       // Cảng xếp hàng (VN)
    dischargePort: "",     // Cảng dỡ hàng (Nước ngoài)
    vehicleName: "",
    departureDate: null,   // Ngày hàng đi
    warehouseCode: "",     // Địa điểm lưu kho chờ xuất
  },

  // 6. Hóa đơn & Trị giá
  invoice: {
    number: "",
    date: null,
    term: "FOB",           // Incoterms
    currency: "USD",
    totalValue: 0,
    paymentMethod: "TT",
  },

  // 7. Hợp đồng
  contract: {
    number: "",
    date: null,
    expiryDate: null,
  },

  // 8. Thuế (Xuất khẩu thường ít thuế hơn nhập khẩu)
  tax: {
    payer: "1", // 1: Người xuất khẩu
  },

  notes: "",
  
  // 9. Danh sách hàng
  goods: [],
};

// Cấu trúc một dòng hàng xuất khẩu
export const GOODS_EXPORT_DEFAULT = {
  id: null,
  index: 0,
  description: "",
  hsCode: "",
  origin: "VN", // Mặc định hàng xuất xứ Việt Nam
  quantity: 0,
  unit: "PCE",
  unitPrice: 0,
  totalValue: 0,
  
  // Thuế xuất khẩu
  exportDuty: {
    rate: 0,
    amount: 0,
  },
};