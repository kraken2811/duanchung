const ChiTietToKhai = require("../models/chi_tiet_to_khai.model");

// helper: chuẩn hoá dữ liệu đầu vào
function normalize(body = {}) {
  const data = { ...body };

  const toNumOrNull = (v) =>
    v === undefined || v === null || v === "" || Number.isNaN(Number(v))
      ? null
      : Number(v);

  data.id_to_khai = toNumOrNull(data.id_to_khai);
  data.so_dong = toNumOrNull(data.so_dong);
  data.so_luong = toNumOrNull(data.so_luong);
  data.don_gia = toNumOrNull(data.don_gia);
  data.tong_gia_tri = toNumOrNull(data.tong_gia_tri);
  data.id_bieu_thue = toNumOrNull(data.id_bieu_thue);
  data.tien_thue = toNumOrNull(data.tien_thue);
  data.tien_vat = toNumOrNull(data.tien_vat);
  data.thue_bo_sung = toNumOrNull(data.thue_bo_sung);

  [
    "ma_hs",
    "mo_ta_hang_hoa",
    "don_vi_tinh",
    "ma_ngoai_te",
    "ma_quoc_gia",
  ].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  data.ngay_tao = data.ngay_tao ?? null;

  return data;
}

/* ================= GET ALL ================= */
exports.getAll = async (_req, res) => {
  try {
    const rows = await ChiTietToKhai.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET BY ID ================= */
exports.getById = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    const row = await ChiTietToKhai.getById(id);
    if (!row) return res.status(404).json({ error: "Không tìm thấy" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= INSERT ================= */
exports.insert = async (req, res) => {
  try {
    const payload = normalize(req.body);
    const created = await ChiTietToKhai.insert(payload);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ================= UPDATE ================= */
exports.update = async (req, res) => {
  const id = BigInt(req.params.id);
  try {
    const payload = normalize(req.body);
    await ChiTietToKhai.update(id, payload);
    res.json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id không hợp lệ" });
  }

  try {
    await ChiTietToKhai.remove(id);
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= 🔥 CALC TAX BY MA HS ================= */
exports.calcTaxByMaHS = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { ma_hs, tong_gia_tri } = req.body;

    if (!Number.isInteger(id))
      return res.status(400).json({ error: "id không hợp lệ" });

    if (!ma_hs || tong_gia_tri == null)
      return res
        .status(400)
        .json({ error: "Thiếu ma_hs hoặc tong_gia_tri" });

    /** 1️⃣ Kiểm tra mã HS */
    const hs = await prisma.ma_hs.findUnique({
      where: { ma_hs },
    });
    if (!hs)
      return res.status(404).json({ error: "Không tồn tại mã HS" });

    /** 2️⃣ Biểu thuế hiệu lực mới nhất */
    const bieuThue = await prisma.bieu_thue.findFirst({
      where: {
        ma_hs,
        OR: [{ hieu_luc_den: null }, { hieu_luc_den: { gte: new Date() } }],
      },
      orderBy: { hieu_luc_tu: "desc" },
    });

    if (!bieuThue)
      return res.status(404).json({ error: "Không có biểu thuế" });

    /** 3️⃣ TÍNH THUẾ (CHUẨN HQ) */
    const giaTri = Number(tong_gia_tri);

    const thueNhapKhau =
      (giaTri * Number(bieuThue.thue_suat || 0)) / 100;

    const thueVAT =
      ((giaTri + thueNhapKhau) *
        Number(bieuThue.thue_vat || 0)) / 100;

    /** 4️⃣ UPDATE DB */
    const updated = await prisma.chi_tiet_to_khai.update({
      where: { id_chi_tiet: id },
      data: {
        ma_hs,
        id_bieu_thue: bieuThue.id_bieu_thue,
        tien_thue: thueNhapKhau,
        tien_vat: thueVAT,
      },
    });

    res.json({
      message: "Tính thuế thành công",
      data: {
        chi_tiet: updated,
        thue_nhap_khau: thueNhapKhau,
        thue_vat: thueVAT,
      },
    });
  } catch (err) {
    console.error("calcTaxByMaHS:", err);
    res.status(500).json({ error: err.message });
  }
};