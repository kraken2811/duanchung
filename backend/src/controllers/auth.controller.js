const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// LOGIN
exports.login = async (req, res) => {
  try {
    const { ten_dang_nhap, mat_khau } = req.body;

    const user = await prisma.nguoi_dung.findUnique({
      where: { ten_dang_nhap },
      include: { vai_tro: true, cong_ty: true },
    });

    if (!user || !user.kich_hoat) {
      return res.status(401).json({ message: 'Tài khoản không tồn tại hoặc bị khóa' });
    }

    const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isMatch) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }

    const accessToken = jwt.sign(
      {
        sub: user.id_nguoi_dung,
        vai_tro: user.vai_tro?.ma_vai_tro,
        id_cong_ty: user.id_cong_ty,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
    );

    const refreshToken = jwt.sign(
      { sub: user.id_nguoi_dung },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_DAYS}d` }
    );

    await prisma.refresh_token.create({
      data: {
        token: refreshToken,
        id_nguoi_dung: user.id_nguoi_dung,
        expires_at: new Date(
          Date.now() +
            Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) * 24 * 60 * 60 * 1000
        ),
      },
    });

    // 👉 set refresh token bằng HttpOnly cookie
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false, // true nếu HTTPS
      maxAge:
        Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) *
        24 *
        60 *
        60 *
        1000,
    });

    return res.json({
      accessToken,
      user: {
        id_nguoi_dung: user.id_nguoi_dung,
        ho_ten: user.ho_ten,
        vai_tro: user.vai_tro?.ma_vai_tro,
        cong_ty: user.cong_ty?.ten_cong_ty,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// REFRESH TOKEN (rotate token)
exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Thiếu refresh token' });
    }

    const stored = await prisma.refresh_token.findUnique({
      where: { token: refreshToken },
    });

    if (!stored || stored.is_revoked || stored.expires_at < new Date()) {
      return res.status(401).json({ message: 'Refresh token không hợp lệ' });
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // rotate token
    await prisma.refresh_token.update({
      where: { token: refreshToken },
      data: { is_revoked: true },
    });

    const newRefreshToken = jwt.sign(
      { sub: payload.sub },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_DAYS}d` }
    );

    await prisma.refresh_token.create({
      data: {
        token: newRefreshToken,
        id_nguoi_dung: payload.sub,
        expires_at: new Date(
          Date.now() +
            Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) *
              24 *
              60 *
              60 *
              1000
        ),
      },
    });

    const newAccessToken = jwt.sign(
      { sub: payload.sub },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
    );

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge:
        Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) *
        24 *
        60 *
        60 *
        1000,
    });

    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(401).json({ message: 'Refresh token hết hạn' });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (refreshToken) {
    await prisma.refresh_token.updateMany({
      where: { token: refreshToken },
      data: { is_revoked: true },
    });
  }

  res.clearCookie('refresh_token');
  res.json({ message: 'Đăng xuất thành công' });
};
