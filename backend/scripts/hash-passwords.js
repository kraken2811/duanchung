require('dotenv').config();
const bcrypt = require('bcrypt');
const prisma = require('../src/prisma/client');

(async () => {
  try {
    const users = await prisma.nguoi_dung.findMany();

    for (const user of users) {
      if (!user.mat_khau || user.mat_khau.startsWith('$2')) continue;

      const hashed = await bcrypt.hash(user.mat_khau, 10);

      await prisma.nguoi_dung.update({
        where: { id_nguoi_dung: user.id_nguoi_dung },
        data: { mat_khau: hashed },
      });

      console.log(`✔ Hashed user: ${user.ten_dang_nhap}`);
    }

    console.log('🎉 Hash password hoàn tất');
  } catch (err) {
    console.error('❌ Lỗi hash password:', err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
})();
