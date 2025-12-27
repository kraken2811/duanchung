const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * 1. Load toàn bộ dữ liệu IDC (3 tab)
 */
const getIDCDetail = async (so_to_khai) => {
  return prisma.to_khai_hai_quan.findFirst({
    where: { 
      so_to_khai,
      trang_thai_gui: {
        in: ["CHO_GUI", "TU_CHOI"],
      },
    },
    include: {
      cong_ty: true,

      hop_dong: {
        select: {
            so_hop_dong: true,
            tong_gia_tri: true
        }
      },

      chi_tiet_to_khai: {
        orderBy: { so_dong: "asc" },
      },

      sua_doi: {
        orderBy: { created_at: "desc" },
        take: 1,
      },

      snapshot: {
        orderBy: { created_at: "desc" },
        take: 1,
      },

      lich_su_trang_thai: {
        orderBy: { ngay_thay_doi: "desc" },
      },
    },
  });
};

/**
 * 2. Tạo snapshot lần đầu
 */
const createSnapshotIfNotExists = async (id_to_khai, data) => {
  const exists = await prisma.snapshot.findFirst({
    where: { id_to_khai },
  });

  if (exists) return exists;

  return prisma.snapshot.create({
    data: {
      id_to_khai,
      du_lieu_json: data,
    },
  });
};

/**
 * 3. Update chi tiết hàng + audit log
 */
const updateChiTietWithAudit = async (id_chi_tiet, data, userId) => {
  return prisma.$transaction(async (tx) => {
    const oldData = await tx.chi_tiet_to_khai.findUnique({
      where: { id_chi_tiet },
    });

    if (!oldData) {
      throw new Error("Không tìm thấy chi tiết tờ khai");
    }

    const newData = await tx.chi_tiet_to_khai.update({
      where: { id_chi_tiet },
      data,
    });

    if (userId) {
      await tx.audit_log.create({
        data: {
          ten_bang: "chi_tiet_to_khai",
          id_ban_ghi: id_chi_tiet,
          hanh_dong: "SUA",
          du_lieu_cu: JSON.stringify(oldData),
          du_lieu_moi: JSON.stringify(newData),
          nguoi_dung: {
            connect: { id_user: userId },
          },
        },
      });
    }

    return newData;
  });
};

/**
 * 4. Lưu thông tin sửa đổi IDC
 */
const saveIDCSuaDoi = (data) => {
  const lyDo =
    data.ly_do_sua ??
    data.form?.modification?.reason;

  if (!lyDo || lyDo.trim().length < 10) {
    throw new Error("Lý do sửa đổi là bắt buộc");
  }
  return prisma.$transaction(async (tx) => {
    const suaDoi = await tx.sua_doi.create({
      data: {
        to_khai_hai_quan: {
          connect: { id_to_khai: data.id_to_khai },
        },
        ma_phan_loai_sua: data.ma_phan_loai_sua,
        ngay_yeu_cau: new Date(),
        ly_do_sua: data.ly_do_sua,
      },
    });

    const snapshot = await tx.snapshot.create({
      data: {
        to_khai_hai_quan: {
          connect: { id_to_khai: data.id_to_khai },
        },
        du_lieu_json: data.du_lieu_sua_doi,
      },
    });

    return { suaDoi, snapshot };
  });
};

/**
 * 5. Gửi IDC
 */
const guiIDC = async (id_to_khai, userId) => {
  const tk = await prisma.to_khai_hai_quan.findUnique({
    where: { id_to_khai },
  });

  return prisma.$transaction(async (tx) => {
    await tx.lich_su_trang_thai.create({
      data: {
        id_to_khai,
        trang_thai_cu: tk.trang_thai_gui,
        trang_thai_moi: "SUA_IDC",
        nguoi_thay_doi: userId,
      },
    });

    return tx.to_khai_hai_quan.update({
      where: { id_to_khai },
      data: { trang_thai_gui: "DA_GUI" },
    });
  });
};

/**
 * 6. Phản hồi hải quan
 */
const phanHoiHaiQuan = async (id_to_khai, ket_qua, noi_dung) => {
  return prisma.$transaction(async (tx) => {
    await tx.phan_hoi_hai_quan.create({
      data: {
        id_to_khai,
        loai_thong_diep: "IDC",
        noi_dung_thong_diep: noi_dung,
      },
    });

    await tx.lich_su_trang_thai.create({
      data: {
        id_to_khai,
        trang_thai_cu: "SUA_IDC",
        trang_thai_moi: ket_qua,
        ghi_chu: noi_dung,
      },
    });
  });
};

module.exports = {
  getIDCDetail,
  createSnapshotIfNotExists,
  updateChiTietWithAudit,
  saveIDCSuaDoi,
  guiIDC,
  phanHoiHaiQuan,
};
