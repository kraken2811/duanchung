const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lấy tất cả tờ khai
 */
const getAll = () => {
  return prisma.to_khai_hai_quan.findMany({
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Lấy tờ khai theo ID
 */
const getById = (id_to_khai) => {
  return prisma.to_khai_hai_quan.findUnique({
    where: { id_to_khai },
  });
};

/**
 * Lấy dữ liệu hiển thị màn IDB (Khai chính thức)
 * @param {string} so_to_khai
 */
const getIDBData = async (so_to_khai) => {
  const toKhai = await prisma.to_khai_hai_quan.findUnique({
    where: { so_to_khai },
    select: { id_to_khai: true },
  });

  if (!toKhai) return null;

  return prisma.to_khai_hai_quan.findUnique({
    where: { id_to_khai: toKhai.id_to_khai },
    select: {
      id_to_khai: true,
      so_to_khai: true,
      loai_to_khai: true,
      phan_loai: true,
      mau_kenh: true,
      trang_thai_gui: true,
      so_tien_thue: true,
      ngay_khai_bao: true,

      to_khai_tri_gia: {
        select: {
          gia_co_so_hieu_chinh: true,
          tong_he_so_phan_bo: true,
          nguoi_nop_thue: true,
        },
      },

      chi_tiet_to_khai: {
        orderBy: { so_dong: "asc" },
        select: {
          so_dong: true,
          ma_hs: true,
          mo_ta_hang_hoa: true,
          so_luong: true,
          don_vi_tinh: true,
          don_gia: true,
          tong_gia_tri: true,
          tien_thue: true,
          tien_vat: true,
          thue_bo_sung: true,
        },
      },

      taiLieus: {
        select: {
          ten_file: true,
          duong_dan: true,
        },
      },
    },
  });
};

/**
 * Lấy tờ khai theo lô hàng
 */
const getByLoHang = (id_lo_hang) => {
  return prisma.to_khai_hai_quan.findMany({
    where: { id_lo_hang },
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Lấy tờ khai theo công ty
 */
const getByCongTy = (id_cong_ty) => {
  return prisma.to_khai_hai_quan.findMany({
    where: { id_cong_ty },
    orderBy: {
      ngay_tao: 'desc',
    },
  });
};

/**
 * Tạo mới tờ khai hải quan
 */
async function insert(dto) {
  return prisma.$transaction(async (tx) => {

    let loHang = null;

    if (dto.loHang) {
      loHang = await tx.lo_hang.create({
        data: dto.loHang,
      });
    }

    const toKhai = await tx.to_khai_hai_quan.create({
      data: {
        ...dto.toKhai,
        id_lo_hang: loHang?.id_lo_hang ?? null,
      },
    });

    if (dto.hoaDon) {
      await tx.hoa_don.create({
        data: {
          ...dto.hoaDon,
          id_lo_hang: loHang?.id_lo_hang ?? null,
        },
      });
    }

    if (dto.triGia) {
      await tx.to_khai_tri_gia.create({
        data: {
          ...dto.triGia,
          id_to_khai_hai_quan: toKhai.id_to_khai,
        },
      });
    }

    if (Array.isArray(dto.chiTiet) && dto.chiTiet.length > 0) {
      await tx.chi_tiet_to_khai.createMany({
        data: dto.chiTiet.map((item, index) => ({
          ...item,
          so_dong: index + 1,
          id_to_khai: toKhai.id_to_khai,
        })),
      });
    }

    if (Array.isArray(dto.taiLieu) && dto.taiLieu.length > 0) {
      await tx.tai_lieu.createMany({
        data: dto.taiLieu.map(file => ({
          ...file,
          id_to_khai: toKhai.id_to_khai,
        })),
      });
    }

    return toKhai;
  });
}

/**
 * Cập nhật tờ khai
 * ⚠️ Chỉ cho phép khi chưa gửi VNACCS
 */
const update = (id_to_khai, data) => {
  return prisma.to_khai_hai_quan.update({
    where: { id_to_khai },
    data: {
      loai_to_khai: data.loai_to_khai,
      id_loai_hinh: data.id_loai_hinh,
      trang_thai_gui: data.trang_thai_gui,
      so_tien_thue: data.so_tien_thue,
      phan_loai: data.phan_loai,
      mau_kenh: data.mau_kenh,
      so_thong_bao_thue: data.so_thong_bao_thue,
      ngay_cap_nhat: new Date(),
    },
  });
};

/**
 * Cập nhật trạng thái sau phản hồi VNACCS
 */
const updateVNACCS = (id_to_khai, vnaccsData) => {
  return prisma.to_khai_hai_quan.update({
    where: { id_to_khai },
    data: {
      trang_thai_gui: vnaccsData.trang_thai_gui,
      ma_thong_diep_vnacss: vnaccsData.ma_thong_diep_vnacss,
      so_tiep_nhan_vnacss: vnaccsData.so_tiep_nhan_vnacss,
      mau_kenh: vnaccsData.mau_kenh,
      phan_loai: vnaccsData.phan_loai,
      ngay_cap_nhat: new Date(),
    },
  });
};

/**
 * ❌ TUYỆT ĐỐI KHÔNG DELETE TỜ KHAI
 * Nếu cần → HỦY / VOID
 */
const remove = (id_to_khai) => {
  return prisma.to_khai_hai_quan.delete({
    where: { id_to_khai },
  });
};

const getList = async (query) => {
  const {
    so_to_khai,
    loai_hinh,
    trang_thai,
    tu_ngay,
    den_ngay,
    doi_tac,
    page =1,
    limit = 10,
  } = query;

  const where = {};

  if (so_to_khai) {
    where.so_to_khai = { contains: so_to_khai };
  }

  if (trang_thai) {
    where.trang_thai_gui = trang_thai;
  }

  if (loai_hinh) {
    where.id_loai_hinh = Number(loai_hinh);
  }

  if (tu_ngay || den_ngay) {
    where.ngay_khai_bao = {};
    if (tu_ngay) {
      const fromDate = new Date(tu_ngay);
      fromDate.setHours(0, 0, 0, 0);
      where.ngay_khai_bao.gte = fromDate;
    }

    if (den_ngay) {
      const toDate = new Date(den_ngay);
      toDate.setHours(23, 59, 59, 999);
      where.ngay_khai_bao.lte = toDate;
    }
  }

  if (doi_tac) {
    where.cong_ty = {
      ten_cong_ty: { contains: doi_tac },
    }
  }

  const skip = (Number(page) - 1) * Number(limit);

  return Promise.all([
    prisma.to_khai_hai_quan.count({ where }),
    prisma.to_khai_hai_quan.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { ngay_tao: 'desc' },
      include: {
        cong_ty: true,
        loai_hinh_dac_biet: true,
      },
    }),
  ]).then (([total, data]) => { 
    return { total, data  };
  });
}

const statistics = async () => {
  const [
    total,
    daThongQuan,
    choXuLy,
    yeuCauSua,
  ] = await Promise.all([
    prisma.to_khai_hai_quan.count(),
    prisma.to_khai_hai_quan.count({
      where: { trang_thai_gui: 'DA_THONG_QUAN' },
    }),
    prisma.to_khai_hai_quan.count({
      where: { trang_thai_gui: { in: ["NHAP", "CHO_GUI"]} },
    }),
    prisma.to_khai_hai_quan.count({
      where: { trang_thai_gui: 'YEU_CAU_SUA' },
    }),
  ]);

  return {
    total,
    daThongQuan,
    choXuLy,
    yeuCauSua,
  };
}

module.exports = {
  getAll,
  getById,
  getIDBData,
  getByLoHang,
  getByCongTy,
  insert,
  update,
  updateVNACCS,
  remove,
  getList,
  statistics,
};
