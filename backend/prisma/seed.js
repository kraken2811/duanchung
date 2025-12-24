const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- UTILS ---
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

async function main() {
  console.log("🌱 START FULL SEED");

  const vaiTroAdmin = await prisma.vai_tro.create({
    data: { ma_vai_tro: "ADMIN", ten_vai_tro: "Quản trị" },
  });

  const congTy = await prisma.cong_ty.create({
    data: {
      ma_so_thue: "0109999999",
      ten_cong_ty: "CÔNG TY TEST ECUS",
      dia_chi: "Hà Nội",
    },
  });

  const user = await prisma.nguoi_dung.create({
    data: {
      ten_dang_nhap: "admin",
      mat_khau: "$2b$10$0yvEJKywjDnm.CMarlN7neQHHv3vrVJmoPuTPsY3HvR5O7gNhVSbi",
      ho_ten: "Admin ECUS",
      id_vai_tro: vaiTroAdmin.id_vai_tro,
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  await prisma.refresh_token.create({
    data: {
      token: "refresh-token-demo",
      id_nguoi_dung: user.id_nguoi_dung,
      expires_at: new Date(Date.now() + 7 * 86400000),
    },
  });

  const loaiHinh = await prisma.loai_hinh_dac_biet.create({
    data: {
      ma_loai_hinh: "A11",
      ten_loai_hinh: "Nhập kinh doanh",
    },
  });

  /* ===================== ĐỐI TÁC ===================== */

  const exporter = await prisma.doi_tac.create({
    data: {
      ten_doi_tac: "ABC EXPORT",
      loai_doi_tac: "XUAT_KHAU",
      ma_quoc_gia: "CN",
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  const agent = await prisma.doi_tac.create({
    data: {
      ten_doi_tac: "ĐẠI LÝ HẢI QUAN",
      loai_doi_tac: "DAI_LY",
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  /* ===================== HS / BIỂU THUẾ ===================== */

  const maHS = await prisma.ma_hs.create({
    data: {
      ma_hs: "84713020",
      mo_ta: "Máy tính xách tay",
      thue_nhap_khau: 10,
      thue_vat: 10,
    },
  });

  const bieuThue = await prisma.bieu_thue.create({
    data: {
      ma_hs: maHS.ma_hs,
      hieu_luc_tu: new Date("2020-01-01"),
      thue_suat: 10,
      thue_vat: 10,
    },
  });

  /* ===================== HỢP ĐỒNG ===================== */

  const hopDong = await prisma.hop_dong.create({
    data: {
      id_hop_dong: "HD-001",
      so_hop_dong: "HD-ECUS-001",
      loai_hop_dong: "NHAP_KHAU",
      id_cong_ty: congTy.id_cong_ty,
      id_doi_tac: exporter.id_doi_tac,
      nguoi_tao: user.id_nguoi_dung,
    },
  });

  /* ===================== LÔ HÀNG ===================== */

  const loHang = await prisma.lo_hang.create({
    data: {
      so_lo_hang: "LH-001",
      id_cong_ty: congTy.id_cong_ty,
      id_dai_ly: agent.id_doi_tac,
      nguoi_tao: user.id_nguoi_dung,
    },
  });

  /* ===================== IDA ===================== */

  const toKhai = await prisma.to_khai_hai_quan.create({
    data: {
      so_to_khai: "IDA001",
      loai_to_khai: "IDA",
      phan_loai: "IDA",
      trang_thai_gui: "NHAP",
      id_cong_ty: congTy.id_cong_ty,
      id_loai_hinh: loaiHinh.id_loai_hinh,
      id_hop_dong: hopDong.id_hop_dong,
      id_lo_hang: loHang.id_lo_hang,
      nguoi_tao: user.id_nguoi_dung,
    },
  });

  /* ===================== CHI TIẾT TỜ KHAI ===================== */

  await prisma.chi_tiet_to_khai.create({
    data: {
      so_dong: 1,
      ma_hs: maHS.ma_hs,
      so_luong: 10,
      don_gia: 1000,
      tong_gia_tri: 10000,
      id_to_khai: toKhai.id_to_khai,
      id_bieu_thue: bieuThue.id_bieu_thue,
    },
  });

  /* ===================== HÓA ĐƠN ===================== */

  await prisma.hoa_don.create({
    data: {
      so_hoa_don: "INV-001",
      tong_tien: 10000,
      id_lo_hang: loHang.id_lo_hang,
      id_nguoi_ban: exporter.id_doi_tac,
    },
  });

  /* ===================== TRỊ GIÁ ===================== */

  const triGia = await prisma.to_khai_tri_gia.create({
    data: {
      id_to_khai_hai_quan: toKhai.id_to_khai,
      gia_co_so_hieu_chinh: 10000,
      nguoi_tao: user.id_nguoi_dung,
    },
  });

  await prisma.khoan_dieu_chinh_tri_gia.create({
    data: {
      ma_ten: "PHI_VAN_CHUYEN",
      tri_gia_dieu_chinh: 500,
      id_to_khai_tri_gia: triGia.id_to_khai_tri_gia,
    },
  });

  /* ===================== TÀI LIỆU ===================== */

  await prisma.tai_lieu.createMany({
    data: [
      {
        loai_tai_lieu: "INVOICE",
        ten_file: "invoice.pdf",
        id_to_khai: toKhai.id_to_khai,
        nguoi_tai_len: user.id_nguoi_dung,
      },
      {
        loai_tai_lieu: "CONTRACT",
        ten_file: "contract.pdf",
        id_to_khai: toKhai.id_to_khai,
        nguoi_tai_len: user.id_nguoi_dung,
      },
    ],
  });

  /* ===================== LỊCH SỬ ===================== */

  await prisma.lich_su_trang_thai.create({
    data: {
      trang_thai_moi: "NHAP",
      id_to_khai: toKhai.id_to_khai,
      nguoi_thay_doi: user.id_nguoi_dung,
    },
  });

  /* ===================== THÔNG BÁO ===================== */

  await prisma.thong_bao_he_thong.create({
    data: {
      tieu_de: "Tạo IDA thành công",
      id_nguoi_dung: user.id_nguoi_dung,
    },
  });

  console.log("✅ FULL SEED DONE");
}

main()
  .catch(e => {
    console.error("❌ SEED ERROR", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
