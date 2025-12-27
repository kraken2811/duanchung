const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* ===========================
   GET BY TỜ KHAI
=========================== */
exports.getByToKhai = async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "id_to_khai không hợp lệ" });

  const rows = await prisma.chi_tiet_to_khai.findMany({
    where: { id_to_khai: id },
    orderBy: { so_dong: "asc" },
  });

  res.json(rows);
};

/* ===========================
   CREATE (TỰ TÍNH THUẾ)
=========================== */
exports.create = async (req, res) => {
  try {
    let {
      id_to_khai,
      ma_hs,
      mo_ta_hang_hoa,
      so_luong,
      don_vi_tinh,
      tong_gia_tri,
      ma_ngoai_te,
      ma_quoc_gia,
    } = req.body;

    // === VALIDATE SỚM VÀ TRIM ===
    if (!id_to_khai || isNaN(id_to_khai) || id_to_khai <= 0) {
      return res.status(400).json({ message: "ID tờ khai không hợp lệ" });
    }

    if (!ma_hs || typeof ma_hs !== "string" || ma_hs.trim().length === 0) {
      return res.status(400).json({ message: "Mã HS là bắt buộc và không được để trống" });
    }
    ma_hs = ma_hs.trim();

    const triGia = Number(tong_gia_tri);
    if (isNaN(triGia) || triGia <= 0) {
      return res.status(400).json({ message: "Tổng trị giá phải là số lớn hơn 0" });
    }

    const sl = Number(so_luong);
    if (isNaN(sl) || sl <= 0) {
      return res.status(400).json({ message: "Số lượng phải là số lớn hơn 0" });
    }

    // === LẤY BIỂU THUẾ ===
    const bieuThue = await prisma.bieu_thue.findFirst({
      where: {
        ma_hs,
        OR: [
          { hieu_luc_den: null },
          { hieu_luc_den: { gte: new Date() } },
        ],
      },
      orderBy: { hieu_luc_tu: "desc" },
    });

    if (!bieuThue) {
      return res.status(400).json({
        message: `Không tìm thấy biểu thuế cho mã HS: ${ma_hs}`,
      });
    }

    // === TÍNH THUẾ ===
    const tien_thue = (triGia * (bieuThue.thue_suat || 0)) / 100;
    const tien_vat = ((triGia + tien_thue) * (bieuThue.thue_vat || 10)) / 100;

    // === TỰ ĐỘNG STT ===
    const last = await prisma.chi_tiet_to_khai.findFirst({
      where: { id_to_khai },
      orderBy: { so_dong: "desc" },
      select: { so_dong: true },
    });

    const so_dong = last ? last.so_dong + 1 : 1;

    // === INSERT ===
    const created = await prisma.chi_tiet_to_khai.create({
      data: {
        id_to_khai,
        so_dong,
        ma_hs,
        mo_ta_hang_hoa: mo_ta_hang_hoa?.trim() || null,
        so_luong: sl,
        don_vi_tinh: don_vi_tinh || null,
        tong_gia_tri: triGia,
        ma_ngoai_te: ma_ngoai_te || "USD",
        ma_quoc_gia: ma_quoc_gia || null,
        tien_thue,
        tien_vat,
        id_bieu_thue: bieuThue.id_bieu_thue,
      },
    });

    res.json(created);
  } catch (err) {
    console.error("CREATE GOODS ERROR:", err);
    res.status(500).json({ message: "Lỗi server khi tạo hàng hóa" });
  }
};
/* =========================
   DELETE
========================= */
exports.remove = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.chi_tiet_to_khai.delete({
    where: { id_chi_tiet: id },
  });

  res.json({ message: "Đã xoá" });
};
/* ===========================
   UPDATE
=========================== */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.chi_tiet_to_khai.update({
    where: { id_chi_tiet: id },
    data: req.body,
  });
  res.json({ message: "OK" });
};

/* ===========================
   DELETE
=========================== */
exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.chi_tiet_to_khai.delete({
    where: { id_chi_tiet: id },
  });
  res.json({ message: "Đã xoá" });
};
