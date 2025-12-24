const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// LOGIN
exports.login = async (req, res) => {
  try {
    const { ma_so_thue, ten_dang_nhap, mat_khau } = req.body;
    const congTy = await prisma.cong_ty.findUnique({
      where: { ma_so_thue },
    });

    if (!congTy) {
      return res.status(401).json({
        message: 'Mã số thuế công ty không tồn tại',
      });
    }
    const user = await prisma.nguoi_dung.findFirst({
      where: {
        ten_dang_nhap,
        id_cong_ty: congTy.id_cong_ty,
      },
      include: {
        vai_tro: true,
        cong_ty: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Tài khoản không tồn tại trong công ty này',
      });
    }

    if (!user.kich_hoat) {
      return res.status(401).json({
        message: 'Tài khoản đã bị khóa',
      });
    }

    // 3️⃣ So mật khẩu
    const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isMatch) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }

    // 4️⃣ Sinh access token
    const accessToken = jwt.sign(
      {
        sub: user.id_nguoi_dung,
        vai_tro: user.vai_tro?.ma_vai_tro,
        id_cong_ty: user.id_cong_ty,
        ma_so_thue: congTy.ma_so_thue,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES },
    );

    // 5️⃣ Sinh refresh token
    const refreshToken = jwt.sign(
      { sub: user.id_nguoi_dung },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_DAYS}d` },
    );

    await prisma.refresh_token.create({
      data: {
        token: refreshToken,
        id_nguoi_dung: user.id_nguoi_dung,
        expires_at: new Date(
          Date.now() +
            Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) *
              24 *
              60 *
              60 *
              1000,
        ),
      },
    });

    // 6️⃣ Set cookie
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false, // bật true khi HTTPS
      maxAge:
        Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS) *
        24 *
        60 *
        60 *
        1000,
    });

    // 7️⃣ Trả kết quả
    return res.json({
      accessToken,
      user: {
        id_nguoi_dung: user.id_nguoi_dung,
        ho_ten: user.ho_ten,
        vai_tro: user.vai_tro?.ma_vai_tro,
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
exports.checkMst = async (req, res) => {
  const { ma_so_thue } = req.body;

  const congTy = await prisma.cong_ty.findUnique({
    where: { ma_so_thue },
    select: { ten_cong_ty: true },
  });

  if (!congTy) {
    return res.status(404).json({
      message: "Mã số thuế công ty không tồn tại",
    });
  }

  res.json({
    ten_cong_ty: congTy.ten_cong_ty,
  });
};