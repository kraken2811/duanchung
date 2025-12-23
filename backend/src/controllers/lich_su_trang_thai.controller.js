// controllers/lich_su_trang_thai.controller.js
const LichSuTrangThai = require("../models/lich_su_trang_thai.model");

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
  data.id_to_khai = toNumOrNull(data.id_to_khai);

  // Trim chuỗi
  [
    "trang_thai_cu",
    "trang_thai_moi",
    "nguoi_thay_doi",
    "ghi_chu",
  ].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // Ngày
  if (data.ngay_thay_doi === "") data.ngay_thay_doi = null;

  return data;
}

/**
 * GET /lich_su_trang_thai/all
 */
exports.getAll = async (_req, res) => {
  try {
    const rows = await LichSuTrangThai.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách lịch sử trạng thái:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /lich_su_trang_thai/:id
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    const row = await LichSuTrangThai.getById(id);
    if (!row)
      return res.status(404).json({ error: "Không tìm thấy lịch sử trạng thái" });

    res.json(row);
  } catch (err) {
    console.error("Lỗi khi lấy lịch sử trạng thái:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /lich_su_trang_thai
 * ⚠️ Audit trail: CHỈ INSERT (append-only)
 */
exports.insert = async (req, res) => {
  const payload = normalize(req.body);

  // (khuyến nghị) validate tối thiểu
  // if (!payload.id_to_khai || !payload.trang_thai_moi)
  //   return res.status(400).json({ error: "Thiếu id_to_khai hoặc trang_thai_moi" });

  try {
    // auto set thời điểm thay đổi nếu frontend không gửi
    if (!payload.ngay_thay_doi) {
      payload.ngay_thay_doi = new Date();
    }

    const created = await LichSuTrangThai.insert(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error("Lỗi khi thêm lịch sử trạng thái:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /lich_su_trang_thai/:id
 * ❌ KHÔNG KHUYẾN NGHỊ – chỉ cho phép sửa ghi_chu
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = {
    ghi_chu:
      typeof req.body?.ghi_chu === "string"
        ? req.body.ghi_chu.trim()
        : null,
  };

  try {
    await LichSuTrangThai.update(id, payload);
    res.json({ message: "Cập nhật ghi chú lịch sử trạng thái thành công" });
  } catch (err) {
    console.error("Lỗi khi cập nhật lịch sử trạng thái:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /lich_su_trang_thai/:id
 * ❌ KHÔNG KHUYẾN NGHỊ – audit trail
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    await LichSuTrangThai.remove(id);
    res.json({ message: "Xóa lịch sử trạng thái thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa lịch sử trạng thái:", err);
    res.status(500).json({ error: err.message });
  }
};
