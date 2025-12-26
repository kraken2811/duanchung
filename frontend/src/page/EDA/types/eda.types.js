

// ==================== DEFAULT VALUES ====================
export const EDA_DEFAULT = {
  // --- HEADER (Bảng to_khai_hai_quan) ---
  declarationNumber: "", // so_to_khai
  declarationType: "B11", // loai_to_khai
  customsOfficeCode: "", // ma_cuc_hai_quan
  departmentCode: "", // ma_bo_phan_xu_ly
  registrationDate: null, // ngay_khai_bao
  temporaryImportReExportDate: null, // thoi_han_tai_nhap

  // --- ĐỐI TÁC (Bảng cong_ty & doi_tac) ---
  // Người xuất khẩu (Công ty sở tại)
  exporterTaxCode: "",
  exporterName: "",
  exporterAddress: "",
  exporterPhone: "",

  // Người nhập khẩu (Đối tác nước ngoài)
  importerCode: "", // id_doi_tac
  importerName: "",
  importerAddress: "",
  importerCountryCode: "", // ma_quoc_gia

  // Người ủy thác (Nếu có)
  trustorTaxCode: "",
  trustorName: "",

  // --- LOGISTICS (Bảng lo_hang & van_don) ---
  blNumber: "", // so_van_don
  blDate: null,
  transportMethod: "1", // ma_hieu_phuong_thuc_van_chuyen
  vehicleName: "", // ten_phuong_tien
  voyageNumber: "", // so_hieu_chuyen
  departureDate: null, // ngay_hang_di_du_kien (lo_hang)
  loadingPort: "", // cang_xep_hang (lo_hang)
  dischargePort: "", // cang_do_hang (lo_hang)
  warehouseCode: "", // dia_diem_luu_kho
  totalGrossWeight: 0, // tong_trong_luong (container)
  weightUnit: "KGM",
  totalPackages: 0, // so_luong_kien

  // --- THƯƠNG MẠI (Bảng hop_dong & hoa_don) ---
  contractNumber: "", // so_hop_dong
  contractDate: null, // ngay_ky
  contractExpiryDate: null, // ngay_het_han

  invoiceNumber: "", // so_hoa_don
  invoiceDate: null, // ngay_hoa_don
  invoiceType: "A", 
  paymentMethod: "TT", // phuong_thuc_thanh_toan
  incoterms: "FOB", // dieu_kien_giao_hang
  currency: "USD", // ma_ngoai_te
  totalInvoiceValue: 0, // tong_tien

  // --- KHÁC ---
  notes: "", // ghi_chu
  containers: [], // Danh sách container
  goods: [], // Danh sách hàng hóa
};

// Cấu trúc một dòng hàng (Bảng chi_tiet_to_khai)
export const GOOD_ITEM_DEFAULT = {
  id: null,
  itemNo: 0, // so_dong
  hsCode: "", // ma_hs
  description: "", // mo_ta_hang_hoa
  originCountry: "VN", // ma_quoc_gia (Xuất xứ)
  quantity: 0, // so_luong
  unit: "PCE", // don_vi_tinh
  unitPrice: 0, // don_gia
  totalValue: 0, // tong_gia_tri
  
  // Thuế xuất khẩu
  exportTaxRate: 0, // thue_suat
  exportTaxAmount: 0, // tien_thue
};

// Cấu trúc Container (Bảng container)
export const CONTAINER_DEFAULT = {
  id: null,
  containerNo: "", // so_container
  sealNo: "", // so_chi
  containerType: "", // loai_container
  grossWeight: 0, // trong_luong_brut
};

// ==================== CONSTANTS ====================

// Loại hình xuất khẩu
export const EXPORT_TYPES = [
  { value: "B11", label: "B11 - Xuất kinh doanh, XK của DNCX" },
  { value: "B12", label: "B12 - Xuất sau khi đã tạm xuất" },
  { value: "B13", label: "B13 - Xuất khẩu hàng đã nhập khẩu" },
  { value: "E52", label: "E52 - Xuất sản phẩm gia công cho thương nhân nước ngoài" },
  { value: "E62", label: "E62 - Xuất sản phẩm sản xuất xuất khẩu" },
  { value: "E42", label: "E42 - Xuất khẩu của DNCX" },
  { value: "G21", label: "G21 - Tái xuất hàng kinh doanh tạm nhập tái xuất" },
  { value: "H21", label: "H21 - Xuất khẩu hàng khác" },
];

export const TRANSPORT_METHODS = [
  { value: "1", label: "1 - Đường biển" },
  { value: "2", label: "2 - Đường sắt" },
  { value: "3", label: "3 - Đường bộ" },
  { value: "4", label: "4 - Hàng không" },
];

export const INCOTERMS = [
  { value: "FOB", label: "FOB - Free On Board" },
  { value: "CIF", label: "CIF - Cost, Insurance and Freight" },
  { value: "EXW", label: "EXW - Ex Works" },
  { value: "DAP", label: "DAP - Delivered At Place" },
];

export const CURRENCIES = [
  { value: "USD", label: "USD - Đô la Mỹ" },
  { value: "VND", label: "VND - Việt Nam Đồng" },
  { value: "EUR", label: "EUR - Euro" },
];