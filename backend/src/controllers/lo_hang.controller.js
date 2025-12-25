// controllers/lo_hang.controller.js
const LoHang = require("../models/lo_hang.model");

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

  // Ép số (FK + tiền)
  data.id_hop_dong = toNumOrNull(data.id_hop_dong);
  data.id_cong_ty = toNumOrNull(data.id_cong_ty);
  data.id_dai_ly = toNumOrNull(data.id_dai_ly);
  data.id_van_chuyen = toNumOrNull(data.id_van_chuyen);
  data.id_loai_van_tai = toNumOrNull(data.id_loai_van_tai);
  data.tong_gia_tri = toNumOrNull(data.tong_gia_tri);

  // Trim chuỗi
  [
    "so_lo_hang",
    "cang_xep_hang",
    "cang_do_hang",
    "ma_ngoai_te",
    "mo_ta",
    "nguoi_tao",
  ].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // Ngày
  [
    "ngay_du_kien_xuat",
    "ngay_du_kien_nhap",
    "ngay_tao",
    "ngay_cap_nhat",
  ].forEach((k) => {
    if (data[k] === "") data[k] = null;
  });

  return data;
}

/**
 * GET /lo_hang/all
 */
exports.getAll = async (req, res) => {
  try {
    const {
      page = 1,
      size = 10,
      so_lo_hang,
      trang_thai
    } = req.query;

    const skip = (Number(page) - 1) * Number(size);
    const take = Number(size);

    const result = await LoHang.getAll({
      skip,
      take,
      so_lo_hang,
      trang_thai
    });

    res.json(result);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách lô hàng:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /lo_hang/:id
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    const row = await LoHang.getById(id);
    if (!row)
      return res.status(404).json({ error: "Không tìm thấy lô hàng" });

    res.json(row);
  } catch (err) {
    console.error("Lỗi khi lấy thông tin lô hàng:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /lo_hang
 */
exports.insert = async (req, res) => {
  const payload = normalize(req.body);

  // (tuỳ chọn) validate tối thiểu
  // if (!payload.so_lo_hang || !payload.id_cong_ty)
  //   return res.status(400).json({ error: "Thiếu so_lo_hang hoặc id_cong_ty" });

  try {
    payload.ngay_tao = payload.ngay_tao ?? new Date();

    const created = await LoHang.insert(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error("Lỗi khi thêm lô hàng:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /lo_hang/:id
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);
  payload.ngay_cap_nhat = new Date();

  try {
    await LoHang.update(id, payload);
    res.json({ message: "Cập nhật lô hàng thành công" });
  } catch (err) {
    console.error("Lỗi khi cập nhật lô hàng:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /lo_hang/:id
 * ⚠️ Nghiệp vụ logistics: nên dùng soft delete / trạng thái HỦY
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    await LoHang.remove(id);
    res.json({ message: "Xóa lô hàng thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa lô hàng:", err);
    res.status(500).json({ error: err.message });
  }
};
