export const CANCELLATION_REASONS = [
  { code: "N01", label: "N01 - Khai trùng thông tin tờ khai" },
  { code: "N02", label: "N02 - Khai sai các chỉ tiêu thông tin không được sửa" },
  { code: "N03", label: "N03 - Hàng hóa không nhập khẩu/xuất khẩu" },
  { code: "N04", label: "N04 - Đưa nhầm hàng vào kho CFS/Ngoại quan" },
  { code: "N09", label: "N09 - Lý do khác (Theo đề nghị của DN)" },
];

export const formatIDEStatus = (status) => {
    switch(status) {
        case 'SUCCESS': return { color: 'green', text: 'Hải quan chấp nhận hủy' };
        case 'SENT': return { color: 'blue', text: 'Đã gửi yêu cầu (Chờ phản hồi)' };
        default: return { color: '#faad14', text: 'Chưa khai báo' };
    }
};