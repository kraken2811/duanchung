const IDC = require("../models/to_khai_idc.model");
const TK = require("../models/chi_tiet_to_khai.model")

/**
 * 1. Load IDC (3 tab)
 */
exports.getIDCDetail = async (req, res) => {
  try {
    const { so_to_khai } = req.params;

    const tk = await IDC.getIDCDetail(so_to_khai);
    if (!tk) {
      return res.status(404).json({ message: "Không tìm thấy tờ khai" });
    }

    await IDC.createSnapshotIfNotExists(tk.id_to_khai, tk);

    res.json({
      to_khai: tk,
      hang_hoa: tk.chi_tiet_to_khai,
      idc_form: tk.sua_doi?.[0] || null,
      snapshot: tk.snapshot?.[0] || null,
      lich_su: tk.lich_su_trang_thai,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * 2. Sửa chi tiết hàng
 */
exports.updateChiTiet = async (req, res) => {
  try {
    const { id_chi_tiet, so_luong, don_gia, ma_hs } = req.body;
    const userId = req.user?.id || null;

    if (!id_chi_tiet) {
      return res.status(400).json({ message: "Thiếu id_chi_tiet" });
    }

    const soLuongNum =
      so_luong !== undefined ? Number(so_luong) : undefined;
    const donGiaNum =
      don_gia !== undefined ? Number(don_gia) : undefined;

    const data = {
      ...(soLuongNum !== undefined && { so_luong: soLuongNum }),
      ...(donGiaNum !== undefined && { don_gia: donGiaNum }),
      ...(ma_hs && { ma_hs }),
    };

    // ✅ nếu có thay đổi số lượng hoặc đơn giá → tính lại tổng
    if (soLuongNum !== undefined || donGiaNum !== undefined) {
      const current = await TK.getById(Number(id_chi_tiet));

      const finalSoLuong = soLuongNum ?? current.so_luong ?? 0;
      const finalDonGia = donGiaNum ?? current.don_gia ?? 0;

      data.tong_gia_tri = finalSoLuong * finalDonGia;
    }

    const result = await IDC.updateChiTietWithAudit(
      Number(id_chi_tiet),
      data,
      userId
    );

    res.json({
      message: "Cập nhật thành công",
      data: result,
      updated_by: userId,
    });
  } catch (err) {
    console.error("UPDATE CHI TIET ERROR:", err);
    res.status(500).json({
      message: "Lỗi cập nhật chi tiết",
      error: err.message,
    });
  }
};

/**
 * 3. Lưu form IDC
 */
exports.saveIDCForm = async (req, res) => {
  await IDC.saveIDCSuaDoi(req.body);
  res.json({ message: "Đã lưu thông tin sửa đổi IDC" });
};

/**
 * 4. Gửi IDC
 */
exports.guiIDC = async (req, res) => {
  const id_to_khai = Number(req.params.id_to_khai);
  const userId = req.user?.id || null;

  await IDC.guiIDC(id_to_khai, userId);
  res.json({ message: "Đã gửi IDC" });
};

/**
 * 5. Phản hồi hải quan
 */
exports.phanHoiHaiQuan = async (req, res) => {
  const { id_to_khai } = req.params;
  const { ket_qua, noi_dung } = req.body;

  await IDC.phanHoiHaiQuan(Number(id_to_khai), ket_qua, noi_dung);
  res.json({ message: "Đã ghi nhận phản hồi hải quan" });
};
