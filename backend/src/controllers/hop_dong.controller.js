// controllers/hop_dong.controller.js
const HopDong = require("../models/hop_dong.model");

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
  data.id_doi_tac = toNumOrNull(data.id_doi_tac);
  data.tong_gia_tri = toNumOrNull(data.tong_gia_tri);
  data.phi_gia_cong = toNumOrNull(data.phi_gia_cong);

  // Trim chuỗi
  [
    "so_hop_dong",
    "loai_hop_dong",
    "trang_thai",
    "ma_ngoai_te",
    "dieu_kien_thanh_toan",
    "ma_cuc_hai_quan",
    "nguoi_tao",
  ].forEach((k) => {
    if (typeof data[k] === "string") data[k] = data[k].trim();
  });

  // Ngày
  [
    "ngay_ky",
    "ngay_het_han",
    "hieu_luc_tu",
    "hieu_luc_den",
    "ngay_tao",
    "ngay_cap_nhat",
  ].forEach((k) => {
    if (data[k] === "") data[k] = null;
  });

  return data;
}

/**
 * GET /hop_dong/all
 */
exports.getAll = async (_req, res) => {
  try {
    const rows = await HopDong.getAll();
    res.json(rows);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách hợp đồng:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /hop_dong/:id
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    const row = await HopDong.getById(id);
    if (!row)
      return res.status(404).json({ error: "Không tìm thấy hợp đồng" });

    res.json(row);
  } catch (err) {
    console.error("Lỗi khi lấy hợp đồng:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /hop_dong
 */
exports.insert = async (req, res) => {
  const userId = req.user?.id_nguoi_dung; 
  const payload = normalize(req.body);

  // (tuỳ chọn) validate tối thiểu
  // if (!payload.so_hop_dong || !payload.id_doi_tac)
  //   return res.status(400).json({ error: "Thiếu so_hop_dong hoặc id_doi_tac" });

  try {
    const created = await HopDong.createFullContract(payload, userId);
    res.status(201).json(created);
  } catch (err) {
    console.error("Lỗi khi thêm hợp đồng:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /hop_dong/:id
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  const payload = normalize(req.body);
  payload.ngay_cap_nhat = new Date(); // auto update time

  try {
    await HopDong.update(id, payload);
    res.json({ message: "Cập nhật hợp đồng thành công" });
  } catch (err) {
    console.error("Lỗi khi cập nhật hợp đồng:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /hop_dong/:id
 * ⚠️ Thực tế nên chuyển sang soft delete / trạng thái HỦY
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id))
    return res.status(400).json({ error: "id không hợp lệ" });

  try {
    await HopDong.remove(id);
    res.json({ message: "Xóa hợp đồng thành công" });
  } catch (err) {
    console.error("Lỗi khi xóa hợp đồng:", err);
    res.status(500).json({ error: err.message });
  }
};
