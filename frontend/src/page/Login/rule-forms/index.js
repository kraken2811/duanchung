const AUTH_RULES = {
  taxCode: {
    required: "Vui lòng nhập mã số thuế",
    minLength: { value: 10, message: "Mã số thuế không hợp lệ" },
  },
  username: {
    required: "Vui lòng nhập tên đăng nhập",
  },
  password: {
    required: "Vui lòng nhập mật khẩu",
    minLength: { value: 6, message: "Mật khẩu tối thiểu 6 ký tự" },
  },
};

export default AUTH_RULES;
