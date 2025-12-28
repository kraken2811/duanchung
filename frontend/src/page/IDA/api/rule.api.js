export const IDA_RULES = {
  // Thông tin đầu tờ khai
  declarationNumber: { 
    required: "Số tờ khai bắt buộc" 
  },
  type: { 
    required: "Loại hình bắt buộc",
    pattern: {
      value: /^[A-Z]\d{2}$/,
      message: "Mã loại hình phải theo định dạng A11, A12, B01..."
    }
  },
  customsOffice: { 
    required: "Cơ quan hải quan bắt buộc" 
  },
  regDate: { 
    required: "Ngày đăng ký bắt buộc" 
  },

  // Người nhập khẩu
  "importer.taxCode": { 
    required: "Mã số thuế người nhập khẩu bắt buộc",
    pattern: {
      value: /^\d{10}(-\d{3})?$/,
      message: "MST phải có 10 số hoặc 10-3 số"
    }
  },
  "importer.name": { 
    required: "Tên người nhập khẩu bắt buộc" 
  },

  // Người xuất khẩu
  "exporter.name": { 
    required: "Tên người xuất khẩu bắt buộc" 
  },
  "exporter.countryCode": { 
    required: "Mã nước xuất khẩu bắt buộc",
    pattern: {
      value: /^[A-Z]{2}$/,
      message: "Mã nước phải có 2 chữ cái theo chuẩn ISO 3166"
    }
  },

  // Vận đơn
  "billOfLading.number": { 
    required: "Số vận đơn bắt buộc" 
  },

  // Hóa đơn
  "invoice.number": { 
    required: "Số hóa đơn bắt buộc" 
  },
  "invoice.incoterms": { 
    required: "Điều kiện giá (Incoterms) bắt buộc" 
  },

  // Hàng hóa
  goods: {
    validate: (value) => {
      if (!value || value.length === 0) {
        return "Phải có ít nhất 1 dòng hàng hóa";
      }
      return true;
    }
  }
};

// Danh sách mã loại hình thông dụng
export const DECLARATION_TYPES = [
  { value: "A11", label: "A11 - NK Thông thường" },
  { value: "A12", label: "A12 - NK Tạm nhập tái xuất" },
  { value: "A13", label: "A13 - NK Gia công" },
  { value: "A14", label: "A14 - NK Hoàn lại" },
  { value: "A21", label: "A21 - NK Hàng viện trợ" },
];

// Phương thức vận chuyển
export const TRANSPORT_METHODS = [
  { value: "1", label: "Đường biển" },
  { value: "2", label: "Đường sắt" },
  { value: "3", label: "Đường bộ" },
  { value: "4", label: "Hàng không" },
  { value: "5", label: "Bưu chính" },
];

// Điều kiện giá
export const INCOTERMS = [
  { value: "CIF", label: "CIF - Cost, Insurance and Freight" },
  { value: "FOB", label: "FOB - Free On Board" },
  { value: "CFR", label: "CFR - Cost and Freight" },
  { value: "EXW", label: "EXW - Ex Works" },
  { value: "FCA", label: "FCA - Free Carrier" },
  { value: "CPT", label: "CPT - Carriage Paid To" },
  { value: "CIP", label: "CIP - Carriage and Insurance Paid To" },
  { value: "DAP", label: "DAP - Delivered At Place" },
  { value: "DPU", label: "DPU - Delivered at Place Unloaded" },
  { value: "DDP", label: "DDP - Delivered Duty Paid" },
];

// Đơn vị tính
export const UNITS = [
  { value: "PCE", label: "Cái (Pieces)" },
  { value: "KGM", label: "Kilogram" },
  { value: "TNE", label: "Tấn" },
  { value: "SET", label: "Bộ" },
  { value: "MTR", label: "Mét" },
  { value: "LTR", label: "Lít" },
  { value: "MTK", label: "Mét vuông" },
  { value: "MTQ", label: "Mét khối" },
];

// Loại kiện
export const PACKAGE_TYPES = [
  { value: "CT", label: "Thùng carton" },
  { value: "PL", label: "Pallet" },
  { value: "BG", label: "Bao" },
  { value: "PK", label: "Gói" },
  { value: "CS", label: "Hộp" },
];

// Phương thức thanh toán
export const PAYMENT_METHODS = [
  { value: "TT", label: "TT - Telegraphic Transfer (Chuyển khoản)" },
  { value: "LC", label: "LC - Letter of Credit (Thư tín dụng)" },
  { value: "DP", label: "DP - Documents against Payment" },
  { value: "DA", label: "DA - Documents against Acceptance" },
  { value: "OA", label: "OA - Open Account" },
  { value: "KC", label: "KC - Khác" },
];

// Đồng tiền
export const CURRENCIES = [
  { value: "USD", label: "USD - Đô la Mỹ" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "JPY", label: "JPY - Yên Nhật" },
  { value: "CNY", label: "CNY - Nhân dân tệ" },
  { value: "KRW", label: "KRW - Won Hàn Quốc" },
  { value: "VND", label: "VND - Việt Nam Đồng" },
];