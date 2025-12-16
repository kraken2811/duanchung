const rateLimit = require('express-rate-limit');

// Login: rất nhạy cảm → limit chặt
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 10, // tối đa 10 lần / IP
  message: {
    message: 'Quá nhiều lần đăng nhập, vui lòng thử lại sau',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Refresh token: vừa phải
exports.refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    message: 'Quá nhiều yêu cầu refresh token',
  },
});

// Logout: nhẹ
exports.logoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});
