export const IDE_DEFAULT = {
  // Khu vực 1: Thông tin tờ khai (Read-only)
  declarationNumber: "",
  regDate: null,
  customsCode: "",
  processDept: "00 - Đội thủ tục hàng hóa",
  typeCode: "",
  
  // Khu vực 2: Nội dung yêu cầu hủy (Editable)
  reasonCode: undefined, // Dropdown
  reasonNote: "",        // Textarea
  
  // Khu vực 3: Đính kèm
  attachments: [],
  
  // Khu vực 4: Trạng thái
  status: "Chưa khai báo",
  receptionNumber: "", // Số tiếp nhận
};