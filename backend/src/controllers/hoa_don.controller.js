// controllers/hoa_don.controller.js
const HoaDon = require("../models/hoa_don.model");

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
  data.id_lo_hang = toNumOrNull(data.id_lo_hang);
  data.id_nguoi_ban = toNumOrNull(data.id_nguoi_ban);
  data.id_nguoi_mua = toNumOrNull(data.id_nguoi_mua);
  data.tong_tien = toNumOrNull(data.tong_tien);

  // Trim chuỗi
  ["so_hoa_don", "ma_ngoai_te", "dieu_kien_giao_hang"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // Ngày
  if (data.ngay_hoa_don === "") data.ngay_hoa_don = null;
  if (data.ngay_tao === "") data.ngay_tao = null;

  return data;
}

/**
 * GET /hoa_don/all
 */
exports.getAll = async (_req, res) => {
  try {
    const rows = await HoaDon.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách hóa đơn:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /hoa_don/:id
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    const row = await HoaDon.getById(id);
    if (!row)
      return res.status(404).json({ error: "Không tìm thấy hóa đơn" });

    res.json(row);
  } catch (err) {
    console.error("Lỗi khi lấy hóa đơn:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /hoa_don
 */
exports.insert = async (req, res) => {
  const payload = normalize(req.body);

  // (tuỳ chọn) validate tối thiểu
  // if (!payload.so_hoa_don || !payload.id_lo_hang)
  //   return res.status(400).json({ error: "Thiếu so_hoa_don hoặc id_lo_hang" });

  try {
    const created = await HoaDon.insert(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error("Lỗi khi thêm hóa đơn:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /hoa_don/:id
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  try {
    await HoaDon.update(id, payload);
    res.json({ message: "Cập nhật hóa đơn thành công" });
  } catch (err) {
    console.error("Lỗi khi cập nhật hóa đơn:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /hoa_don/:id
 * ⚠️ Nghiệp vụ thực tế: nên chuyển sang soft delete
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    await HoaDon.remove(id);
    res.json({ message: "Xóa hóa đơn thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa hóa đơn:", err);
    res.status(500).json({ error: err.message });
  }
};
