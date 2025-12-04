export const CONTRACT_DEFAULT = {
  // Thông tin chung
  contractNumber: "",
  signedDate: null,
  expirationDate: null,
  extensionDate: null, // Ngày gia hạn
  
  // Đối tác thuê gia công
  partner: {
    code: "", // Mã đối tác
    name: "", // Tên đối tác
    countryCode: "", // Mã nước
    address: ""
  },

  // Thông tin thanh toán
  currency: "USD",
  paymentMethod: "TT",
  
  // Thông tin khác
  deliveryCondition: "", // Điều kiện giao hàng
  notes: "",
};

// Cấu trúc dòng Nguyên phụ liệu (NPL)
export const MATERIAL_DEFAULT = {
  id: null,
  index: 0,
  code: "", // Mã NPL
  name: "", // Tên NPL
  hsCode: "",
  origin: "", // Nước xuất xứ
  unit: "PCE",
  unitPrice: 0,
  quantity: 0,
  note: ""
};

// Cấu trúc dòng Sản phẩm (SP)
export const PRODUCT_DEFAULT = {
  id: null,
  index: 0,
  code: "", // Mã SP
  name: "", // Tên SP
  hsCode: "",
  unit: "PCE",
  unitPrice: 0, // Đơn giá gia công
  exportTaxRate: 0,
  note: ""
};

// Cấu trúc Thiết bị (TB)
export const EQUIPMENT_DEFAULT = {
  id: null,
  index: 0,
  code: "",
  name: "",
  origin: "",
  status: "New", // Tình trạng
  quantity: 0,
  unit: "SET"
};