const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Load dữ liệu IDE (Hủy tờ khai)
 * Giống pattern getIDCDetail
 */
const getIDEDetail = async (so_to_khai) => {
  return prisma.to_khai_hai_quan.findFirst({
    where: {
      so_to_khai,
      trang_thai_gui: {
        in: ["DA_GUI", "TU_CHOI", "DA_TIEP_NHAN"],
      },
    },
    include: {
      cong_ty: true,

      loai_hinh_dac_biet: true,

      sua_doi: {
        where: {
          ma_phan_loai_sua: "IDE",
        },
        orderBy: { created_at: "desc" },
        take: 1,
      },

      taiLieus: {
        where: {
          phan_loai_khai_bao: "IDE",
        },
        orderBy: { ngay_tai_len: "desc" },
      },

      lich_su_trang_thai: {
        orderBy: { ngay_thay_doi: "desc" },
      },
    },
  });
};

/**
 * Tạo yêu cầu hủy (IDE – nháp)
 */
const createIDE = async (data) => {
  return prisma.sua_doi.create({
    data: {
      id_to_khai: data.id_to_khai,
      ma_phan_loai_sua: "IDE",
      ngay_yeu_cau: data.ngay_yeu_cau || new Date(),
      ly_do_sua: data.ly_do_sua,
      phan_loai_kiem_tra: data.ma_ly_do_huy,
    },
  });
};

/**
 * Gửi yêu cầu hủy
 */
const guiIDE = async (id_sua_doi, id_nguoi_dung) => {
  return prisma.$transaction(async (tx) => {
    const suaDoi = await tx.sua_doi.findUnique({
      where: { id_sua_doi },
    });

    if (!suaDoi) {
      throw new Error("Không tìm thấy yêu cầu hủy (IDE)");
    }

    if (suaDoi.ma_phan_loai_sua !== "IDE") {
      throw new Error("Không phải yêu cầu hủy tờ khai");
    }

    const toKhai = await tx.to_khai_hai_quan.findUnique({
      where: { id_to_khai: suaDoi.id_to_khai },
      select: {
        id_to_khai: true,
        so_to_khai: true,
        trang_thai_gui: true,
      },
    });

    if (!toKhai) {
      throw new Error("Không tìm thấy tờ khai");
    }

    // ❌ Đã hủy
    if (toKhai.trang_thai_gui === "HUY") {
      throw new Error("Tờ khai đã bị hủy");
    }

    // ❌ Đã thông quan
    if (toKhai.trang_thai_gui === "DA_THONG_QUAN") {
      throw new Error("Tờ khai đã thông quan, không thể hủy");
    }
    
    await tx.sua_doi.update({
      where: { id_sua_doi },
      data: {
        ngay_yeu_cau: new Date(),
      },
    });

    await tx.to_khai_hai_quan.update({
      where: { id_to_khai: toKhai.id_to_khai },
      data: {
        trang_thai_gui: "HUY",
      },
    });

    await tx.lich_su_trang_thai.create({
      data: {
        id_to_khai: toKhai.id_to_khai,
        trang_thai_cu: toKhai.trang_thai_gui,
        trang_thai_moi: "HUY",
        ghi_chu: "Hủy tờ khai (IDE)",
        nguoi_thay_doi: id_nguoi_dung,
      },
    });

    return {
      message: "Hủy tờ khai thành công",
      so_to_khai: toKhai.so_to_khai,
    };
  });
};

/**
 * Danh sách tờ khai dùng cho dropdown IDE
 */
const getIDEList = async (keyword = "") => {
  return prisma.to_khai_hai_quan.findMany({
    where: {
      trang_thai_gui: {
        in: ["DA_GUI", "TU_CHOI", "DA_TIEP_NHAN"],
      },
      NOT: {
        trang_thai_gui: "HUY",
      },
      ...(keyword
        ? {
            so_to_khai: {
              contains: keyword,
            },
          }
        : {}),
    },
    select: {
      id_to_khai: true,
      so_to_khai: true,
      ngay_khai_bao: true,
    },
    orderBy: {
      ngay_khai_bao: "desc",
    },
    take: 20,
  });
};

module.exports = {
  getIDEDetail,
  createIDE,
  guiIDE,
  getIDEList,
};
