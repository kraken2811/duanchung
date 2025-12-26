const ToKhai = require("../models/to_khai_hai_quan.model");

/* ================= GET ALL ================= */
exports.getAll = async (req, res) => {
  try {
    const data = await ToKhai.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET BY ID ================= */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "id không hợp lệ" });
  }

  try {
    const data = await ToKhai.getById(id);
    if (!data) return res.status(404).json({ message: "Không tìm thấy" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE ================= */
exports.insert = async (req, res) => {
  try {
    const data = await ToKhai.insert(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.update = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "id không hợp lệ" });
  }

  try {
    const data = await ToKhai.update(id, req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "id không hợp lệ" });
  }

  try {
    await ToKhai.remove(id);
    res.json({ message: "Đã huỷ tờ khai" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getIDB = async (req, res) => {
  try {
    const ma = req.params.ma;

    if (!ma || typeof ma !== "string") {
      return res.status(400).json({
        message: "so_to_khai không hợp lệ",
      });
    }

    const data = await ToKhai.getIDBData(ma);

    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy tờ khai",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi lấy dữ liệu IDB",
      error: error.message,
    });
  }
};

/**
 * POST /to-khai/idb/submit
 * Gửi tờ khai IDB (chuyển trạng thái)
 */
exports.submitIDB = async (req, res) => {
  try {
    const { so_to_khai } = req.body;

    if (!so_to_khai || typeof so_to_khai !== "string") {
      return res.status(400).json({
        message: "so_to_khai không hợp lệ",
      });
    }

    const result = await ToKhai.submitIDB(so_to_khai);

    res.status(200).json({
      message: "Gửi tờ khai IDB thành công",
      data: {
        so_to_khai: result.so_to_khai,
        trang_thai_gui: result.trang_thai_gui,
      },
    });
  } catch (error) {
    console.error("submitIDB error:", error);

    // Tờ khai không tồn tại
    if (error.code === "NOT_FOUND") {
      return res.status(404).json({
        message: "Không tìm thấy tờ khai để gửi IDB",
      });
    }

    // Đã gửi IDB rồi
    if (error.code === "ALREADY_SUBMITTED") {
      return res.status(400).json({
        message: "Tờ khai đã được gửi IDB trước đó",
      });
    }

    res.status(500).json({
      message: "Lỗi khi gửi tờ khai IDB",
      error: error.message,
    });
  }
};

/**
 * GET /to-khai/lo-hang/:id_lo_hang
 * Lấy tờ khai theo lô hàng
 */
exports.getByLoHang = async (req, res) => {
  try {
    const id_lo_hang = Number(req.params.id_lo_hang);
    if (!Number.isInteger(id_lo_hang)) {
      return res.status(400).json({ message: "id_lo_hang không hợp lệ" });
    }

    const data = await ToKhai.getByLoHang(id_lo_hang);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy tờ khai theo lô hàng",
      error: error.message,
    });
  }
};

/**
 * GET /to-khai/cong-ty/:id_cong_ty
 * Lấy tờ khai theo công ty
 */
exports.getByCongTy = async (req, res) => {
  try {
    const id_cong_ty = Number(req.params.id_cong_ty);
    if (!Number.isInteger(id_cong_ty)) {
      return res.status(400).json({ message: "id_cong_ty không hợp lệ" });
    }

    const data = await ToKhai.getByCongTy(id_cong_ty);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy tờ khai theo công ty",
      error: error.message,
    });
  }
};

/**
 * POST /to-khai
 * Tạo mới tờ khai hải quan
 */
exports.insert = async (req, res) => {
  try {
    const payload = req.body;

    if (!payload.id_lo_hang || !payload.id_cong_ty) {
      return res.status(400).json({
        message: "Thiếu dữ liệu bắt buộc (id_lo_hang, id_cong_ty)",
      });
    }

    const created = await ToKhai.insert(payload);

    res.status(201).json({
      message: "Tạo tờ khai hải quan thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi tạo tờ khai hải quan",
      error: error.message,
    });
  }
};

/**
 * PUT /to-khai/:id
 * Cập nhật tờ khai (chỉ khi chưa gửi VNACCS)
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_to_khai không hợp lệ" });
    }

    const updated = await ToKhai.update(id, req.body);

    res.status(200).json({
      message: "Cập nhật tờ khai hải quan thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật tờ khai hải quan",
      error: error.message,
    });
  }
};

/**
 * PATCH /to-khai/:id/vnaccs
 * Cập nhật trạng thái từ VNACCS
 */
exports.updateVNACCS = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_to_khai không hợp lệ" });
    }

    const updated = await ToKhai.updateVNACCS(id, req.body);

    res.status(200).json({
      message: "Cập nhật trạng thái VNACCS thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật trạng thái VNACCS",
      error: error.message,
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_to_khai không hợp lệ" });
    }

    await ToKhai.remove(id);

    res.status(200).json({
      message: "Xóa tờ khai hải quan thành công (KHÔNG KHUYẾN NGHỊ)",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa tờ khai hải quan",
      error: error.message,
    });
  }
};

exports.getList = async (req, res) => {
  try {
    const results = await ToKhai.getList(req.query);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách tờ khai', error: err.message });
  }
};

exports.statistics = async (req, res) => {
  try {
    const data = await ToKhai.statistics();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Lỗi khi lấy thống kê tờ khai hải quan",
      error: err.message,
    });
  }
};
exports.saveGen1 = async (req, res) => {
  try {
    const {
      loai_to_khai,
      phan_loai,
      ma_cuc_hai_quan,
      ngay_khai_bao,
      id_cong_ty,
      id_loai_hinh,
      nguoi_tao,
    } = req.body;

    if (!loai_to_khai || !id_cong_ty) {
      return res.status(400).json({
        message: "Thiếu loai_to_khai hoặc id_cong_ty",
      });
    }

    const data = await prisma.to_khai_hai_quan.create({
      data: {
        loai_to_khai,
        phan_loai,
        ma_cuc_hai_quan,
        ngay_khai_bao,
        id_cong_ty,
        id_loai_hinh,
        nguoi_tao,
        trang_thai_gui: "CHO_GUI",
      },
    });

    res.json({
      message: "Tạo Gen 1 thành công",
      data,
    });
  } catch (err) {
    console.error("GEN1 ERROR:", err);
    res.status(500).json({
      message: "Lỗi ghi Gen 1 IDA",
      error: err.message,
    });
  }
};
exports.saveGen2 = async (req, res) => {
  try {
    const idToKhai = Number(req.params.id);
    const {
      invoice,
      customsValue,
      taxesAndGuarantees,
      otherInformation,
      notes,
    } = req.body;

    if (!idToKhai) {
      return res.status(400).json({ message: "Thiếu id tờ khai" });
    }

    // 1. Lấy tờ khai để biết id_lo_hang
    const toKhai = await prisma.to_khai_hai_quan.findUnique({
      where: { id_to_khai: idToKhai },
    });

    if (!toKhai?.id_lo_hang) {
      return res.status(400).json({
        message: "Tờ khai chưa gắn lô hàng",
      });
    }

    // 2. Lưu hóa đơn
    if (invoice) {
      await prisma.hoa_don.upsert({
        where: {
          id_lo_hang: toKhai.id_lo_hang, // ✅ ĐÚNG
        },
        update: {
          so_hoa_don: invoice.number,
          ngay_hoa_don: invoice.date,
          tong_tien: invoice.totalValue,
          ma_ngoai_te: invoice.currency,
          dieu_kien_giao_hang: invoice.incoterms,
        },
        create: {
          so_hoa_don: invoice.number,
          ngay_hoa_don: invoice.date,
          tong_tien: invoice.totalValue,
          ma_ngoai_te: invoice.currency,
          dieu_kien_giao_hang: invoice.incoterms,
          id_lo_hang: toKhai.id_lo_hang,
        },
      });
    }

    // 3. Lưu trị giá
    if (customsValue) {
      await prisma.to_khai_tri_gia.upsert({
        where: {
          id_to_khai_hai_quan: idToKhai,
        },
        update: {
          ma_phan_loai_khai_tri_gia: customsValue.method,
          gia_co_so_hieu_chinh: customsValue.freight,
        },
        create: {
          id_to_khai_hai_quan: idToKhai,
          ma_phan_loai_khai_tri_gia: customsValue.method,
          gia_co_so_hieu_chinh: customsValue.freight,
        },
      });
    }

    res.json({
      message: "Lưu GEN 2 thành công",
    });
  } catch (err) {
    console.error("GEN2 ERROR:", err);
    res.status(500).json({
      message: "Lỗi lưu GEN 2",
      error: err.message,
    });
  }
};

exports.declareIDA = async (req, res) => {
  try {
    const id_to_khai = Number(req.params.id);
    const { id_lo_hang } = req.body;

    if (!Number.isInteger(id_to_khai)) {
      return res.status(400).json({ message: "id_to_khai không hợp lệ" });
    }

    if (!id_lo_hang) {
      return res.status(400).json({ message: "Chưa chọn lô hàng" });
    }

    const updated = await ToKhai.update(id_to_khai, {
      id_lo_hang,
      trang_thai_gui: "CHO_GUI",
    });

    res.status(200).json({
      message: "Khai báo IDA thành công",
      data: updated,
    });
  } catch (error) {
    console.error("declareIDA:", error);
    res.status(500).json({
      message: "Lỗi khai báo IDA",
      error: error.message,
    });
  }
};


