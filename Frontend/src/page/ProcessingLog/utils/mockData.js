// src/page/ProcessingLog/utils/mockData.js

export const LOG_DATA = [
  {
    id: 1,
    stt: 1,
    code: "IDA",
    name: "Đăng ký mới tờ khai nhập khẩu",
    refNo: "100003456789",
    date: "27/11/2025 09:30:15",
    status: "SUCCESS",
    detail: {
      type: "SENT",
      content: "Đã gửi bản tin đăng ký tờ khai. Chờ phản hồi..."
    }
  },
  {
    id: 2,
    stt: 2,
    code: "HYS", // Bản tin phản hồi hệ thống
    name: "Tiếp nhận thông tin tờ khai (Cấp số)",
    refNo: "1027429999",
    date: "27/11/2025 09:30:45",
    status: "SUCCESS",
    detail: {
      type: "INFO",
      declNo: "1027429999",
      regDate: "27/11/2025",
      customs: "02CI - Chi cục HQ CK Cảng HP KV1"
    }
  },
  {
    id: 3,
    stt: 3,
    code: "TAX", // Bản tin thuế
    name: "Thông báo thuế xuất nhập khẩu",
    refNo: "1027429999",
    date: "27/11/2025 09:31:00",
    status: "INFO",
    detail: {
      type: "TAX",
      totalTax: 154000000,
      vat: 100000000,
      importTax: 54000000
    }
  },
  {
    id: 4,
    stt: 4,
    code: "IDB",
    name: "Khai báo nhập khẩu chính thức",
    refNo: "1027429999",
    date: "28/11/2025 10:15:00",
    status: "SUCCESS",
    detail: {
      type: "SENT",
      content: "Đã gửi yêu cầu khai báo chính thức."
    }
  },
  {
    id: 5,
    stt: 5,
    code: "RCC", // Kết quả phân luồng
    name: "Kết quả phân luồng & Thông quan",
    refNo: "1027429999",
    date: "28/11/2025 10:16:20",
    status: "SUCCESS",
    detail: {
      type: "ROUTING",
      channel: "GREEN", // GREEN, YELLOW, RED
      message: "Thông quan hàng hóa. Hàng qua khu vực giám sát."
    }
  }
];