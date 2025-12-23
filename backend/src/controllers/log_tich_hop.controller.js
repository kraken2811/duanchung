// controllers/log_tich_hop.controller.js
const LogTichHop = require("../models/log_tich_hop.model");

/**
 * Chuẩn hoá dữ liệu đầu vào
 * - trim chuỗi
 * - rỗng -> null
 */
function normalize(body = {}) {
  const data = { ...body };

  // Trim chuỗi
  [
    "ten_he_thong",
    "huong",
    "ma_tuong_quan",
    "trang_thai",
    "thong_bao_loi",
  ].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // JSON / text payload
  if (data.du_lieu_yeu_cau === "") data.du_lieu_yeu_cau = null;
  if (data.du_lieu_phan_hoi === "") data.du_lieu_phan_hoi = null;

  // Ngày
  if (data.ngay_tao === "") data.ngay_tao = null;

  return data;
}

/**
 * GET /log_tich_hop/all
 */
exports.getAll = async (_req, res) => {
  try {
    const rows = await LogTichHop.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách log tích hợp:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /log_tich_hop/:id
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    const row = await LogTichHop.getById(id);
    if (!row)
      return res.status(404).json({ error: "Không tìm thấy log tích hợp" });

    res.json(row);
  } catch (err) {
    console.error("Lỗi khi lấy log tích hợp:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /log_tich_hop
 * ⚠️ Append-only: CHỈ INSERT
 */
exports.insert = async (req, res) => {
  const payload = normalize(req.body);

  try {
    // auto set thời điểm tạo log
    payload.ngay_tao = payload.ngay_tao ?? new Date();

    const created = await LogTichHop.insert(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error("Lỗi khi thêm log tích hợp:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /log_tich_hop/:id
 * ❌ KHÔNG KHUYẾN NGHỊ
 * Chỉ cho phép update các field kỹ thuật (trạng thái / phản hồi)
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = {
    trang_thai:
      typeof req.body?.trang_thai === "string"
        ? req.body.trang_thai.trim()
        : null,
    du_lieu_phan_hoi: req.body?.du_lieu_phan_hoi ?? null,
    thong_bao_loi:
      typeof req.body?.thong_bao_loi === "string"
        ? req.body.thong_bao_loi.trim()
        : null,
  };

  try {
    await LogTichHop.update(id, payload);
    res.json({ message: "Cập nhật log tích hợp thành công" });
  } catch (err) {
    console.error("Lỗi khi cập nhật log tích hợp:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /log_tich_hop/:id
 * ❌ KHÔNG KHUYẾN NGHỊ – log hệ thống
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    await LogTichHop.remove(id);
    res.json({ message: "Xóa log tích hợp thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa log tích hợp:", err);
    res.status(500).json({ error: err.message });
  }
};
