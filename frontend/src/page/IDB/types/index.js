export const IDB_DEFAULT = {
  // Thông tin định danh (Lấy từ IDA)
  declarationNumber: "", // Số tờ khai đã cấp
  typeGroup: "",
  typeCode: "",
  typeName: "",
  customsCode: "",
  regDate: null,
  
  // Thông tin Thuế (IDB focus)
  taxPayer: "1",
  taxPaymentMode: "D", // Nộp ngay
  taxTotal: 0,         // Tổng thuế phải nộp
  taxImport: 0,
  taxVAT: 0,
  
  // Các nhóm thông tin khác (Read-only từ IDA)
  importerCode: "", importerName: "",
  exporterName: "",
  billOfLadingNo: "",
  invoiceNo: "",
  
  // Danh sách hàng
  goods: [],
};