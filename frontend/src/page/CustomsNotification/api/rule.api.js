export const NOTIFICATION_RULES = {
  // Kiểm tra ID hợp lệ
  id: {
    required: "Không tìm thấy mã thông báo",
    pattern: {
      value: /^[0-9a-fA-F-]+$/, // Ví dụ: UUID hoặc số
      message: "Mã thông báo không hợp lệ"
    }
  }
};