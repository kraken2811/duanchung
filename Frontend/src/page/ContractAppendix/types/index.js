// Data Model cho Phụ lục Hợp đồng Gia công
export const CONTRACT_APPENDIX_DEFAULT = {
  // Thông tin chung
  contractNumber: "",       // Số hợp đồng gốc
  appendixNumber: "",       // Số phụ lục (Bắt buộc)
  signedDate: null,         // Ngày ký
  effectiveDate: null,      // Ngày hiệu lực
  expirationDate: null,     // Ngày hết hạn (nếu gia hạn)
  notes: "",                // Ghi chú

  // Danh sách chi tiết
  materials: [],            // Danh sách Nguyên phụ liệu (NPL)
  products: [],             // Danh sách Sản phẩm (SP)
  equipments: [],           // Danh sách Thiết bị (TB)
};

// Cấu trúc dòng Nguyên phụ liệu (Tab 1)
export const MATERIAL_ITEM_DEFAULT = {
  id: null,
  code: "",                 // Mã NPL (P.Code)
  name: "",                 // Tên NPL
  hsCode: "",               // Mã HS
  origin: "",               // Nước xuất xứ
  unit: "",                 // Đơn vị tính
  quantity: 0,              // Số lượng dự kiến (nếu có)
  note: ""
};

// Cấu trúc dòng Sản phẩm (Tab 2)
export const PRODUCT_ITEM_DEFAULT = {
  id: null,
  code: "",                 // Mã SP
  name: "",                 // Tên SP
  hsCode: "",               // Mã HS
  unit: "",                 // Đơn vị tính
  processingPrice: 0,       // Đơn giá gia công
  currency: "USD",          // Nguyên tệ
  note: ""
};

// Cấu trúc dòng Thiết bị (Tab 3)
export const EQUIPMENT_ITEM_DEFAULT = {
  id: null,
  code: "",                 // Mã TB
  name: "",                 // Tên TB
  hsCode: "",               // Mã HS
  origin: "",               // Xuất xứ
  unit: "",                 // ĐVT
  status: "NEW",            // Tình trạng (Mới/Cũ)
  note: ""
};