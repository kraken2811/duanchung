// controllers/doi_tac.controller.js
const DoiTac = require("../models/doi_tac.model");

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
  data.id_cong_ty = toNumOrNull(data.id_cong_ty);

  // Trim chuỗi
  [
    "ma_so_thue",
    "ten_doi_tac",
    "dia_chi",
    "ma_quoc_gia",
    "nguoi_lien_he",
    "dien_thoai_lien_he",
    "email_lien_he",
    "loai_doi_tac",
  ].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // Ngày
  if (data.ngay_tao === "") data.ngay_tao = null;

  return data;
}

/**
 * GET /doi_tac/all
 */
exports.getAll = async (_req, res) => {
  try {
    const rows = await DoiTac.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách đối tác:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /doi_tac/:id
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    const row = await DoiTac.getById(id);
    if (!row)
      return res.status(404).json({ error: "Không tìm thấy đối tác" });

    res.json(row);
  } catch (err) {
    console.error("Lỗi khi lấy đối tác:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /doi_tac
 */
exports.insert = async (req, res) => {
  const payload = normalize(req.body);

  // (tuỳ chọn) validate tối thiểu
  // if (!payload.ten_doi_tac)
  //   return res.status(400).json({ error: "Thiếu ten_doi_tac" });

  try {
    const created = await DoiTac.insert(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error("Lỗi khi thêm đối tác:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /doi_tac/:id
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  try {
    await DoiTac.update(id, payload);
    res.json({ message: "Cập nhật đối tác thành công" });
  } catch (err) {
    console.error("Lỗi khi cập nhật đối tác:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /doi_tac/:id
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    await DoiTac.remove(id);
    res.json({ message: "Xóa đối tác thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa đối tác:", err);
    res.status(500).json({ error: err.message });
  }
};
