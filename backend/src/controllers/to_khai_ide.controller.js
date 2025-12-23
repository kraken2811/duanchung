const IDE = require("../models/to_khai_idc.model");

/**
 * 🔍 Tìm tờ khai để hủy (IDE)
 * GET /api/to_khai_ides/search/:so_to_khai
 */
exports.searchTokhaiIDE = async (req, res) => {
  try {
    const { so_to_khai } = req.params;
    if (!so_to_khai) {
      return res.status(400).json({ message: "Số tờ khai là bắt buộc" });
    }

    const tk = await IDE.findTokhaiBySoToKhai(so_to_khai);

    if (!tk) {
      return res.status(404).json({ message: "Không tìm thấy tờ khai" });
    }

    if (tk.trang_thai_gui === "DA_THONG_QUAN") {
      return res.status(400).json({
        message: "Tờ khai đã thông quan, không được hủy",
      });
    }

    if (tk.trang_thai_gui === "HUY") {
      return res.status(400).json({
        message: "Tờ khai đã bị hủy trước đó",
      });
    }

    res.json(tk);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * 📤 Gửi yêu cầu hủy tờ khai (IDE)
 * POST /api/to_khai_ides/gui
 */
exports.guiIDE = async (req, res) => {
  try {
    const { id_to_khai, ma_ly_do_huy, ghi_chu } = req.body;
    const userId = req.user?.id || null;

    if (!id_to_khai || !ghi_chu) {
      return res.status(400).json({
        message: "ID tờ khai và lý do hủy là bắt buộc",
      });
    }

    const tk = await IDE.findToKhaiById(Number(id_to_khai));
    if (!tk) {
      return res.status(404).json({ message: "Không tìm thấy tờ khai" });
    }

    // Ghi lịch sử trạng thái IDE
    await IDE.createLichSuTrangThai({
      id_to_khai: tk.id_to_khai,
      trang_thai_cu: tk.trang_thai_gui,
      trang_thai_moi: "YEU_CAU_HUY",
      ghi_chu: `[${ma_ly_do_huy || "N/A"}] ${ghi_chu}`,
      nguoi_thay_doi: userId,
    });

    res.json({
      message: "Đã gửi yêu cầu hủy tờ khai (IDE)",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * 📨 Hải quan phản hồi yêu cầu hủy (IDE)
 * POST /api/to_khai_ides/phan-hoi
 */
exports.phanHoiHaiQuanIDE = async (req, res) => {
  try {
    const { id_to_khai, ket_qua, noi_dung } = req.body;

    if (!id_to_khai || !ket_qua) {
      return res.status(400).json({
        message: "Thiếu ID tờ khai hoặc kết quả phản hồi",
      });
    }

    const tk = await IDE.findToKhaiById(Number(id_to_khai));
    if (!tk) {
      return res.status(404).json({ message: "Không tìm thấy tờ khai" });
    }

    // Lưu phản hồi HQ
    await IDE.createPhanHoiHaiQuan({
      id_to_khai: tk.id_to_khai,
      loai_thong_diep: "IDE",
      noi_dung_thong_diep: noi_dung || "",
    });

    // Nếu chấp nhận → hủy tờ khai
    if (ket_qua === "CHAP_NHAN") {
      await IDE.createLichSuTrangThai({
        id_to_khai: tk.id_to_khai,
        trang_thai_cu: "YEU_CAU_HUY",
        trang_thai_moi: "HUY",
        ghi_chu: noi_dung || "Hải quan chấp nhận hủy",
      });

      await require("../middleware/to_khai_ide.helper").updateTrangThaiToKhai(
        tk.id_to_khai,
        "HUY"
      );
    } else {
      await IDE.createLichSuTrangThai({
        id_to_khai: tk.id_to_khai,
        trang_thai_cu: "YEU_CAU_HUY",
        trang_thai_moi: "TU_CHOI_HUY",
        ghi_chu: noi_dung || "Hải quan từ chối hủy",
      });
    }

    res.json({ message: "Đã xử lý phản hồi IDE" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
