// controllers/khoan_dieu_chinh_tri_gia.controller.js
const KhoanDieuChinhTriGia = require("../models/khoan_dieu_chinh_tri_gia.model");

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
  data.id_to_khai_tri_gia = toNumOrNull(data.id_to_khai_tri_gia);
  data.stt = toNumOrNull(data.stt);
  data.tri_gia_dieu_chinh = toNumOrNull(data.tri_gia_dieu_chinh);
  data.tong_he_so_phan_bo = toNumOrNull(data.tong_he_so_phan_bo);

  // Trim chuỗi
  [
    "ma_ten",
    "ma_phan_loai",
    "ma_tien_te",
    "loai_dieu_chinh",
  ].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // Ngày
  if (data.ngay_tao === "") data.ngay_tao = null;

  return data;
}

/**
 * GET /khoan_dieu_chinh_tri_gia/all
 */
exports.getAll = async (_req, res) => {
  try {
    const rows = await KhoanDieuChinhTriGia.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách khoản điều chỉnh trị giá:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /khoan_dieu_chinh_tri_gia/:id
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    const row = await KhoanDieuChinhTriGia.getById(id);
    if (!row)
      return res.status(404).json({ error: "Không tìm thấy khoản điều chỉnh trị giá" });

    res.json(row);
  } catch (err) {
    console.error("Lỗi khi lấy khoản điều chỉnh trị giá:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /khoan_dieu_chinh_tri_gia
 */
exports.insert = async (req, res) => {
  const payload = normalize(req.body);

  // (tuỳ chọn) validate tối thiểu
  // if (!payload.id_to_khai_tri_gia || !payload.tri_gia_dieu_chinh)
  //   return res.status(400).json({ error: "Thiếu id_to_khai_tri_gia hoặc tri_gia_dieu_chinh" });

  try {
    const created = await KhoanDieuChinhTriGia.insert(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error("Lỗi khi thêm khoản điều chỉnh trị giá:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /khoan_dieu_chinh_tri_gia/:id
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);

  try {
    await KhoanDieuChinhTriGia.update(id, payload);
    res.json({ message: "Cập nhật khoản điều chỉnh trị giá thành công" });
  } catch (err) {
    console.error("Lỗi khi cập nhật khoản điều chỉnh trị giá:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /khoan_dieu_chinh_tri_gia/:id
 * ⚠️ Nghiệp vụ tài chính: nên chuyển sang soft delete
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    await KhoanDieuChinhTriGia.remove(id);
    res.json({ message: "Xóa khoản điều chỉnh trị giá thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa khoản điều chỉnh trị giá:", err);
    res.status(500).json({ error: err.message });
  }
};
