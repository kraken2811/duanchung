const prisma = require("../prisma/client");

/* =====================================================
   1. TẠO TỜ KHAI EDA (GEN 1)
===================================================== */
exports.createEDA = async (req, res) => {
  try {
    const {
      loai_to_khai,
      ma_cuc_hai_quan,
      ngay_khai_bao,
      nguoi_tao,
      id_cong_ty,
    } = req.body;

    const eda = await prisma.to_khai_hai_quan.create({
      data: {
        loai_to_khai,
        phan_loai: "EDA",
        trang_thai_gui: "CHO_GUI",
        ma_cuc_hai_quan,
        ngay_khai_bao,
        id_cong_ty,
        nguoi_tao,
      },
    });

    return res.json({
      message: "Tạo EDA thành công",
      id_to_khai: eda.id_to_khai,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi tạo EDA" });
  }
};

/* =====================================================
   2. LƯU TOÀN BỘ GEN 2 + HÀNG + CONTAINER
===================================================== */
exports.updateEDA = async (req, res) => {
  const { id } = req.params;
  const { invoice, contract, transport, containers, goods } = req.body;

  try {
    await prisma.$transaction(async (tx) => {
      /* ================= LO HÀNG ================= */
      const loHang = await tx.lo_hang.create({
        data: {
          cang_xep_hang: transport?.portOfLoading,
          cang_do_hang: transport?.portOfDischarge,
          ngay_du_kien_xuat: transport?.estimatedExportDate,
          ngay_du_kien_nhap: transport?.estimatedImportDate,
          mo_ta: transport?.description,
        },
      });

      await tx.to_khai_hai_quan.update({
        where: { id_to_khai: Number(id) },
        data: { id_lo_hang: loHang.id_lo_hang },
      });

      /* ================= HÓA ĐƠN ================= */
      if (invoice) {
        await tx.hoa_don.create({
          data: {
            so_hoa_don: invoice.number,
            ngay_hoa_don: invoice.date,
            tong_tien: invoice.totalValue,
            ma_ngoai_te: invoice.currency,
            dieu_kien_giao_hang: invoice.incoterms,
            id_lo_hang: loHang.id_lo_hang,
          },
        });
      }

      /* ================= HỢP ĐỒNG ================= */
      if (contract) {
        await tx.hop_dong.create({
          data: {
            so_hop_dong: contract.number,
            ngay_ky: contract.date,
            loai_hop_dong: contract.type,
          },
        });
      }

      /* ================= CONTAINER ================= */
      if (containers?.length) {
        for (const c of containers) {
          await tx.container.create({
            data: {
              so_container: c.containerNo,
              loai_container: c.containerType,
              trong_luong_brut: c.grossWeight,
              id_lo_hang: loHang.id_lo_hang,
            },
          });
        }
      }

      /* ================= HÀNG HÓA ================= */
      if (goods?.length) {
        let stt = 1;
        for (const g of goods) {
          await tx.chi_tiet_to_khai.create({
            data: {
              so_dong: stt++,
              ma_hs: g.hsCode,
              mo_ta_hang_hoa: g.description,
              so_luong: g.quantity,
              don_gia: g.unitPrice,
              tong_gia_tri: g.totalValue,
              ma_quoc_gia: g.originCountry,
              id_to_khai: Number(id),
            },
          });
        }
      }
    });

    res.json({ message: "Lưu EDA thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi lưu EDA" });
  }
};

/* =====================================================
   3. KHAI BÁO (SUBMIT)
===================================================== */
exports.submitEDA = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.to_khai_hai_quan.update({
        where: { id_to_khai: Number(id) },
        data: {
          trang_thai_gui: "DA_GUI",
          ngay_khai_bao: new Date(),
        },
      });

      await tx.phan_hoi_hai_quan.create({
        data: {
          id_to_khai: Number(id),
          ma_thong_diep: "EDA_ACCEPT",
          mau_kenh: "VANG",
          noi_dung_thong_diep:
            "Tờ khai đã tiếp nhận – chờ kiểm tra hồ sơ",
        },
      });

      await tx.lich_su_trang_thai.create({
        data: {
          id_to_khai: Number(id),
          trang_thai_cu: "CHO_GUI",
          trang_thai_moi: "DA_GUI",
        },
      });
    });

    res.json({ message: "Khai báo thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi khai báo" });
  }
};
exports.getEDA = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await prisma.to_khai_hai_quan.findUnique({
      where: { id_to_khai: Number(id) },
      include: {
        lo_hang: {
          include: {
            container: true,
            hoa_don: true,
          },
        },
        chi_tiet_to_khai: true,
        phan_hoi_hai_quan: true,
        lich_su_trang_thai: true,
      },
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Không lấy được EDA" });
  }
};
exports.saveContainers = async (req, res) => {
  const { id } = req.params;
  const { containers } = req.body;

  try {
    await prisma.$transaction(async (tx) => {
      // Xoá cũ
      await tx.container.deleteMany({
        where: { id_to_khai: Number(id) },
      });

      // Thêm mới
      for (const c of containers) {
        await tx.container.create({
          data: {
            so_container: c.so_container,
            so_seal: c.so_seal,
            loai_container: c.loai_container,
            trong_luong_brut: c.trong_luong,
            id_to_khai: Number(id),
          },
        });
      }
    });

    res.json({ message: "Lưu container thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi lưu container" });
  }
};