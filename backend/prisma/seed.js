const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// --- UTILS ---
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

async function main() {
  console.log("🌱 START FULL SEED");

  // --- VAI TRÒ ---
  let vaiTroAdmin = await prisma.vai_tro.findUnique({
    where: { ma_vai_tro: "ADMIN" }
  });
  if (!vaiTroAdmin) {
    vaiTroAdmin = await prisma.vai_tro.create({
      data: { ma_vai_tro: "ADMIN", ten_vai_tro: "Quản trị" },
    });
  }

  let vaiTroUser = await prisma.vai_tro.findUnique({
    where: { ma_vai_tro: "USER" }
  });
  if (!vaiTroUser) {
    vaiTroUser = await prisma.vai_tro.create({
      data: { ma_vai_tro: "USER", ten_vai_tro: "Người dùng" },
    });
  }

  // --- CÔNG TY ---
  const congTy = await prisma.cong_ty.create({
    data: {
      ma_so_thue: "0109999999",
      ten_cong_ty: "CÔNG TY TEST ECUS",
      dia_chi: "Hà Nội",
      ma_quoc_gia: "VN",
      nguoi_lien_he: "Nguyễn Văn A",
      dien_thoai: "0123456789",
      email: "contact@ecus.vn",
    },
  });

  // --- NGƯỜI DÙNG ---
  const user = await prisma.nguoi_dung.create({
    data: {
      ten_dang_nhap: "admin",
      mat_khau: "$2b$10$0yvEJKywjDnm.CMarlN7neQHHv3vrVJmoPuTPsY3HvR5O7gNhVSbi",
      ho_ten: "Admin ECUS",
      email: "admin@ecus.vn",
      dien_thoai: "0987654321",
      id_vai_tro: vaiTroAdmin.id_vai_tro,
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  const user2 = await prisma.nguoi_dung.create({
    data: {
      ten_dang_nhap: "user1",
      mat_khau: "$2b$10$0yvEJKywjDnm.CMarlN7neQHHv3vrVJmoPuTPsY3HvR5O7gNhVSbi",
      ho_ten: "User One",
      email: "user1@ecus.vn",
      id_vai_tro: vaiTroUser.id_vai_tro,
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  // --- REFRESH TOKEN ---
  await prisma.refresh_token.create({
    data: {
      token: "refresh-token-demo",
      id_nguoi_dung: user.id_nguoi_dung,
      expires_at: new Date(Date.now() + 7 * 86400000),
    },
  });

  // --- QUỐC GIA ---
  const quocGiaVN = await prisma.quoc_gia.create({
    data: {
      ma_quoc_gia: "VN",
      ten_quoc_gia: "Việt Nam",
      ma_vung: "ASIA",
    },
  });

  const quocGiaCN = await prisma.quoc_gia.create({
    data: {
      ma_quoc_gia: "CN",
      ten_quoc_gia: "Trung Quốc",
      ma_vung: "ASIA",
    },
  });

  const quocGiaUS = await prisma.quoc_gia.create({
    data: {
      ma_quoc_gia: "US",
      ten_quoc_gia: "Hoa Kỳ",
      ma_vung: "AMERICA",
    },
  });

  // --- ĐỊA ĐIỂM KHO BÃI ---
  const diaDiem1 = await prisma.dia_diem_kho_bai.create({
    data: {
      ma_dia_diem: "HHN",
      ten_dia_diem: "Cảng Hải Phòng",
      dia_chi: "Hải Phòng",
      loai_dia_diem: "CANG",
      ma_cuc_hai_quan: "HP",
    },
  });

  const diaDiem2 = await prisma.dia_diem_kho_bai.create({
    data: {
      ma_dia_diem: "SGN",
      ten_dia_diem: "Cảng Sài Gòn",
      dia_chi: "TP.HCM",
      loai_dia_diem: "CANG",
      ma_cuc_hai_quan: "SG",
    },
  });

  // --- LOẠI HÌNH ĐẶC BIỆT ---
  const loaiHinh = await prisma.loai_hinh_dac_biet.create({
    data: {
      ma_loai_hinh: "A11",
      ten_loai_hinh: "Nhập kinh doanh",
      mo_ta: "Nhập hàng để kinh doanh",
    },
  });

  const loaiHinh2 = await prisma.loai_hinh_dac_biet.create({
    data: {
      ma_loai_hinh: "A12",
      ten_loai_hinh: "Nhập gia công",
      mo_ta: "Nhập nguyên liệu gia công",
    },
  });

  // --- ĐỐI TÁC ---
  const exporter = await prisma.doi_tac.create({
    data: {
      ten_doi_tac: "ABC EXPORT",
      loai_doi_tac: "XUAT_KHAU",
      ma_quoc_gia: "CN",
      dia_chi: "Shanghai, China",
      nguoi_lien_he: "John Doe",
      dien_thoai_lien_he: "+86 123456789",
      email_lien_he: "john@abc.com",
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  const importer = await prisma.doi_tac.create({
    data: {
      ten_doi_tac: "XYZ IMPORT",
      loai_doi_tac: "NHAP_KHAU",
      ma_quoc_gia: "US",
      dia_chi: "New York, USA",
      nguoi_lien_he: "Jane Smith",
      dien_thoai_lien_he: "+1 987654321",
      email_lien_he: "jane@xyz.com",
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  const agent = await prisma.doi_tac.create({
    data: {
      ten_doi_tac: "ĐẠI LÝ HẢI QUAN",
      loai_doi_tac: "DAI_LY",
      dia_chi: "Hà Nội",
      nguoi_lien_he: "Agent Contact",
      dien_thoai_lien_he: "0123456789",
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  const carrier = await prisma.doi_tac.create({
    data: {
      ten_doi_tac: "HÃNG TÀU COSCO",
      loai_doi_tac: "NHA_SAN_XUAT",
      ma_quoc_gia: "CN",
      dia_chi: "Shanghai",
      nguoi_lien_he: "Carrier Contact",
      dien_thoai_lien_he: "+86 111111111",
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  // --- LOẠI VẬN TẢI ---
  const loaiVanTai = await prisma.loai_van_tai.create({
    data: {
      ma_loai_van_tai: "SEA",
      ten_loai_van_tai: "Đường biển",
      mo_ta: "Vận tải đường biển",
    },
  });

  const loaiVanTai2 = await prisma.loai_van_tai.create({
    data: {
      ma_loai_van_tai: "AIR",
      ten_loai_van_tai: "Đường hàng không",
      mo_ta: "Vận tải đường hàng không",
    },
  });

  // --- MA HS / BIỂU THUẾ ---
  const maHS = await prisma.ma_hs.create({
    data: {
      ma_hs: "84713020",
      mo_ta: "Máy tính xách tay",
      thue_nhap_khau: 10,
      thue_vat: 10,
      thue_xuat_khau: 0,
      thue_tieu_thu_dac_biet: 0,
      thue_bao_ve_moi_truong: 0,
    },
  });

  const maHS2 = await prisma.ma_hs.create({
    data: {
      ma_hs: "85176239",
      mo_ta: "Router mạng",
      thue_nhap_khau: 5,
      thue_vat: 10,
      thue_xuat_khau: 0,
      thue_tieu_thu_dac_biet: 0,
      thue_bao_ve_moi_truong: 0,
    },
  });

  const bieuThue = await prisma.bieu_thue.create({
    data: {
      ma_hs: maHS.ma_hs,
      hieu_luc_tu: new Date("2020-01-01"),
      hieu_luc_den: new Date("2025-12-31"),
      thue_suat: 10,
      thue_vat: 10,
      ghi_chu: "Thuế suất chuẩn",
    },
  });

  const bieuThue2 = await prisma.bieu_thue.create({
    data: {
      ma_hs: maHS2.ma_hs,
      hieu_luc_tu: new Date("2020-01-01"),
      hieu_luc_den: new Date("2025-12-31"),
      thue_suat: 5,
      thue_vat: 10,
      ghi_chu: "Thuế suất ưu đãi",
    },
  });

  // --- HỢP ĐỒNG ---
  const hopDong = await prisma.hop_dong.create({
    data: {
      id_hop_dong: "HD-001",
      so_hop_dong: "HD-ECUS-001",
      loai_hop_dong: "NHAP_KHAU",
      ngay_ky: new Date("2023-01-01"),
      ngay_het_han: new Date("2024-01-01"),
      tong_gia_tri: 100000,
      phi_gia_cong: 5000,
      ma_ngoai_te: "USD",
      dieu_kien_thanh_toan: "L/C",
      ma_cuc_hai_quan: "HP",
      id_cong_ty: congTy.id_cong_ty,
      id_doi_tac: exporter.id_doi_tac,
      nguoi_tao: user.id_nguoi_dung,
    },
  });

  const hopDong2 = await prisma.hop_dong.create({
    data: {
      id_hop_dong: "HD-002",
      so_hop_dong: "HD-ECUS-002",
      loai_hop_dong: "XUAT_KHAU",
      ngay_ky: new Date("2023-02-01"),
      ngay_het_han: new Date("2024-02-01"),
      tong_gia_tri: 200000,
      ma_ngoai_te: "USD",
      dieu_kien_thanh_toan: "TTR",
      ma_cuc_hai_quan: "SG",
      id_cong_ty: congTy.id_cong_ty,
      id_doi_tac: importer.id_doi_tac,
      nguoi_tao: user2.id_nguoi_dung,
    },
  });

  // --- VẬT LIỆU HỢP ĐỒNG ---
  await prisma.vat_lieu_hop_dong.create({
    data: {
      ma_vat_lieu: "VL001",
      ten_vat_lieu: "Màn hình LCD",
      don_vi_tinh: "Cái",
      so_luong: 100,
      nguon_goc: "CN",
      ma_hs: maHS.ma_hs,
      don_gia: 500,
      tong_gia_tri: 50000,
      id_hop_dong: hopDong.id_hop_dong,
    },
  });

  // --- SẢN PHẨM HỢP ĐỒNG ---
  await prisma.san_pham_hop_dong.create({
    data: {
      ma_san_pham: "SP001",
      ten_san_pham: "Máy tính xách tay",
      don_vi_tinh: "Cái",
      so_luong: 50,
      ma_hs: maHS.ma_hs,
      don_gia: 1000,
      tong_gia_tri: 50000,
      id_hop_dong: hopDong.id_hop_dong,
    },
  });

  // --- DANH MỤC ---
  await prisma.danh_muc.create({
    data: {
      danh_muc: 10.5,
      ty_le_hao_hut: 5.0,
      ma_lenh_san_xuat: "LSX001",
      nam_tai_chinh: 2023,
      id_hop_dong: hopDong.id_hop_dong,
      id_san_pham: 1, // Assuming the created san_pham_hop_dong has id 1
    },
  });

  // --- PHỤ LỤC HỢP ĐỒNG ---
  await prisma.phu_luc_hop_dong.create({
    data: {
      so_phu_luc: "PL001",
      ngay_phu_luc: new Date("2023-06-01"),
      mo_ta: "Điều chỉnh giá",
      loai_thay_doi: "GIA",
      id_hop_dong: hopDong.id_hop_dong,
      nguoi_tao: user.id_nguoi_dung,
    },
  });

  // --- VĂN BẢN GIẤY PHÉP ---
  await prisma.van_ban_giay_phep.create({
    data: {
      ma_so: "GP001",
      loai: "IMPORT_LICENSE",
      id_hop_dong: hopDong.id_hop_dong,
    },
  });

  // --- LÔ HÀNG ---
  const loHang = await prisma.lo_hang.create({
    data: {
      so_lo_hang: "LH-001",
      cang_xep_hang: "Shanghai",
      cang_do_hang: "Hai Phong",
      ngay_du_kien_xuat: new Date("2023-03-01"),
      ngay_du_kien_nhap: new Date("2023-03-15"),
      tong_gia_tri: 100000,
      ma_ngoai_te: "USD",
      mo_ta: "Lô hàng máy tính",
      id_hop_dong: hopDong.id_hop_dong,
      id_cong_ty: congTy.id_cong_ty,
      id_dai_ly: agent.id_doi_tac,
      id_van_chuyen: carrier.id_doi_tac,
      id_loai_van_tai: loaiVanTai.id_loai_van_tai,
      nguoi_tao: user.id_nguoi_dung,
    },
  });

  // --- HÓA ĐƠN ---
  await prisma.hoa_don.create({
    data: {
      so_hoa_don: "INV-001",
      ngay_hoa_don: new Date("2023-02-15"),
      tong_tien: 100000,
      ma_ngoai_te: "USD",
      dieu_kien_giao_hang: "FOB",
      id_lo_hang: loHang.id_lo_hang,
      id_nguoi_ban: exporter.id_doi_tac,
      id_nguoi_mua: congTy.id_cong_ty, // Note: This should be a doi_tac, but using cong_ty for demo
    },
  });

  // --- VẬN ĐƠN ---
  await prisma.van_don.create({
    data: {
      so_van_don: "BL-001",
      ten_tau: "COSCO SHIPPING",
      hanh_trinh: "Shanghai - Hai Phong",
      so_container: 5,
      id_lo_hang: loHang.id_lo_hang,
    },
  });

  // --- CONTAINER ---
  await prisma.container.create({
    data: {
      so_container: "CONT001",
      so_chi: "SEAL001",
      loai_container: "20FT",
      trong_luong_brut: 20000,
      trong_luong_net: 18000,
      id_lo_hang: loHang.id_lo_hang,
    },
  });

  // --- TỜ KHAI HẢI QUAN ---
  const toKhai = await prisma.to_khai_hai_quan.create({
    data: {
      so_to_khai: "IDA001",
      loai_to_khai: "IDA",
      trang_thai_gui: "NHAP",
      ma_thong_diep_vnacss: "MSG001",
      so_tiep_nhan_vnacss: "REC001",
      mau_kenh: "IDA",
      so_thong_bao_thue: "TB001",
      phan_loai: "IDA",
      so_tien_thue: 10000,
      ma_cuc_hai_quan: "HP",
      ngay_khai_bao: new Date("2023-03-10"),
      id_lo_hang: loHang.id_lo_hang,
      id_loai_hinh: loaiHinh.id_loai_hinh,
      id_hop_dong: hopDong.id_hop_dong,
      id_cong_ty: congTy.id_cong_ty,
      nguoi_tao: user.id_nguoi_dung,
    },
  });

  // --- CHI TIẾT TỜ KHAI ---
  await prisma.chi_tiet_to_khai.create({
    data: {
      so_dong: 1,
      ma_hs: maHS.ma_hs,
      mo_ta_hang_hoa: "Máy tính xách tay",
      so_luong: 50,
      don_vi_tinh: "Cái",
      don_gia: 1000,
      tong_gia_tri: 50000,
      ma_ngoai_te: "USD",
      ma_quoc_gia: "CN",
      tien_thue: 5000,
      tien_vat: 5000,
      id_to_khai: toKhai.id_to_khai,
      id_bieu_thue: bieuThue.id_bieu_thue,
    },
  });

  // --- TỜ KHAI TRỊ GIÁ ---
  const triGia = await prisma.to_khai_tri_gia.create({
    data: {
      ma_phan_loai_khai_tri_gia: "IMPORT",
      so_tiep_nhan_to_khai_tri_gia_tong_hop: "TG001",
      ma_tien_te: "USD",
      gia_co_so_hieu_chinh: 50000,
      tong_he_so_phan_bo: 1.0,
      nguoi_nop_thue: "Công ty ECUS",
      id_to_khai_hai_quan: toKhai.id_to_khai,
      nguoi_tao: user.id_nguoi_dung,
    },
  });

  // --- KHOẢN ĐIỀU CHỈNH TRỊ GIÁ ---
  const khoanDieuChinh = await prisma.khoan_dieu_chinh_tri_gia.create({
    data: {
      stt: 1,
      ma_ten: "PHI_VAN_CHUYEN",
      ma_phan_loai: "COST",
      ma_tien_te: "USD",
      tri_gia_dieu_chinh: 500,
      tong_he_so_phan_bo: 0.01,
      loai_dieu_chinh: "TANG",
      id_to_khai_tri_gia: triGia.id_to_khai_tri_gia,
    },
  });

  // --- CHI TIẾT ĐIỀU CHỈNH TRỊ GIÁ ---
  await prisma.chi_tiet_dieu_chinh_tri_gia.create({
    data: {
      ma_loai: "FREIGHT",
      ma_tien_te: "USD",
      phi: 500,
      so_dang_ky: "REF001",
      mo_ta: "Phí vận chuyển",
      id_khoan_dieu_chinh: khoanDieuChinh.id_khoan_dieu_chinh,
    },
  });

  // --- PHẢN HỒI HẢI QUAN ---
  await prisma.phan_hoi_hai_quan.create({
    data: {
      loai_thong_diep: "ACCEPT",
      so_tiep_nhan_vnacss: "REC001",
      mau_kenh: "IDA",
      ma_thong_diep: "MSG001",
      noi_dung_thong_diep: "Đã chấp nhận tờ khai",
      du_lieu_goc: "{}",
      ngay_nhan: new Date("2023-03-11"),
      id_to_khai: toKhai.id_to_khai,
    },
  });

  // --- THANH TOÁN THUẾ ---
  const thanhToanThue = await prisma.thanh_toan_thue.create({
    data: {
      so_tien: 10000,
      ma_ngoai_te: "VND",
      phuong_thuc_thanh_toan: "BANK_TRANSFER",
      trang_thai_thanh_toan: "COMPLETED",
      tham_chieu_ngan_hang: "TXN001",
      ngay_thanh_toan: new Date("2023-03-12"),
      id_to_khai: toKhai.id_to_khai,
    },
  });

  // --- GIAO DỊCH NGÂN HÀNG ---
  await prisma.giao_dich_ngan_hang.create({
    data: {
      ten_ngan_hang: "Vietcombank",
      tai_khoan_ngan_hang: "123456789",
      so_tien: 10000,
      thoi_gian_giao_dich: new Date("2023-03-12"),
      ma_phan_hoi: "SUCCESS",
      thong_diep_phan_hoi: "Giao dịch thành công",
      id_thanh_toan: thanhToanThue.id_thanh_toan,
    },
  });

  // --- TÀI LIỆU ---
  await prisma.tai_lieu.createMany({
    data: [
      {
        loai_tai_lieu: "INVOICE",
        ten_file: "invoice.pdf",
        duong_dan: "/uploads/invoice.pdf",
        kich_thuoc: 1024000,
        loai_mime: "application/pdf",
        ma_kiem_tra: "hash123",
        id_to_khai: toKhai.id_to_khai,
        nguoi_tai_len: user.id_nguoi_dung,
      },
      {
        loai_tai_lieu: "CONTRACT",
        ten_file: "contract.pdf",
        duong_dan: "/uploads/contract.pdf",
        kich_thuoc: 2048000,
        loai_mime: "application/pdf",
        ma_kiem_tra: "hash456",
        id_to_khai: toKhai.id_to_khai,
        nguoi_tai_len: user.id_nguoi_dung,
      },
    ],
  });

  // --- LỊCH SỬ TRẠNG THÁI ---
  await prisma.lich_su_trang_thai.create({
    data: {
      trang_thai_cu: "NHAP",
      trang_thai_moi: "CHO_GUI",
      ghi_chu: "Chuyển sang chờ gửi",
      ngay_thay_doi: new Date("2023-03-10"),
      id_to_khai: toKhai.id_to_khai,
      nguoi_thay_doi: user.id_nguoi_dung,
    },
  });

  // --- THÔNG BÁO HỆ THỐNG ---
  await prisma.thong_bao_he_thong.create({
    data: {
      tieu_de: "Tạo IDA thành công",
      noi_dung: "Tờ khai IDA đã được tạo thành công",
      loai_thong_bao: "SUCCESS",
      id_nguoi_dung: user.id_nguoi_dung,
    },
  });

  // --- AUDIT LOG ---
  await prisma.audit_log.create({
    data: {
      ten_bang: "to_khai_hai_quan",
      id_ban_ghi: toKhai.id_to_khai,
      hanh_dong: "THEM",
      du_lieu_moi: JSON.stringify({ so_to_khai: "IDA001" }),
      id_nguoi_dung: user.id_nguoi_dung,
    },
  });

  // --- LOG TÍCH HỢP ---
  await prisma.log_tich_hop.create({
    data: {
      ten_he_thong: "VNACCS",
      huong: "OUTBOUND",
      ma_tuong_quan: "IDA001",
      du_lieu_yeu_cau: "{}",
      du_lieu_phan_hoi: "{}",
      trang_thai: "SUCCESS",
      thong_bao_loi: null,
    },
  });

  // --- CẤU HÌNH HỆ THỐNG ---
  await prisma.cau_hinh_he_thong.createMany({
    data: [
      {
        khoa_cau_hinh: "API_VNACCS_URL",
        gia_tri_cau_hinh: "https://api.vnaccs.gov.vn",
        mo_ta: "URL API VNACCS",
        nguoi_cap_nhat: user.id_nguoi_dung,
      },
      {
        khoa_cau_hinh: "DEFAULT_CURRENCY",
        gia_tri_cau_hinh: "USD",
        mo_ta: "Tiền tệ mặc định",
        nguoi_cap_nhat: user.id_nguoi_dung,
      },
    ],
  });

  // --- THÊM NHIỀU MA_HS ---
  const maHS3 = await prisma.ma_hs.create({
    data: {
      ma_hs: "85444200",
      mo_ta: "Cáp quang",
      thue_nhap_khau: 0,
      thue_vat: 10,
      thue_xuat_khau: 0,
      thue_tieu_thu_dac_biet: 0,
      thue_bao_ve_moi_truong: 0,
    },
  });

  const bieuThue3 = await prisma.bieu_thue.create({
    data: {
      ma_hs: maHS3.ma_hs,
      hieu_luc_tu: new Date("2020-01-01"),
      hieu_luc_den: new Date("2025-12-31"),
      thue_suat: 0,
      thue_vat: 10,
    },
  });

  // --- THÊM NHIỀU ĐỐI TÁC ---
  const supplier2 = await prisma.doi_tac.create({
    data: {
      ten_doi_tac: "Samsung Electronics",
      loai_doi_tac: "XUAT_KHAU",
      ma_quoc_gia: "KR",
      dia_chi: "Seoul, South Korea",
      nguoi_lien_he: "Kim Lee",
      dien_thoai_lien_he: "+82 1012345678",
      email_lien_he: "kim@samsung.com",
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  // --- THÊM NHIỀU HỢP ĐỒNG ---
  const hopDong3 = await prisma.hop_dong.create({
    data: {
      id_hop_dong: "HD-003",
      so_hop_dong: "HD-ECUS-003",
      loai_hop_dong: "NHAP_KHAU",
      ngay_ky: new Date("2023-04-01"),
      ngay_het_han: new Date("2024-04-01"),
      tong_gia_tri: 150000,
      ma_ngoai_te: "USD",
      dieu_kien_thanh_toan: "L/C",
      ma_cuc_hai_quan: "HP",
      id_cong_ty: congTy.id_cong_ty,
      id_doi_tac: supplier2.id_doi_tac,
      nguoi_tao: user2.id_nguoi_dung,
    },
  });

  // --- THÊM NHIỀU LÔ HÀNG ---
  const loHang2 = await prisma.lo_hang.create({
    data: {
      so_lo_hang: "LH-002",
      cang_xep_hang: "Busan",
      cang_do_hang: "Sai Gon",
      ngay_du_kien_xuat: new Date("2023-04-01"),
      ngay_du_kien_nhap: new Date("2023-04-15"),
      tong_gia_tri: 150000,
      ma_ngoai_te: "USD",
      mo_ta: "Lô hàng điện tử",
      id_hop_dong: hopDong3.id_hop_dong,
      id_cong_ty: congTy.id_cong_ty,
      id_dai_ly: agent.id_doi_tac,
      id_van_chuyen: carrier.id_doi_tac,
      id_loai_van_tai: loaiVanTai2.id_loai_van_tai,
      nguoi_tao: user2.id_nguoi_dung,
    },
  });

  // --- THÊM NHIỀU TỜ KHAI ---
  const toKhai2 = await prisma.to_khai_hai_quan.create({
    data: {
      so_to_khai: "IDA002",
      loai_to_khai: "IDA",
      trang_thai_gui: "DA_GUI",
      ma_thong_diep_vnacss: "MSG002",
      so_tiep_nhan_vnacss: "REC002",
      mau_kenh: "IDA",
      so_thong_bao_thue: "TB002",
      phan_loai: "IDA",
      so_tien_thue: 15000,
      ma_cuc_hai_quan: "SG",
      ngay_khai_bao: new Date("2023-04-10"),
      id_lo_hang: loHang2.id_lo_hang,
      id_loai_hinh: loaiHinh2.id_loai_hinh,
      id_hop_dong: hopDong3.id_hop_dong,
      id_cong_ty: congTy.id_cong_ty,
      nguoi_tao: user2.id_nguoi_dung,
    },
  });

  // --- CHI TIẾT TỜ KHAI THỨ 2 ---
  await prisma.chi_tiet_to_khai.create({
    data: {
      so_dong: 1,
      ma_hs: maHS3.ma_hs,
      mo_ta_hang_hoa: "Cáp quang",
      so_luong: 1000,
      don_vi_tinh: "Mét",
      don_gia: 1.5,
      tong_gia_tri: 1500,
      ma_ngoai_te: "USD",
      ma_quoc_gia: "KR",
      tien_thue: 0,
      tien_vat: 150,
      id_to_khai: toKhai2.id_to_khai,
      id_bieu_thue: bieuThue3.id_bieu_thue,
    },
  });

  // --- TỜ KHAI TRỊ GIÁ THỨ 2 ---
  const triGia2 = await prisma.to_khai_tri_gia.create({
    data: {
      ma_phan_loai_khai_tri_gia: "IMPORT",
      so_tiep_nhan_to_khai_tri_gia_tong_hop: "TG002",
      ma_tien_te: "USD",
      gia_co_so_hieu_chinh: 1500,
      tong_he_so_phan_bo: 1.0,
      nguoi_nop_thue: "Công ty ECUS",
      id_to_khai_hai_quan: toKhai2.id_to_khai,
      nguoi_tao: user2.id_nguoi_dung,
    },
  });

  // --- THANH TOÁN THUẾ THỨ 2 ---
  const thanhToanThue2 = await prisma.thanh_toan_thue.create({
    data: {
      so_tien: 15000,
      ma_ngoai_te: "VND",
      phuong_thuc_thanh_toan: "BANK_TRANSFER",
      trang_thai_thanh_toan: "PENDING",
      tham_chieu_ngan_hang: "TXN002",
      ngay_thanh_toan: new Date("2023-04-12"),
      id_to_khai: toKhai2.id_to_khai,
    },
  });

  // --- THÊM NHIỀU TÀI LIỆU ---
  await prisma.tai_lieu.createMany({
    data: [
      {
        loai_tai_lieu: "PACKING_LIST",
        ten_file: "packing_list.pdf",
        duong_dan: "/uploads/packing_list.pdf",
        kich_thuoc: 512000,
        loai_mime: "application/pdf",
        ma_kiem_tra: "hash789",
        id_to_khai: toKhai2.id_to_khai,
        nguoi_tai_len: user2.id_nguoi_dung,
      },
      {
        loai_tai_lieu: "CERTIFICATE",
        ten_file: "certificate.pdf",
        duong_dan: "/uploads/certificate.pdf",
        kich_thuoc: 1024000,
        loai_mime: "application/pdf",
        ma_kiem_tra: "hash101",
        id_to_khai: toKhai2.id_to_khai,
        nguoi_tai_len: user2.id_nguoi_dung,
      },
    ],
  });

  // --- THÊM NHIỀU THÔNG BÁO ---
  await prisma.thong_bao_he_thong.create({
    data: {
      tieu_de: "Tờ khai IDA002 đã được gửi",
      noi_dung: "Tờ khai IDA002 đã được gửi thành công đến hệ thống VNACCS",
      loai_thong_bao: "INFO",
      id_nguoi_dung: user2.id_nguoi_dung,
    },
  });

  // --- THÊM NHIỀU LOG TÍCH HỢP ---
  await prisma.log_tich_hop.create({
    data: {
      ten_he_thong: "VNACCS",
      huong: "OUTBOUND",
      ma_tuong_quan: "IDA002",
      du_lieu_yeu_cau: '{"action": "submit"}',
      du_lieu_phan_hoi: '{"status": "success"}',
      trang_thai: "SUCCESS",
      thong_bao_loi: null,
    },
  });

  // --- THÊM NHIỀU CẤU HÌNH ---
  await prisma.cau_hinh_he_thong.create({
    data: {
      khoa_cau_hinh: "MAX_FILE_SIZE",
      gia_tri_cau_hinh: "10485760",
      mo_ta: "Kích thước file tối đa (bytes)",
      nguoi_cap_nhat: user.id_nguoi_dung,
    },
  });

  // --- THÊM NHIỀU QUỐC GIA ---
  const quocGiaJP = await prisma.quoc_gia.create({
    data: {
      ma_quoc_gia: "JP",
      ten_quoc_gia: "Nhật Bản",
      ma_vung: "ASIA",
    },
  });

  const quocGiaKR = await prisma.quoc_gia.create({
    data: {
      ma_quoc_gia: "KR",
      ten_quoc_gia: "Hàn Quốc",
      ma_vung: "ASIA",
    },
  });

  // --- THÊM NHIỀU ĐỊA ĐIỂM KHO BÃI ---
  const diaDiem3 = await prisma.dia_diem_kho_bai.create({
    data: {
      ma_dia_diem: "DAD",
      ten_dia_diem: "Cảng Đà Nẵng",
      dia_chi: "Đà Nẵng",
      loai_dia_diem: "CANG",
      ma_cuc_hai_quan: "DN",
    },
  });

  const diaDiem4 = await prisma.dia_diem_kho_bai.create({
    data: {
      ma_dia_diem: "CXR",
      ten_dia_diem: "Sân bay Cam Ranh",
      dia_chi: "Khánh Hòa",
      loai_dia_diem: "SAN_BAY",
      ma_cuc_hai_quan: "CR",
    },
  });

  // --- THÊM NHIỀU LOẠI HÌNH ĐẶC BIỆT ---
  const loaiHinh3 = await prisma.loai_hinh_dac_biet.create({
    data: {
      ma_loai_hinh: "A13",
      ten_loai_hinh: "Nhập tái xuất",
      mo_ta: "Hàng nhập để tái xuất",
    },
  });

  const loaiHinh4 = await prisma.loai_hinh_dac_biet.create({
    data: {
      ma_loai_hinh: "A14",
      ten_loai_hinh: "Nhập để gia công",
      mo_ta: "Nguyên liệu nhập để gia công xuất khẩu",
    },
  });

  // --- THÊM NHIỀU MA_HS ---
  const maHS4 = await prisma.ma_hs.create({
    data: {
      ma_hs: "84715000",
      mo_ta: "Đơn vị xử lý trung tâm",
      thue_nhap_khau: 0,
      thue_vat: 10,
      thue_xuat_khau: 0,
      thue_tieu_thu_dac_biet: 0,
      thue_bao_ve_moi_truong: 0,
    },
  });

  const maHS5 = await prisma.ma_hs.create({
    data: {
      ma_hs: "85171200",
      mo_ta: "Điện thoại di động",
      thue_nhap_khau: 0,
      thue_vat: 10,
      thue_xuat_khau: 0,
      thue_tieu_thu_dac_biet: 0,
      thue_bao_ve_moi_truong: 0,
    },
  });

  const bieuThue4 = await prisma.bieu_thue.create({
    data: {
      ma_hs: maHS4.ma_hs,
      hieu_luc_tu: new Date("2020-01-01"),
      hieu_luc_den: new Date("2025-12-31"),
      thue_suat: 0,
      thue_vat: 10,
    },
  });

  const bieuThue5 = await prisma.bieu_thue.create({
    data: {
      ma_hs: maHS5.ma_hs,
      hieu_luc_tu: new Date("2020-01-01"),
      hieu_luc_den: new Date("2025-12-31"),
      thue_suat: 0,
      thue_vat: 10,
    },
  });

  // --- THÊM NHIỀU CÔNG TY ---
  const congTy2 = await prisma.cong_ty.create({
    data: {
      ma_so_thue: "0208888888",
      ten_cong_ty: "CÔNG TY TNHH SAMSUNG VN",
      dia_chi: "TP.HCM",
      ma_quoc_gia: "VN",
      nguoi_lien_he: "Trần Thị B",
      dien_thoai: "0988888888",
      email: "contact@samsung.vn",
    },
  });

  // --- THÊM NHIỀU NGƯỜI DÙNG ---
  const user3 = await prisma.nguoi_dung.create({
    data: {
      ten_dang_nhap: "manager",
      mat_khau: "$2b$10$0yvEJKywjDnm.CMarlN7neQHHv3vrVJmoPuTPsY3HvR5O7gNhVSbi",
      ho_ten: "Manager ECUS",
      email: "manager@ecus.vn",
      id_vai_tro: vaiTroUser.id_vai_tro,
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  // --- THÊM NHIỀU ĐỐI TÁC ---
  const customer = await prisma.doi_tac.create({
    data: {
      ten_doi_tac: "Công ty ABC Việt Nam",
      loai_doi_tac: "NHAP_KHAU",
      ma_quoc_gia: "VN",
      dia_chi: "Hà Nội",
      nguoi_lien_he: "Nguyễn Văn C",
      dien_thoai_lien_he: "0912345678",
      email_lien_he: "nguyen@abc.vn",
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  const manufacturer = await prisma.doi_tac.create({
    data: {
      ten_doi_tac: "Foxconn Technology",
      loai_doi_tac: "GIA_CONG",
      ma_quoc_gia: "CN",
      dia_chi: "Shenzhen, China",
      nguoi_lien_he: "Zhang Wei",
      dien_thoai_lien_he: "+86 13800138000",
      email_lien_he: "zhang@foxconn.com",
      id_cong_ty: congTy.id_cong_ty,
    },
  });

  // --- THÊM NHIỀU HỢP ĐỒNG ---
  const hopDong4 = await prisma.hop_dong.create({
    data: {
      id_hop_dong: "HD-004",
      so_hop_dong: "HD-ECUS-004",
      loai_hop_dong: "XUAT_KHAU",
      ngay_ky: new Date("2023-05-01"),
      ngay_het_han: new Date("2024-05-01"),
      tong_gia_tri: 300000,
      ma_ngoai_te: "USD",
      dieu_kien_thanh_toan: "TTR",
      ma_cuc_hai_quan: "HP",
      id_cong_ty: congTy.id_cong_ty,
      id_doi_tac: customer.id_doi_tac,
      nguoi_tao: user3.id_nguoi_dung,
    },
  });

  // --- THÊM CHI TIẾT HỢP ĐỒNG ---
  await prisma.vat_lieu_hop_dong.create({
    data: {
      ma_vat_lieu: "VL002",
      ten_vat_lieu: "Chip điện tử",
      don_vi_tinh: "Chiếc",
      so_luong: 50000,
      nguon_goc: "CN",
      ma_hs: maHS4.ma_hs,
      don_gia: 0.5,
      tong_gia_tri: 25000,
      id_hop_dong: hopDong4.id_hop_dong,
    },
  });

  await prisma.san_pham_hop_dong.create({
    data: {
      ma_san_pham: "SP002",
      ten_san_pham: "Điện thoại thông minh",
      don_vi_tinh: "Chiếc",
      so_luong: 1000,
      ma_hs: maHS5.ma_hs,
      don_gia: 200,
      tong_gia_tri: 200000,
      id_hop_dong: hopDong4.id_hop_dong,
    },
  });

  // --- THÊM DANH MỤC ---
  await prisma.danh_muc.create({
    data: {
      danh_muc: 15.0,
      ty_le_hao_hut: 8.0,
      ma_lenh_san_xuat: "LSX002",
      nam_tai_chinh: 2023,
      id_hop_dong: hopDong4.id_hop_dong,
      id_san_pham: 2, // Assuming the created san_pham_hop_dong has id 2
    },
  });

  // --- THÊM PHỤ LỤC HỢP ĐỒNG ---
  await prisma.phu_luc_hop_dong.create({
    data: {
      so_phu_luc: "PL002",
      ngay_phu_luc: new Date("2023-07-01"),
      mo_ta: "Thay đổi số lượng",
      loai_thay_doi: "SO_LUONG",
      id_hop_dong: hopDong4.id_hop_dong,
      nguoi_tao: user3.id_nguoi_dung,
    },
  });

  // --- THÊM VĂN BẢN GIẤY PHÉP ---
  await prisma.van_ban_giay_phep.create({
    data: {
      ma_so: "GP002",
      loai: "EXPORT_LICENSE",
      id_hop_dong: hopDong4.id_hop_dong,
    },
  });

  // --- THÊM NHIỀU LÔ HÀNG ---
  const loHang3 = await prisma.lo_hang.create({
    data: {
      so_lo_hang: "LH-003",
      cang_xep_hang: "Shenzhen",
      cang_do_hang: "Hai Phong",
      ngay_du_kien_xuat: new Date("2023-05-01"),
      ngay_du_kien_nhap: new Date("2023-05-15"),
      tong_gia_tri: 300000,
      ma_ngoai_te: "USD",
      mo_ta: "Lô hàng điện thoại",
      id_hop_dong: hopDong4.id_hop_dong,
      id_cong_ty: congTy.id_cong_ty,
      id_dai_ly: agent.id_doi_tac,
      id_van_chuyen: carrier.id_doi_tac,
      id_loai_van_tai: loaiVanTai.id_loai_van_tai,
      nguoi_tao: user3.id_nguoi_dung,
    },
  });

  // --- THÊM HÓA ĐƠN ---
  await prisma.hoa_don.create({
    data: {
      so_hoa_don: "INV-002",
      ngay_hoa_don: new Date("2023-04-25"),
      tong_tien: 300000,
      ma_ngoai_te: "USD",
      dieu_kien_giao_hang: "FOB",
      id_lo_hang: loHang3.id_lo_hang,
      id_nguoi_ban: congTy.id_cong_ty, // Note: This should be a doi_tac, but using cong_ty for demo
      id_nguoi_mua: customer.id_doi_tac,
    },
  });

  // --- THÊM VẬN ĐƠN ---
  await prisma.van_don.create({
    data: {
      so_van_don: "BL-002",
      ten_tau: "EVER GREEN",
      hanh_trinh: "Shenzhen - Hai Phong",
      so_container: 10,
      id_lo_hang: loHang3.id_lo_hang,
    },
  });

  // --- THÊM CONTAINER ---
  await prisma.container.create({
    data: {
      so_container: "CONT002",
      so_chi: "SEAL002",
      loai_container: "40FT",
      trong_luong_brut: 30000,
      trong_luong_net: 27000,
      id_lo_hang: loHang3.id_lo_hang,
    },
  });

  // --- THÊM NHIỀU TỜ KHAI ---
  const toKhai3 = await prisma.to_khai_hai_quan.create({
    data: {
      so_to_khai: "IDB001",
      loai_to_khai: "IDB",
      trang_thai_gui: "CHO_GUI",
      ma_thong_diep_vnacss: "MSG003",
      so_tiep_nhan_vnacss: "REC003",
      mau_kenh: "IDB",
      so_thong_bao_thue: "TB003",
      phan_loai: "IDB",
      so_tien_thue: 30000,
      ma_cuc_hai_quan: "HP",
      ngay_khai_bao: new Date("2023-05-10"),
      id_lo_hang: loHang3.id_lo_hang,
      id_loai_hinh: loaiHinh3.id_loai_hinh,
      id_hop_dong: hopDong4.id_hop_dong,
      id_cong_ty: congTy.id_cong_ty,
      nguoi_tao: user3.id_nguoi_dung,
    },
  });

  // --- CHI TIẾT TỜ KHAI THỨ 3 ---
  await prisma.chi_tiet_to_khai.create({
    data: {
      so_dong: 1,
      ma_hs: maHS5.ma_hs,
      mo_ta_hang_hoa: "Điện thoại thông minh",
      so_luong: 1000,
      don_vi_tinh: "Chiếc",
      don_gia: 200,
      tong_gia_tri: 200000,
      ma_ngoai_te: "USD",
      ma_quoc_gia: "VN",
      tien_thue: 0,
      tien_vat: 20000,
      id_to_khai: toKhai3.id_to_khai,
      id_bieu_thue: bieuThue5.id_bieu_thue,
    },
  });

  // --- TỜ KHAI TRỊ GIÁ THỨ 3 ---
  const triGia3 = await prisma.to_khai_tri_gia.create({
    data: {
      ma_phan_loai_khai_tri_gia: "EXPORT",
      so_tiep_nhan_to_khai_tri_gia_tong_hop: "TG003",
      ma_tien_te: "USD",
      gia_co_so_hieu_chinh: 200000,
      tong_he_so_phan_bo: 1.0,
      nguoi_nop_thue: "Công ty ECUS",
      id_to_khai_hai_quan: toKhai3.id_to_khai,
      nguoi_tao: user3.id_nguoi_dung,
    },
  });

  // --- KHOẢN ĐIỀU CHỈNH TRỊ GIÁ THỨ 2 ---
  const khoanDieuChinh2 = await prisma.khoan_dieu_chinh_tri_gia.create({
    data: {
      stt: 1,
      ma_ten: "PHI_BAO_HIEM",
      ma_phan_loai: "COST",
      ma_tien_te: "USD",
      tri_gia_dieu_chinh: 2000,
      tong_he_so_phan_bo: 0.01,
      loai_dieu_chinh: "TANG",
      id_to_khai_tri_gia: triGia3.id_to_khai_tri_gia,
    },
  });

  // --- CHI TIẾT ĐIỀU CHỈNH TRỊ GIÁ THỨ 2 ---
  await prisma.chi_tiet_dieu_chinh_tri_gia.create({
    data: {
      ma_loai: "INSURANCE",
      ma_tien_te: "USD",
      phi: 2000,
      so_dang_ky: "REF002",
      mo_ta: "Phí bảo hiểm",
      id_khoan_dieu_chinh: khoanDieuChinh2.id_khoan_dieu_chinh,
    },
  });

  // --- PHẢN HỒI HẢI QUAN THỨ 2 ---
  await prisma.phan_hoi_hai_quan.create({
    data: {
      loai_thong_diep: "REJECT",
      so_tiep_nhan_vnacss: "REC003",
      mau_kenh: "IDB",
      ma_thong_diep: "MSG003",
      noi_dung_thong_diep: "Thiếu tài liệu chứng nhận xuất xứ",
      du_lieu_goc: "{}",
      ngay_nhan: new Date("2023-05-11"),
      id_to_khai: toKhai3.id_to_khai,
    },
  });

  // --- THANH TOÁN THUẾ THỨ 3 ---
  const thanhToanThue3 = await prisma.thanh_toan_thue.create({
    data: {
      so_tien: 30000,
      ma_ngoai_te: "VND",
      phuong_thuc_thanh_toan: "CASH",
      trang_thai_thanh_toan: "COMPLETED",
      tham_chieu_ngan_hang: "TXN003",
      ngay_thanh_toan: new Date("2023-05-12"),
      id_to_khai: toKhai3.id_to_khai,
    },
  });

  // --- GIAO DỊCH NGÂN HÀNG THỨ 2 ---
  await prisma.giao_dich_ngan_hang.create({
    data: {
      ten_ngan_hang: "BIDV",
      tai_khoan_ngan_hang: "999999999",
      so_tien: 30000,
      thoi_gian_giao_dich: new Date("2023-05-12"),
      ma_phan_hoi: "SUCCESS",
      thong_diep_phan_hoi: "Thanh toán thành công",
      id_thanh_toan: thanhToanThue3.id_thanh_toan,
    },
  });

  // --- THÊM NHIỀU TÀI LIỆU ---
  await prisma.tai_lieu.createMany({
    data: [
      {
        loai_tai_lieu: "CO",
        ten_file: "certificate_of_origin.pdf",
        duong_dan: "/uploads/co.pdf",
        kich_thuoc: 2048000,
        loai_mime: "application/pdf",
        ma_kiem_tra: "hashco",
        id_to_khai: toKhai3.id_to_khai,
        nguoi_tai_len: user3.id_nguoi_dung,
      },
      {
        loai_tai_lieu: "BL",
        ten_file: "bill_of_lading.pdf",
        duong_dan: "/uploads/bl.pdf",
        kich_thuoc: 1536000,
        loai_mime: "application/pdf",
        ma_kiem_tra: "hashbl",
        id_to_khai: toKhai3.id_to_khai,
        nguoi_tai_len: user3.id_nguoi_dung,
      },
    ],
  });

  // --- LỊCH SỬ TRẠNG THÁI THỨ 2 ---
  await prisma.lich_su_trang_thai.create({
    data: {
      trang_thai_cu: "NHAP",
      trang_thai_moi: "CHO_GUI",
      ghi_chu: "Chuyển sang chờ gửi",
      ngay_thay_doi: new Date("2023-05-10"),
      id_to_khai: toKhai3.id_to_khai,
      nguoi_thay_doi: user3.id_nguoi_dung,
    },
  });

  // --- THÔNG BÁO HỆ THỐNG THỨ 3 ---
  await prisma.thong_bao_he_thong.create({
    data: {
      tieu_de: "Tờ khai IDB001 bị từ chối",
      noi_dung: "Tờ khai IDB001 bị từ chối do thiếu tài liệu CO",
      loai_thong_bao: "WARNING",
      id_nguoi_dung: user3.id_nguoi_dung,
    },
  });

  // --- AUDIT LOG THỨ 2 ---
  await prisma.audit_log.create({
    data: {
      ten_bang: "to_khai_hai_quan",
      id_ban_ghi: toKhai3.id_to_khai,
      hanh_dong: "SUA",
      du_lieu_cu: JSON.stringify({ trang_thai_gui: "NHAP" }),
      du_lieu_moi: JSON.stringify({ trang_thai_gui: "CHO_GUI" }),
      id_nguoi_dung: user3.id_nguoi_dung,
    },
  });

  // --- LOG TÍCH HỢP THỨ 3 ---
  await prisma.log_tich_hop.create({
    data: {
      ten_he_thong: "VNACCS",
      huong: "OUTBOUND",
      ma_tuong_quan: "IDB001",
      du_lieu_yeu_cau: '{"action": "submit", "type": "IDB"}',
      du_lieu_phan_hoi: '{"status": "rejected", "reason": "missing_co"}',
      trang_thai: "ERROR",
      thong_bao_loi: "Thiếu chứng nhận xuất xứ",
    },
  });

  // --- THÊM NHIỀU CẤU HÌNH ---
  await prisma.cau_hinh_he_thong.createMany({
    data: [
      {
        khoa_cau_hinh: "EMAIL_SMTP_HOST",
        gia_tri_cau_hinh: "smtp.gmail.com",
        mo_ta: "SMTP host cho email",
        nguoi_cap_nhat: user.id_nguoi_dung,
      },
      {
        khoa_cau_hinh: "AUTO_BACKUP_TIME",
        gia_tri_cau_hinh: "02:00",
        mo_ta: "Thời gian sao lưu tự động",
        nguoi_cap_nhat: user.id_nguoi_dung,
      },
    ],
  });

  console.log("✅ FULL SEED DONE - TẤT CẢ BẢNG ĐÃ CÓ DỮ LIỆU MẪU");
}

main()
  .catch((e) => {
    console.error("❌ SEED ERROR:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
