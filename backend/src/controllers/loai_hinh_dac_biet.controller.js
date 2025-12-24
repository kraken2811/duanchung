// controllers/loai_hinh_dac_biet.controller.js
const LoaiHinhDacBiet = require("../models/loai_hinh_dac_biet.model");

/**
 * Chuẩn hoá dữ liệu đầu vào
 * - trim chuỗi
 * - rỗng -> null
 */
function normalize(body = {}) {
  const data = { ...body };

  // Trim chuỗi
  ["ma_loai_hinh", "ten_loai_hinh", "mo_ta"].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // Rỗng -> null
  if (data.mo_ta === "") data.mo_ta = null;

  return data;
}

/**
 * GET /loai_hinh_dac_biet/all
 */
exports.getAll = async (_req, res) => {
  try {
    const rows = await LoaiHinhDacBiet.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách loại hình đặc biệt:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /loai_hinh_dac_biet/:id
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    const row = await LoaiHinhDacBiet.getById(id);
    if (!row)
      return res.status(404).json({ error: "Không tìm thấy loại hình đặc biệt" });

    res.json(row);
  } catch (err) {
    console.error("Lỗi khi lấy loại hình đặc biệt:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /loai_hinh_dac_biet
 */
exports.insert = async (req, res) => {
  const payload = normalize(req.body);

  // (tuỳ chọn) validate tối thiểu
  // if (!payload.ma_loai_hinh || !payload.ten_loai_hinh)
  //   return res.status(400).json({ error: "Thiếu ma_loai_hinh hoặc ten_loai_hinh" });

  try {
    const created = await LoaiHinhDacBiet.insert(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error("Lỗi khi thêm loại hình đặc biệt:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /loai_hinh_dac_biet/:id
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  try {
    await LoaiHinhDacBiet.update(id, payload);
    res.json({ message: "Cập nhật loại hình đặc biệt thành công" });
  } catch (err) {
    console.error("Lỗi khi cập nhật loại hình đặc biệt:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /loai_hinh_dac_biet/:id
 * ⚠️ Danh mục dùng lâu dài: nên chuyển sang soft delete
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    await LoaiHinhDacBiet.remove(id);
    res.json({ message: "Xóa loại hình đặc biệt thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa loại hình đặc biệt:", err);
    res.status(500).json({ error: err.message });
  }
};
