export const MATERIAL_DEFAULT = {
  id: null,
  code: "",             // Mã NPL
  name: "",             // Tên NPL
  nameEn: "",           // Tên tiếng Anh
  unit: "PCE",          // Đơn vị tính
  hsCode: "",           // Mã HS
  taxRate: 0,           // Thuế suất NK
  originCountry: "",    // Mã nước/Xuất xứ
  unitPrice: 0,         // Đơn giá dự kiến
  source: "import",     // Nguồn gốc: import | domestic
  notes: "",            // Ghi chú
  isActive: true,       // Theo dõi
  
  // Thông tin phụ
  weight: 0,            // Trọng lượng
};

// Mock dữ liệu danh sách đơn vị tính
export const UNIT_OPTIONS = [
  { value: "PCE", label: "Cái (PCE)" },
  { value: "KGM", label: "Kilogram (KGM)" },
  { value: "MTR", label: "Mét (MTR)" },
  { value: "SET", label: "Bộ (SET)" },
  { value: "PR", label: "Đôi (PR)" },
];