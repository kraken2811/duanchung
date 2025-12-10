// Định nghĩa cấu trúc mặc định của một thông báo
export const NOTIFICATION_DEFAULT = {
  id: null,
  refNo: "",          // Số tờ khai / Số tham chiếu
  customsCode: "",    // Mã hải quan
  processDate: null,  // Ngày xử lý
  code: "UNK",        // Mã bản tin (TAX, RCC,...)
  name: "",           // Tên bản tin
  
  // Dữ liệu chi tiết bên trong (Payload)
  detail: {
    content: "",      // Nội dung text
    taxes: [],        // Mảng thuế (nếu có)
    totalTax: 0,
    channel: "",      // Luồng (nếu có)
    message: ""       // Thông điệp kèm theo
  }
};