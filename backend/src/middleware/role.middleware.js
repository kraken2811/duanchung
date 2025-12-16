module.exports = function requireRole(roles = []) {
  return (req, res, next) => {
    if (!req.user || !req.user.vai_tro) {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }

    // roles ví dụ: ['ADMIN', 'STAFF']
    if (!roles.includes(req.user.vai_tro)) {
      return res.status(403).json({ message: 'Bạn không đủ quyền' });
    }

    next();
  };
};
