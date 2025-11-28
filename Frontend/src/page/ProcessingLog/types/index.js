// Định nghĩa cấu trúc chuẩn của một dòng nhật ký
export const LOG_ENTRY_DEFAULT = {
  id: null,
  code: "",         // Mã bản tin (IDA, IDB, RCC, TAX...)
  name: "",         // Tên nghiệp vụ
  refNo: "",        // Số tham chiếu/Số tờ khai
  processDate: null,// Thời gian xử lý
  status: "PENDING",// SUCCESS, ERROR, INFO, PENDING
  
  // Payload chi tiết (Dữ liệu trả về từ HQ)
  detail: {
    type: "TEXT",   // TEXT, TAX, ROUTING, ERROR
    content: "",    // Nội dung text thông thường
    
    // Nếu type = TAX
    importTax: 0,
    vatTax: 0,
    totalTax: 0,
    
    // Nếu type = ROUTING
    channel: "GREEN", // GREEN, YELLOW, RED
    message: "",
  }
};

// Enum các loại bản tin phổ biến
export const MESSAGE_TYPES = {
  IDA: "Đăng ký mới tờ khai (IDA)",
  IDB: "Khai báo nhập khẩu chính thức (IDB)",
  IDE: "Hủy tờ khai (IDE)",
  IDC: "Sửa đổi bổ sung (IDC)",
  TAX: "Thông báo thuế (TAX)",
  RCC: "Kết quả phân luồng (RCC)",
  HYS: "Cấp số tờ khai & Phản hồi hệ thống",
};