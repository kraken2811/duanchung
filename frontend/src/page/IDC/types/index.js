// Cấu trúc dữ liệu mặc định cho IDC
export const IDC_DEFAULT = {
  // Số tờ khai gốc cần sửa
  originalDeclarationNumber: "",

  // Thông tin sửa đổi (Phần quan trọng nhất của IDC)
  modification: {
    type: "", // A, B, C, D, E
    requestDate: null,
    inspectionType: "",
    reason: "", // Lý do sửa đổi (BẮT BUỘC)
    documentNumber: "", // Số văn bản xin sửa
    documentDate: null,
  },

  // Các trường được phép sửa trong Thông tin chung 1
  importer: {
    name: "",
    address: "",
    phone: "",
  },

  // Các trường được phép sửa trong Invoice
  invoice: {
    number: "",
    date: null,
    totalValue: 0,
  },

  // Danh sách hàng hóa có thay đổi
  modifiedGoods: [],

  // Lịch sử thay đổi
  changeLog: [],
};

// Cấu trúc một dòng hàng hóa bị sửa đổi
export const MODIFIED_GOODS_ITEM = {
  id: null,
  index: 0,
  
  // Giá trị GỐC
  original: {
    description: "",
    hsCode: "",
    quantity: 0,
    unitPrice: 0,
    totalValue: 0,
  },

  // Giá trị MỚI (sau sửa đổi)
  modified: {
    description: "",
    hsCode: "",
    quantity: 0,
    unitPrice: 0,
    totalValue: 0,
  },

  // Lý do sửa đổi dòng hàng này
  modificationReason: "",

  // Các flag đánh dấu thay đổi
  flags: {
    descriptionModified: false,
    hsCodeModified: false,
    quantityModified: false,
    priceModified: false,
    valueModified: false,
  },
};

// Loại sửa đổi
export const MODIFICATION_TYPES = [
  {
    value: "A",
    label: "A - Sửa đổi thông tin người khai",
    description: "Sửa tên, địa chỉ, thông tin liên hệ của người nhập khẩu",
  },
  {
    value: "B",
    label: "B - Sửa đổi thông tin hàng hóa",
    description: "Sửa mô tả, HS Code, số lượng, đơn giá hàng hóa",
  },
  {
    value: "C",
    label: "C - Sửa đổi trị giá hải quan",
    description: "Sửa giá trị tính thuế, phí vận chuyển, bảo hiểm",
  },
  {
    value: "D",
    label: "D - Sửa đổi thuế suất/số tiền thuế",
    description: "Sửa thuế suất, số tiền thuế phải nộp",
  },
  {
    value: "E",
    label: "E - Sửa đổi chứng từ đính kèm",
    description: "Bổ sung hoặc thay thế chứng từ kèm theo tờ khai",
  },
];

// Quy tắc về trường nào được phép sửa
export const IDC_EDITABLE_RULES = {
  // KHÔNG được phép sửa
  locked: [
    "declarationNumber",
    "type",
    "customsOffice",
    "regDate",
    "importer.taxCode",
  ],

  // Được phép sửa
  editable: [
    "importer.name",
    "importer.address",
    "importer.phone",
    "invoice.number",
    "invoice.date",
    "invoice.totalValue",
    "goods[].description",
    "goods[].hsCode",
    "goods[].quantity",
    "goods[].unitPrice",
  ],
};