// controllers/loai_van_tai.controller.js
const LoaiVanTai = require("../models/loai_van_tai.model");

/**
 * Chuẩn hoá dữ liệu đầu vào
 * - trim chuỗi
 * - rỗng -> null
 */
function normalize(body = {}) {
  const data = { ...body };

  // Trim chuỗi
  ["ma_loai_van_tai", "ten_loai_van_tai", "mo_ta"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // Rỗng -> null
  if (data.mo_ta === "") data.mo_ta = null;
  if (data.ngay_tao === "") data.ngay_tao = null;

  return data;
}

/**
 * GET /loai_van_tai/all
 */
exports.getAll = async (_req, res) => {
  try {
    const rows = await LoaiVanTai.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách loại vận tải:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /loai_van_tai/:id
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    const row = await LoaiVanTai.getById(id);
    if (!row)
      return res.status(404).json({ error: "Không tìm thấy loại vận tải" });

    res.json(row);
  } catch (err) {
    console.error("Lỗi khi lấy loại vận tải:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /loai_van_tai
 */
exports.insert = async (req, res) => {
  const payload = normalize(req.body);

  // (tuỳ chọn) validate tối thiểu
  // if (!payload.ma_loai_van_tai || !payload.ten_loai_van_tai)
  //   return res.status(400).json({ error: "Thiếu ma_loai_van_tai hoặc ten_loai_van_tai" });

  try {
    payload.ngay_tao = payload.ngay_tao ?? new Date();

    const created = await LoaiVanTai.insert(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error("Lỗi khi thêm loại vận tải:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /loai_van_tai/:id
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  try {
    await LoaiVanTai.update(id, payload);
    res.json({ message: "Cập nhật loại vận tải thành công" });
  } catch (err) {
    console.error("Lỗi khi cập nhật loại vận tải:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /loai_van_tai/:id
 * ⚠️ Danh mục: nên chuyển sang soft delete / is_active
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    await LoaiVanTai.remove(id);
    res.json({ message: "Xóa loại vận tải thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa loại vận tải:", err);
    res.status(500).json({ error: err.message });
  }
};
