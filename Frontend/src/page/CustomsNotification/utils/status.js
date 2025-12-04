// Format tiền tệ VNĐ
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return "0";
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

// Lấy tiêu đề hiển thị đầu trang dựa trên mã Code
export const getPageTitle = (code) => {
  switch (code) {
    case "TAX": return "THÔNG BÁO THUẾ XUẤT NHẬP KHẨU (TAX NOTICE)";
    case "RCC": return "KẾT QUẢ PHÂN LUỒNG (ROUTING RESULT)";
    case "HYS": return "PHẢN HỒI TỪ HỆ THỐNG (SYSTEM RESPONSE)";
    case "ERR": return "THÔNG BÁO LỖI (ERROR REPORT)";
    default: return "CHI TIẾT THÔNG ĐIỆP HẢI QUAN";
  }
};

// Cấu hình hiển thị cho Phân luồng (Màu sắc & Label)
export const getChannelConfig = (channel) => {
  switch (channel) {
    case "GREEN":
      return { 
        text: "LUỒNG XANH (1)", 
        color: "success", 
        desc: "Miễn kiểm tra chi tiết hồ sơ, miễn kiểm tra thực tế hàng hóa." 
      };
    case "YELLOW":
      return { 
        text: "LUỒNG VÀNG (2)", 
        color: "warning", 
        desc: "Kiểm tra chi tiết hồ sơ, miễn kiểm tra thực tế hàng hóa." 
      };
    case "RED":
      return { 
        text: "LUỒNG ĐỎ (3)", 
        color: "error", 
        desc: "Kiểm tra chi tiết hồ sơ và kiểm tra thực tế hàng hóa." 
      };
    default:
      return { 
        text: "CHƯA PHÂN LUỒNG", 
        color: "default", 
        desc: "Đang chờ kết quả..." 
      };
  }
};