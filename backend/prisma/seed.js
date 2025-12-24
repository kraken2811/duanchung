const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// --- UTILS ---
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

async function main() {
  console.log('🚀 Bắt đầu seed dữ liệu TOÀN BỘ CÁC BẢNG...');

  // 1. DỌN DẸP DỮ LIỆU CŨ (Full tables)
  console.log('🧹 1. Dọn dẹp dữ liệu cũ...');
  const tableNames = [
    'giao_dich_ngan_hang', 'thanh_toan_thue', 'phan_hoi_hai_quan',
    'chi_tiet_dieu_chinh_tri_gia', 'khoan_dieu_chinh_tri_gia', 'to_khai_tri_gia',
    'chi_tiet_to_khai', 'lich_su_trang_thai', 'tai_lieu', 'thong_bao_he_thong',
    'to_khai_hai_quan', 'bieu_thue', 'ma_hs', 'loai_hinh_dac_biet',
    'container', 'van_don', 'hoa_don', 'lo_hang', 'loai_van_tai',
    'danh_muc', 'vat_lieu_hop_dong', 'san_pham_hop_dong', 'phu_luc_hop_dong', 
    'van_ban_giay_phep', 'hop_dong',
    'doi_tac', 'refresh_token', 'audit_log', 'nguoi_dung', 'cong_ty', 'vai_tro',
    'dia_diem_kho_bai', 'log_tich_hop', 'cau_hinh_he_thong', 'quoc_gia'
  ];

  for (const table of tableNames) {
    try {
      await prisma[table].deleteMany();
    } catch (e) {
      // Ignore foreign key errors if tables are already empty
    }
  }

  // 2. MASTER DATA & SYSTEM CONFIG
  console.log('⚙️ 2. Tạo Master Data & Cấu hình...');

  // Quốc gia
  const quocGias = await Promise.all([
    prisma.quoc_gia.create({ data: { ma_quoc_gia: 'VN', ten_quoc_gia: 'Việt Nam', ma_vung: '+84' } }),
    prisma.quoc_gia.create({ data: { ma_quoc_gia: 'US', ten_quoc_gia: 'Hoa Kỳ', ma_vung: '+1' } }),
    prisma.quoc_gia.create({ data: { ma_quoc_gia: 'CN', ten_quoc_gia: 'Trung Quốc', ma_vung: '+86' } }),
  ]);

  // Cấu hình hệ thống
  await prisma.cau_hinh_he_thong.createMany({
    data: [
      { khoa_cau_hinh: 'VNACCS_URL', gia_tri_cau_hinh: 'https://vnaccs.customs.gov.vn', mo_ta: 'Đường dẫn kết nối Hải quan' },
      { khoa_cau_hinh: 'DEFAULT_CURRENCY', gia_tri_cau_hinh: 'VND', mo_ta: 'Tiền tệ mặc định' },
      { khoa_cau_hinh: 'MAX_FILE_SIZE', gia_tri_cau_hinh: '10MB', mo_ta: 'Dung lượng file tối đa' },
    ]
  });

  // Địa điểm kho bãi
  await prisma.dia_diem_kho_bai.createMany({
    data: [
      { ma_dia_diem: 'KHO_NOI_BAI', ten_dia_diem: 'Kho TCS Nội Bài', ma_cuc_hai_quan: '01B1' },
      { ma_dia_diem: 'CANG_CAT_LAI', ten_dia_diem: 'Cảng Cát Lái', ma_cuc_hai_quan: '02CI' },
      { ma_dia_diem: 'KHO_VSIP', ten_dia_diem: 'Kho Ngoại Quan VSIP', ma_cuc_hai_quan: '18BA' },
    ]
  });

  // Log tích hợp (Giả lập)
  await prisma.log_tich_hop.create({
    data: { ten_he_thong: 'VNACCS', huong: 'OUT', trang_thai: 'SUCCESS', thong_bao_loi: 'OK' }
  });

  // Vai trò
  const roles = await Promise.all([
    prisma.vai_tro.create({ data: { ma_vai_tro: 'ADMIN', ten_vai_tro: 'Quản trị' } }),
    prisma.vai_tro.create({ data: { ma_vai_tro: 'STAFF', ten_vai_tro: 'Nhân viên' } }),
  ]);

  // Loại hình & Loại vận tải
  const loaiHinhs = await Promise.all([
    prisma.loai_hinh_dac_biet.create({ data: { ma_loai_hinh: 'A11', ten_loai_hinh: 'Nhập kinh doanh' } }),
    prisma.loai_hinh_dac_biet.create({ data: { ma_loai_hinh: 'B11', ten_loai_hinh: 'Xuất kinh doanh' } }),
  ]);
  const vanTais = await Promise.all([
    prisma.loai_van_tai.create({ data: { ma_loai_van_tai: 'SEA', ten_loai_van_tai: 'Đường biển' } }),
    prisma.loai_van_tai.create({ data: { ma_loai_van_tai: 'AIR', ten_loai_van_tai: 'Hàng không' } }),
  ]);

  // Mã HS
  const hsCode = await prisma.ma_hs.create({ 
    data: { ma_hs: '85171200', mo_ta: 'Điện thoại di động', thue_nhap_khau: 0, thue_vat: 10 } 
  });
  await prisma.bieu_thue.create({
    data: { ma_hs: hsCode.ma_hs, hieu_luc_tu: new Date(), thue_suat: 0 }
  });

  // 3. CORE USERS & PARTNERS
  console.log('👥 3. Tạo Công ty, User & Đối tác...');

  const congTy = await prisma.cong_ty.create({
    data: { ma_so_thue: '0100100100', ten_cong_ty: 'Logistics Demo Corp', ma_quoc_gia: 'VN' }
  });

  const pass = await bcrypt.hash('123456', 10);
  const user = await prisma.nguoi_dung.create({
    data: { 
      ten_dang_nhap: 'admin', mat_khau: pass, ho_ten: 'Admin User', 
      id_vai_tro: roles[0].id_vai_tro, id_cong_ty: congTy.id_cong_ty 
    }
  });

  // Tạo Audit Log cho User vừa tạo
  await prisma.audit_log.create({
    data: { ten_bang: 'nguoi_dung', id_ban_ghi: user.id_nguoi_dung, hanh_dong: 'THEM', id_nguoi_dung: user.id_nguoi_dung }
  });

  // Tạo Thông báo hệ thống
  await prisma.thong_bao_he_thong.create({
    data: { tieu_de: 'Chào mừng', noi_dung: 'Hệ thống đã sẵn sàng', id_nguoi_dung: user.id_nguoi_dung }
  });

  const doiTac = await prisma.doi_tac.create({
    data: { ten_doi_tac: 'Partner Inc', ma_quoc_gia: 'US', loai_doi_tac: 'NHAP_KHAU', id_cong_ty: congTy.id_cong_ty }
  });

  // 4. BUSINESS FLOW (LOOP 5 TIMES)
  console.log('🔄 4. Tạo dữ liệu nghiệp vụ (Hợp đồng -> Tờ khai -> Thanh toán)...');

  for (let i = 1; i <= 5; i++) {
    // --- Hợp đồng ---
    const hopDong = await prisma.hop_dong.create({
      data: {
        id_hop_dong: `HD-UUID-${i}`,
        so_hop_dong: `HD/2024/${i}`,
        loai_hop_dong: 'NHAP_KHAU',
        tong_gia_tri: 100000,
        id_cong_ty: congTy.id_cong_ty,
        id_doi_tac: doiTac.id_doi_tac,
        nguoi_tao: user.id_nguoi_dung
      }
    });

    // Văn bản giấy phép (Bảng phụ Hợp đồng)
    await prisma.van_ban_giay_phep.create({
      data: { ma_so: `GP-NK-${i}`, loai: 'Giấy phép nhập khẩu', id_hop_dong: hopDong.id_hop_dong }
    });

    // Phụ lục hợp đồng
    await prisma.phu_luc_hop_dong.create({
      data: { so_phu_luc: `PL-0${i}`, mo_ta: 'Điều chỉnh giá', id_hop_dong: hopDong.id_hop_dong }
    });

    // Sản phẩm & Vật liệu
    const sp = await prisma.san_pham_hop_dong.create({
      data: { ma_san_pham: 'SP01', ten_san_pham: 'Smartphone', id_hop_dong: hopDong.id_hop_dong }
    });
    const vl = await prisma.vat_lieu_hop_dong.create({
      data: { ma_vat_lieu: 'VL01', ten_vat_lieu: 'Chipset', id_hop_dong: hopDong.id_hop_dong }
    });

    // Danh mục (BOM)
    await prisma.danh_muc.create({
      data: { id_hop_dong: hopDong.id_hop_dong, id_san_pham: sp.id_san_pham, id_vat_lieu: vl.id_vat_lieu, danh_muc: 1.5 }
    });

    // --- Lô hàng ---
    const loHang = await prisma.lo_hang.create({
      data: {
        so_lo_hang: `SHIP-${i}`,
        id_hop_dong: hopDong.id_hop_dong,
        id_cong_ty: congTy.id_cong_ty,
        id_loai_van_tai: vanTais[0].id_loai_van_tai
      }
    });

    await prisma.van_don.create({ data: { so_van_don: `BL-${i}`, id_lo_hang: loHang.id_lo_hang } });
    await prisma.container.create({ data: { so_container: `CONT-${i}`, id_lo_hang: loHang.id_lo_hang } });
    await prisma.hoa_don.create({ data: { so_hoa_don: `INV-${i}`, id_lo_hang: loHang.id_lo_hang } });

    // --- Tờ khai hải quan ---
    const toKhai = await prisma.to_khai_hai_quan.create({
      data: {
        so_to_khai: `TK-1000${i}`,
        loai_to_khai: 'NHAP_KHAU',
        phan_loai: 'LUONG_XANH',
        so_tien_thue: 5000000,
        id_lo_hang: loHang.id_lo_hang,
        id_loai_hinh: loaiHinhs[0].id_loai_hinh,
        id_hop_dong: hopDong.id_hop_dong,
        id_cong_ty: congTy.id_cong_ty,
        nguoi_tao: user.id_nguoi_dung
      }
    });

    // Chi tiết tờ khai
    await prisma.chi_tiet_to_khai.create({
      data: { so_dong: 1, ma_hs: hsCode.ma_hs, id_to_khai: toKhai.id_to_khai }
    });

    // Lịch sử trạng thái
    await prisma.lich_su_trang_thai.create({
      data: { trang_thai_moi: 'MOI_TAO', id_to_khai: toKhai.id_to_khai, nguoi_thay_doi: user.id_nguoi_dung }
    });

    // Tài liệu đính kèm
    await prisma.tai_lieu.create({
      data: { ten_file: 'invoice.pdf', loai_doi_tuong: 'TO_KHAI', id_doi_tuong: toKhai.id_to_khai, nguoi_tai_len: user.id_nguoi_dung }
    });

    // Phản hồi hải quan (Giả lập)
    await prisma.phan_hoi_hai_quan.create({
      data: { loai_thong_diep: 'THONG_QUAN', noi_dung_thong_diep: 'Đã thông quan', id_to_khai: toKhai.id_to_khai }
    });

    // --- Trị giá hải quan (Valuation) ---
    const tkTriGia = await prisma.to_khai_tri_gia.create({
      data: { ma_tien_te: 'USD', id_to_khai_hai_quan: toKhai.id_to_khai, nguoi_tao: user.id_nguoi_dung }
    });
    
    const khoanDieuChinh = await prisma.khoan_dieu_chinh_tri_gia.create({
      data: { ma_ten: 'PHI_VAN_CHUYEN', tri_gia_dieu_chinh: 100, id_to_khai_tri_gia: tkTriGia.id_to_khai_tri_gia }
    });

    await prisma.chi_tiet_dieu_chinh_tri_gia.create({
      data: { phi: 100, mo_ta: 'Phí vận chuyển quốc tế', id_khoan_dieu_chinh: khoanDieuChinh.id_khoan_dieu_chinh }
    });

    // --- Thanh toán thuế ---
    const thanhToan = await prisma.thanh_toan_thue.create({
      data: { so_tien: 5000000, trang_thai_thanh_toan: 'THANH_CONG', id_to_khai: toKhai.id_to_khai }
    });

    await prisma.giao_dich_ngan_hang.create({
      data: { ten_ngan_hang: 'Vietcombank', so_tien: 5000000, id_thanh_toan: thanhToan.id_thanh_toan }
    });
  }

  console.log('✅ Đã tạo đầy đủ dữ liệu cho TẤT CẢ các bảng.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });