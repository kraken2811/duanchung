const IDE = require("../models/to_khai_ide.model");

/**
 * GET /huy-to-khai/:so_to_khai
 * Load dữ liệu màn hình IDE
 */
exports.getIDEDetail = async (req, res) => {
  try {
    const { so_to_khai } = req.params;

    const tk = await IDE.getIDEDetail(so_to_khai);
    if (!tk) {
      return res.status(404).json({
        message: "Không tìm thấy tờ khai",
      });
    }

    res.json({
      to_khai: {
        id_to_khai: tk.id_to_khai,
        so_to_khai: tk.so_to_khai,
        ngay_dang_ky: tk.ngay_khai_bao,
        ma_hai_quan: tk.ma_cuc_hai_quan,
        loai_hinh: tk.loai_hinh_dac_biet?.ten_loai_hinh,
        bo_phan_xu_ly: tk.phan_loai,
        trang_thai: tk.trang_thai_gui,
      },

      ide_form: tk.sua_doi?.[0] || null,
      ho_so_dinh_kem: tk.taiLieus || [],
      lich_su: tk.lich_su_trang_thai || [],
    });
  } catch (err) {
    console.error("getIDEDetail error:", err);
    res.status(500).json({
      message: "Lỗi server",
    });
  }
};

/**
 * POST /huy-to-khai
 * Tạo yêu cầu hủy (IDE – nháp)
 */
exports.createIDE = async (req, res) => {
  try {
    const {
      id_to_khai,
      ly_do_sua,
      ma_ly_do_huy,
      ngay_yeu_cau,
    } = req.body;

    if (!id_to_khai || !ly_do_sua || !ma_ly_do_huy) {
      return res.status(400).json({
        message: "Thiếu dữ liệu bắt buộc",
      });
    }

    const ide = await IDE.createIDE({
      id_to_khai,
      ly_do_sua,
      ma_ly_do_huy,
      ngay_yeu_cau,
    });

    res.status(201).json(ide);
  } catch (err) {
    console.error("createIDE error:", err);
    res.status(500).json({
      message: "Không thể tạo yêu cầu hủy",
    });
  }
};

/**
 * POST /huy-to-khai/gui/:id_sua_doi
 * Khai báo hủy (IDE)
 */
exports.guiIDE = async (req, res) => {
  try {
    const { id_sua_doi } = req.params;

    // IDE là nghiệp vụ nội bộ → cho phép null
    const id_nguoi_dung = req.user?.id_nguoi_dung ?? null;

    const result = await IDE.guiIDE(
      Number(id_sua_doi),
      id_nguoi_dung
    );

    res.json(result);
  } catch (err) {
    console.error("guiIDE error:", err);
    res.status(400).json({
      message: err.message || "Không thể hủy tờ khai",
    });
  }
};

/**
 * GET /to_khai_ides/list
 * API cho dropdown chọn số tờ khai
 */
exports.getIDEList = async (req, res) => {
  try {
    const { q } = req.query; // keyword search

    const list = await IDE.getIDEList(q);

    res.json(list);
  } catch (err) {
    console.error("getIDEList error:", err);
    res.status(500).json({
      message: "Không tải được danh sách tờ khai",
    });
  }
}; 
