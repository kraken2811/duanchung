import { FiCheckCircle, FiAlertCircle, FiClock, FiXCircle } from "react-icons/fi";

// Lấy thông tin hiển thị cho Trạng thái bản tin
export const getStatusInfo = (status) => {
  switch (status) {
    case "SUCCESS":
      return { color: "#52c41a", icon: <FiCheckCircle />, text: "Thành công" };
    case "ERROR":
      return { color: "#f5222d", icon: <FiXCircle />, text: "Lỗi" };
    case "INFO":
      return { color: "#1890ff", icon: <FiAlertCircle />, text: "Thông tin" };
    default:
      return { color: "#faad14", icon: <FiClock />, text: "Đang chờ" };
  }
};

// Lấy thông tin màu sắc cho Phân luồng (Luồng Xanh/Vàng/Đỏ)
export const getRoutingChannelInfo = (channel) => {
  switch (channel) {
    case "GREEN":
      return {
        color: "#f6ffed",     // Background xanh nhạt
        borderColor: "#b7eb8f",
        textColor: "#389e0d",
        label: "LUỒNG XANH (1)",
        description: "Miễn kiểm tra chi tiết hồ sơ, miễn kiểm tra thực tế hàng hóa."
      };
    case "YELLOW":
      return {
        color: "#fffbe6",     // Background vàng nhạt
        borderColor: "#ffe58f",
        textColor: "#d48806",
        label: "LUỒNG VÀNG (2)",
        description: "Kiểm tra chi tiết hồ sơ, miễn kiểm tra thực tế hàng hóa."
      };
    case "RED":
      return {
        color: "#fff1f0",     // Background đỏ nhạt
        borderColor: "#ffa39c",
        textColor: "#cf1322",
        label: "LUỒNG ĐỎ (3)",
        description: "Kiểm tra chi tiết hồ sơ và kiểm tra thực tế hàng hóa."
      };
    default:
      return {
        color: "#fafafa",
        borderColor: "#d9d9d9",
        textColor: "#595959",
        label: "CHƯA PHÂN LUỒNG",
        description: "Đang chờ kết quả từ hệ thống..."
      };
  }
};

// Format tiền tệ VNĐ
export const formatCurrency = (value) => {
  if (!value) return "0";
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};