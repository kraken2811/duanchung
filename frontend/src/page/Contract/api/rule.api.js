export const CONTRACT_RULES = {
  contractNumber: { 
    required: "Số hợp đồng là bắt buộc",
    pattern: {
      value: /^[A-Za-z0-9\-\/]+$/,
      message: "Số HĐ không được chứa ký tự đặc biệt"
    }
  },
  partnerName: { required: "Tên đối tác thuê gia công bắt buộc" },
  partnerCountry: { required: "Mã nước đối tác bắt buộc" },
  signedDate: { required: "Ngày ký bắt buộc" },
  expirationDate: { required: "Ngày hết hạn bắt buộc" },
};