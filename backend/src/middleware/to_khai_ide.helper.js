const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.updateTrangThaiToKhai = (id_to_khai, trang_thai_gui) => {
  return prisma.to_khai_hai_quan.update({
    where: { id_to_khai },
    data: { trang_thai_gui },
  });
};