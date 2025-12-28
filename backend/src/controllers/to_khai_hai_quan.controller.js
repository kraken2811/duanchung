const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
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

exports.getStatus = async (_req, res) => {
  try {
    const data = await ToKhai.findTrangthai();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy dang sách tờ khai hải quan",
      error: error.message,
    })
  }
}

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

    const toKhai = await prisma.to_khai_hai_quan.create({
      data: {
        loai_to_khai,
        phan_loai,
        ma_cuc_hai_quan,
        ngay_khai_bao: ngay_khai_bao
          ? new Date(ngay_khai_bao)
          : null,

        // ✅ đúng: connect công ty
        cong_ty: {
          connect: { id_cong_ty },
        },

        // ✅ đúng: connect loại hình
        loai_hinh_dac_biet: {
          connect: { id_loai_hinh },
        },
        nguoi_dung: {
          connect: { id_nguoi_dung: nguoi_tao },
        },

        trang_thai_gui: "CHO_GUI",
        lo_hang: {
          create: {
            so_lo_hang: `LH-${Date.now()}`,
          },
        },
      },

      include: {
        lo_hang: true,
      },
    });

    res.json({
      message: "Tạo GEN 1 thành công",
      data: toKhai,
    });
  } catch (err) {
    console.error("GEN1 ERROR:", err);
    res.status(500).json({
      message: "Lỗi lưu GEN 1",
      error: err.message,
    });
  }
};


exports.saveGen2 = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { hoa_don, tri_gia, hop_dong } = req.body;

    if (!id)
      return res.status(400).json({ message: "Thiếu id tờ khai" });

    const result = await prisma.$transaction(async (tx) => {
      const toKhai = await tx.to_khai_hai_quan.findUnique({
        where: { id_to_khai: id },
        include: { lo_hang: true },
      });

      if (!toKhai) throw new Error("Không tìm thấy tờ khai");

      /* =======================
         1. HỢP ĐỒNG
      ======================= */
      let hopDongId = toKhai.id_hop_dong;

      if (hop_dong) {
        if (hopDongId) {
          // Update hợp đồng
          await prisma.hop_dong.update({
            where: { id_hop_dong: hopDongId },
            data: {
              so_hop_dong: hop_dong.so_hop_dong,
              ngay_ky: hop_dong.ngay_ky
                ? new Date(hop_dong.ngay_ky)
                : null,
            },
          });
        } else {
          // Tạo mới hợp đồng
          const newHopDong = await prisma.hop_dong.create({
            data: {
              id_hop_dong: `HD_${Date.now()}`,
              so_hop_dong: hop_dong.so_hop_dong,
              loai_hop_dong: "NHAP_KHAU",
              ngay_ky: hop_dong.ngay_ky
                ? new Date(hop_dong.ngay_ky)
                : null,
              id_cong_ty: toKhai.id_cong_ty,
            },
          });

          hopDongId = newHopDong.id_hop_dong;

          // Gắn hợp đồng vào tờ khai
          await prisma.to_khai_hai_quan.update({
            where: { id_to_khai: id },
            data: {
              id_hop_dong: hopDongId,
            },
          });
        }
      }


      /* =======================
         2. HÓA ĐƠN
      ======================= */
      if (hoa_don) {
        const existed = await tx.hoa_don.findFirst({
          where: { id_lo_hang: toKhai.id_lo_hang },
        });

        if (existed) {
          await tx.hoa_don.update({
            where: { id_hoa_don: existed.id_hoa_don },
            data: {
              so_hoa_don: hoa_don.so_hoa_don,
              ngay_hoa_don: hoa_don.ngay_hoa_don
                ? new Date(hoa_don.ngay_hoa_don)
                : null,
              dieu_kien_giao_hang: hoa_don.dieu_kien_giao_hang,
              ma_ngoai_te: hoa_don.ma_ngoai_te,
              tong_tien: hoa_don.tong_tien,
            },
          });
        } else {
          await tx.hoa_don.create({
            data: {
              ...hoa_don,
              id_lo_hang: toKhai.id_lo_hang,
            },
          });
        }
      }

      /* =======================
         3. TRỊ GIÁ
      ======================= */
      if (tri_gia) {
        const existed = await tx.to_khai_tri_gia.findFirst({
          where: { id_to_khai_hai_quan: id },
        });

        const giaTri =
          (tri_gia.phi_van_chuyen || 0) +
          (tri_gia.phi_bao_hiem || 0);

        if (existed) {
          await tx.to_khai_tri_gia.update({
            where: {
              id_to_khai_tri_gia: existed.id_to_khai_tri_gia,
            },
            data: {
              ma_phan_loai_khai_tri_gia: tri_gia.phuong_phap,
              gia_co_so_hieu_chinh: giaTri,
            },
          });
        } else {
          await tx.to_khai_tri_gia.create({
            data: {
              id_to_khai_hai_quan: id,
              ma_phan_loai_khai_tri_gia: tri_gia.phuong_phap,
              gia_co_so_hieu_chinh: giaTri,
              tong_he_so_phan_bo: 1,
              ma_tien_te: "USD",
              nguoi_nop_thue: "IMPORTER",
            },
          });
        }

        // cập nhật tổng tiền thuế tờ khai
        await tx.to_khai_hai_quan.update({
          where: { id_to_khai: id },
          data: {
            so_tien_thue: giaTri,
          },
        });
      }

      return {
        id_to_khai: id,
        id_hop_dong: hopDongId,
      };
    });

    return res.json({
      message: "Lưu GEN 2 thành công",
      data: result,
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

    if (!Number.isInteger(id_to_khai) || id_to_khai <= 0) {
      return res.status(400).json({ message: "ID tờ khai không hợp lệ" });
    }

    // Kiểm tra tờ khai tồn tại và chưa gửi
    const toKhai = await prisma.to_khai_hai_quan.findUnique({
      where: { id_to_khai },
    });

    if (!toKhai) {
      return res.status(404).json({ message: "Không tìm thấy tờ khai" });
    }

    if (toKhai.trang_thai_gui === "DA_GUI") {
      return res.status(400).json({ message: "Tờ khai đã được gửi trước đó" });
    }

    // Cập nhật trạng thái thành ĐÃ GỬI + ngày khai báo thực tế
    const updated = await prisma.to_khai_hai_quan.update({
      where: { id_to_khai },
      data: {
        trang_thai_gui: "DA_GUI",
        ngay_khai_bao: new Date(), // ngày gửi thực tế
      },
    });

    res.status(200).json({
      message: "Khai báo tờ khai thành công! Trạng thái: Đã gửi",
      data: updated,
    });
  } catch (error) {
    console.error("Khai báo IDA lỗi:", error);
    res.status(500).json({
      message: "Lỗi khi khai báo tờ khai",
      error: error.message,
    });
  }
};