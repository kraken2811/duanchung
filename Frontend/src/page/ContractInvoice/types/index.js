// Data Model cho Hóa đơn Thương mại (Gia công/SXXK)
export const INVOICE_DEFAULT = {
  // Nhóm 1: Thông tin chung
  contractNumber: "",
  invoiceNumber: "",
  invoiceDate: null,
  type: "IMPORT", // IMPORT (Nhập khẩu) hoặc EXPORT (Xuất khẩu)

  // Nhóm 2: Đối tác & Thanh toán
  partnerCode: "",
  partnerName: "",
  incoterm: "",
  currency: "USD",
  paymentMethod: "TTR",
  totalAmount: 0,

  // Danh sách hàng
  items: []
};

// Data Model cho dòng hàng
export const INVOICE_ITEM_DEFAULT = {
  id: null,
  stt: 0,
  code: "",         // Mã hàng
  name: "",         // Tên hàng
  unit: "",         // ĐVT
  currency: "USD",  // Nguyên tệ
  quantity: 0,
  unitPrice: 0,
  totalAmount: 0,
  origin: ""
};