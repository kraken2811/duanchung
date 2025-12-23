// controllers/giao_dich_ngan_hang.controller.js
const GiaoDichNganHang = require("../models/giao_dich_ngan_hang.model");

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
  data.id_thanh_toan = toNumOrNull(data.id_thanh_toan);
  data.so_tien = toNumOrNull(data.so_tien);

  // Trim chuỗi
  [
    "ten_ngan_hang",
    "tai_khoan_ngan_hang",
    "ma_phan_hoi",
    "thong_diep_phan_hoi",
  ].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // Ngày / thời gian
  if (data.thoi_gian_giao_dich === "") data.thoi_gian_giao_dich = null;
  if (data.ngay_tao === "") data.ngay_tao = null;

  return data;
}

/**
 * GET /giao_dich_ngan_hang/all
 */
exports.getAll = async (_req, res) => {
  try {
    const rows = await GiaoDichNganHang.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách giao dịch:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /giao_dich_ngan_hang/:id
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    const row = await GiaoDichNganHang.getById(id);
    if (!row)
      return res.status(404).json({ error: "Không tìm thấy giao dịch ngân hàng" });

    res.json(row);
  } catch (err) {
    console.error("Lỗi khi lấy giao dịch:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /giao_dich_ngan_hang
 */
exports.insert = async (req, res) => {
  const payload = normalize(req.body);

  // (tuỳ chọn) validate tối thiểu
  // if (!payload.id_thanh_toan || !payload.so_tien)
  //   return res.status(400).json({ error: "Thiếu id_thanh_toan hoặc so_tien" });

  try {
    const created = await GiaoDichNganHang.insert(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error("Lỗi khi thêm giao dịch:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /giao_dich_ngan_hang/:id
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  try {
    await GiaoDichNganHang.update(id, payload);
    res.json({ message: "Cập nhật giao dịch thành công" });
  } catch (err) {
    console.error("Lỗi khi cập nhật giao dịch:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /giao_dich_ngan_hang/:id
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    await GiaoDichNganHang.remove(id);
    res.json({ message: "Xóa giao dịch thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa giao dịch:", err);
    res.status(500).json({ error: err.message });
  }
};
