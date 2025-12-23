// controllers/ma_hs.controller.js
const MaHS = require("../models/ma_hs.model");

/**
 * Chuẩn hoá dữ liệu đầu vào
 * - ép số
 * - trim chuỗi
 * - rỗng -> null
 */
function normalize(body = {}) {
  const data = { ...body };

  const toNumOrNull = (v) =>
    v === undefined || v === null || v === "" || Number.isNaN(Number(v))
      ? null
      : Number(v);

  // Ép số
  data.cap_do = toNumOrNull(data.cap_do);
  data.ma_cha = toNumOrNull(data.ma_cha);

  data.thue_nhap_khau = toNumOrNull(data.thue_nhap_khau);
  data.thue_vat = toNumOrNull(data.thue_vat);
  data.thue_xuat_khau = toNumOrNull(data.thue_xuat_khau);
  data.thue_tieu_thu_dac_biet = toNumOrNull(data.thue_tieu_thu_dac_biet);
  data.thue_bao_ve_moi_trung = toNumOrNull(data.thue_bao_ve_moi_trung);

  // Boolean
  if (typeof data.yeu_cau_giay_phep === "string") {
    data.yeu_cau_giay_phep = data.yeu_cau_giay_phep === "true";
  }

  // Trim chuỗi
  ["ma_hs", "mo_ta", "loai_giay_phep"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // Rỗng -> null
  if (data.mo_ta === "") data.mo_ta = null;
  if (data.loai_giay_phep === "") data.loai_giay_phep = null;
  if (data.ngay_tao === "") data.ngay_tao = null;

  return data;
}

/**
 * GET /ma_hs/all
 */
exports.getAll = async (_req, res) => {
  try {
    const rows = await MaHS.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách mã HS:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /ma_hs/:id
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    const row = await MaHS.getById(id);
    if (!row)
      return res.status(404).json({ error: "Không tìm thấy mã HS" });

    res.json(row);
  } catch (err) {
    console.error("Lỗi khi lấy mã HS:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /ma_hs
 */
exports.insert = async (req, res) => {
  const payload = normalize(req.body);

  // (khuyến nghị) validate tối thiểu
  // if (!payload.ma_hs || payload.cap_do === null)
  //   return res.status(400).json({ error: "Thiếu ma_hs hoặc cap_do" });

  try {
    payload.ngay_tao = payload.ngay_tao ?? new Date();

    const created = await MaHS.insert(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error("Lỗi khi thêm mã HS:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /ma_hs/:id
 * ⚠️ Hạn chế cập nhật – mã HS là master data
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  try {
    await MaHS.update(id, payload);
    res.json({ message: "Cập nhật mã HS thành công" });
  } catch (err) {
    console.error("Lỗi khi cập nhật mã HS:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /ma_hs/:id
 * ❌ KHÔNG KHUYẾN NGHỊ – mã HS thường không delete cứng
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    await MaHS.remove(id);
    res.json({ message: "Xóa mã HS thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa mã HS:", err);
    res.status(500).json({ error: err.message });
  }
};
