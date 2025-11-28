export const getChannelConfig = (channel) => {
  const configs = {
    green: {
      color: "#52c41a",
      text: "Luồng xanh",
      description: "Thông quan nhanh",
    },
    yellow: {
      color: "#faad14",
      text: "Luồng vàng",
      description: "Kiểm tra hồ sơ",
    },
    red: {
      color: "#ff4d4f",
      text: "Luồng đỏ",
      description: "Kiểm tra thực tế",
    },
    none: {
      color: "#d9d9d9",
      text: "Chưa phân luồng",
      description: "Chưa có kết quả",
    },
  };
  return configs[channel] || configs.none;
};

export const getStatusConfig = (status) => {
  const configs = {
    draft: { text: "Bản nháp", color: "default" },
    pending: { text: "Chờ thông quan", color: "warning" },
    completed: { text: "Đã thông quan", color: "success" },
    inspection: { text: "Đang kiểm tra", color: "processing" },
    cancelled: { text: "Đã hủy", color: "error" },
    requires_revision: { text: "Yêu cầu sửa", color: "error" },
  };
  return configs[status] || configs.draft;
};

export const formatCurrency = (value, currency = "USD") => {
  return `${value.toLocaleString("en-US")} ${currency}`;
};

export const formatDate = (date, format = "DD/MM/YYYY") => {
  // Sử dụng dayjs hoặc moment để format
  return date;
};