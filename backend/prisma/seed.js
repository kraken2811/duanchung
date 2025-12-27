const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const randomItem = (arr) => {
  if (!arr || arr.length === 0) return null; // tránh lỗi nếu mảng rỗng
  return arr[Math.floor(Math.random() * arr.length)];
};
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

async function main() {
  console.log("🌱 START FULL SEED");
  await seedMasterData();
  await seedCoreDataRedo();
  await seedTaxData();
  await seedContractData();
  await seedLogisticsAndDeclarationData();
  await seedFinalData();
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
async function seedMasterData() {
  console.log("🌱 Bắt đầu seed Master Data - Mỗi bảng 20 bản ghi (bỏ qua trùng lặp)");

  // === QUOC_GIA (có @unique trên ma_quoc_gia) ===
  const quocGiaData = [
    { ma_quoc_gia: "VN", ten_quoc_gia: "Việt Nam", ma_vung: "ASIA" },
    { ma_quoc_gia: "CN", ten_quoc_gia: "Trung Quốc", ma_vung: "ASIA" },
    { ma_quoc_gia: "US", ten_quoc_gia: "Hoa Kỳ", ma_vung: "AMERICA" },
    { ma_quoc_gia: "JP", ten_quoc_gia: "Nhật Bản", ma_vung: "ASIA" },
    { ma_quoc_gia: "KR", ten_quoc_gia: "Hàn Quốc", ma_vung: "ASIA" },
    { ma_quoc_gia: "DE", ten_quoc_gia: "Đức", ma_vung: "EUROPE" },
    { ma_quoc_gia: "FR", ten_quoc_gia: "Pháp", ma_vung: "EUROPE" },
    { ma_quoc_gia: "GB", ten_quoc_gia: "Anh", ma_vung: "EUROPE" },
    { ma_quoc_gia: "IN", ten_quoc_gia: "Ấn Độ", ma_vung: "ASIA" },
    { ma_quoc_gia: "TH", ten_quoc_gia: "Thái Lan", ma_vung: "ASIA" },
    { ma_quoc_gia: "SG", ten_quoc_gia: "Singapore", ma_vung: "ASIA" },
    { ma_quoc_gia: "MY", ten_quoc_gia: "Malaysia", ma_vung: "ASIA" },
    { ma_quoc_gia: "ID", ten_quoc_gia: "Indonesia", ma_vung: "ASIA" },
    { ma_quoc_gia: "AU", ten_quoc_gia: "Úc", ma_vung: "OCEANIA" },
    { ma_quoc_gia: "CA", ten_quoc_gia: "Canada", ma_vung: "AMERICA" },
    { ma_quoc_gia: "IT", ten_quoc_gia: "Ý", ma_vung: "EUROPE" },
    { ma_quoc_gia: "ES", ten_quoc_gia: "Tây Ban Nha", ma_vung: "EUROPE" },
    { ma_quoc_gia: "NL", ten_quoc_gia: "Hà Lan", ma_vung: "EUROPE" },
    { ma_quoc_gia: "TW", ten_quoc_gia: "Đài Loan", ma_vung: "ASIA" },
    { ma_quoc_gia: "BR", ten_quoc_gia: "Brazil", ma_vung: "AMERICA" },
  ];

  for (const data of quocGiaData) {
    await prisma.quoc_gia.create({ data }).catch((e) => {
      if (e.code === "P2002") return; // trùng ma_quoc_gia → bỏ qua
      throw e;
    });
  }

  // === DIA_DIEM_KHO_BAI (có @unique trên ma_dia_diem) ===
  const diaDiemData = [
    { ma_dia_diem: "SGN", ten_dia_diem: "Cảng Sài Gòn", dia_chi: "TP.HCM", loai_dia_diem: "CANG", ma_cuc_hai_quan: "SG" },
    { ma_dia_diem: "HHN", ten_dia_diem: "Cảng Hải Phòng", dia_chi: "Hải Phòng", loai_dia_diem: "CANG", ma_cuc_hai_quan: "HP" },
    { ma_dia_diem: "DAD", ten_dia_diem: "Cảng Đà Nẵng", dia_chi: "Đà Nẵng", loai_dia_diem: "CANG", ma_cuc_hai_quan: "DN" },
    { ma_dia_diem: "HPH", ten_dia_diem: "Sân bay Nội Bài", dia_chi: "Hà Nội", loai_dia_diem: "SAN_BAY", ma_cuc_hai_quan: "HN" },
    { ma_dia_diem: "SGNA", ten_dia_diem: "Sân bay Tân Sơn Nhất", dia_chi: "TP.HCM", loai_dia_diem: "SAN_BAY", ma_cuc_hai_quan: "SG" },
    { ma_dia_diem: "CXR", ten_dia_diem: "Sân bay Cam Ranh", dia_chi: "Khánh Hòa", loai_dia_diem: "SAN_BAY", ma_cuc_hai_quan: "CR" },
    { ma_dia_diem: "KCN1", ten_dia_diem: "KCN Cát Lái", dia_chi: "TP.HCM", loai_dia_diem: "KHO", ma_cuc_hai_quan: "SG" },
    { ma_dia_diem: "KCN2", ten_dia_diem: "KCN Đình Vũ", dia_chi: "Hải Phòng", loai_dia_diem: "KHO", ma_cuc_hai_quan: "HP" },
    { ma_dia_diem: "SHANG", ten_dia_diem: "Cảng Thượng Hải", dia_chi: "Shanghai, China", loai_dia_diem: "CANG", ma_cuc_hai_quan: null },
    { ma_dia_diem: "BUSAN", ten_dia_diem: "Cảng Busan", dia_chi: "Busan, Korea", loai_dia_diem: "CANG", ma_cuc_hai_quan: null },
    { ma_dia_diem: "LAEM", ten_dia_diem: "Cảng Laem Chabang", dia_chi: "Thailand", loai_dia_diem: "CANG", ma_cuc_hai_quan: null },
    { ma_dia_diem: "SIN", ten_dia_diem: "Cảng Singapore", dia_chi: "Singapore", loai_dia_diem: "CANG", ma_cuc_hai_quan: null },
    { ma_dia_diem: "LGB", ten_dia_diem: "Cảng Long Beach", dia_chi: "USA", loai_dia_diem: "CANG", ma_cuc_hai_quan: null },
    { ma_dia_diem: "ROT", ten_dia_diem: "Cảng Rotterdam", dia_chi: "Netherlands", loai_dia_diem: "CANG", ma_cuc_hai_quan: null },
    { ma_dia_diem: "HKG", ten_dia_diem: "Cảng Hong Kong", dia_chi: "Hong Kong", loai_dia_diem: "CANG", ma_cuc_hai_quan: null },
    { ma_dia_diem: "NRT", ten_dia_diem: "Sân bay Narita", dia_chi: "Tokyo, Japan", loai_dia_diem: "SAN_BAY", ma_cuc_hai_quan: null },
    { ma_dia_diem: "ICN", ten_dia_diem: "Sân bay Incheon", dia_chi: "Seoul, Korea", loai_dia_diem: "SAN_BAY", ma_cuc_hai_quan: null },
    { ma_dia_diem: "KCN3", ten_dia_diem: "KCN VSIP Bình Dương", dia_chi: "Bình Dương", loai_dia_diem: "KHO", ma_cuc_hai_quan: "SG" },
    { ma_dia_diem: "QUI", ten_dia_diem: "Cảng Quy Nhơn", dia_chi: "Bình Định", loai_dia_diem: "CANG", ma_cuc_hai_quan: "QN" },
    { ma_dia_diem: "CAN", ten_dia_diem: "Cảng Cần Thơ", dia_chi: "Cần Thơ", loai_dia_diem: "CANG", ma_cuc_hai_quan: "CT" },
  ];

  for (const data of diaDiemData) {
    await prisma.dia_diem_kho_bai.create({ data }).catch((e) => {
      if (e.code === "P2002") return;
      throw e;
    });
  }

  // === LOAI_VAN_TAI (có @unique trên ma_loai_van_tai) ===
  const loaiVanTaiData = [
    { ma_loai_van_tai: "SEA", ten_loai_van_tai: "Đường biển", mo_ta: "Vận tải container đường biển" },
    { ma_loai_van_tai: "AIR", ten_loai_van_tai: "Đường hàng không", mo_ta: "Vận tải hàng không" },
    { ma_loai_van_tai: "ROAD", ten_loai_van_tai: "Đường bộ", mo_ta: "Vận tải đường bộ nội địa/quốc tế" },
    { ma_loai_van_tai: "RAIL", ten_loai_van_tai: "Đường sắt", mo_ta: "Vận tải đường sắt" },
    { ma_loai_van_tai: "MULTI", ten_loai_van_tai: "Đa phương thức", mo_ta: "Kết hợp biển + bộ + sắt" },
    { ma_loai_van_tai: "FCL", ten_loai_van_tai: "Container nguyên (FCL)", mo_ta: "Full Container Load" },
    { ma_loai_van_tai: "LCL", ten_loai_van_tai: "Container lẻ (LCL)", mo_ta: "Less than Container Load" },
    { ma_loai_van_tai: "BREAKBULK", ten_loai_van_tai: "Hàng rời", mo_ta: "Hàng rời không container" },
    { ma_loai_van_tai: "RO-RO", ten_loai_van_tai: "Ro-Ro", mo_ta: "Hàng lăn bánh" },
    { ma_loai_van_tai: "EXPRESS", ten_loai_van_tai: "Chuyển phát nhanh", mo_ta: "DHL, FedEx, UPS..." },
    { ma_loai_van_tai: "REEFER", ten_loai_van_tai: "Container lạnh", mo_ta: "Hàng đông lạnh" },
    { ma_loai_van_tai: "TANK", ten_loai_van_tai: "Container bồn", mo_ta: "Hàng lỏng, hóa chất" },
    { ma_loai_van_tai: "BULK", ten_loai_van_tai: "Hàng rời khô", mo_ta: "Than, ngũ cốc..." },
    { ma_loai_van_tai: "PROJECT", ten_loai_van_tai: "Hàng dự án", mo_ta: "Hàng siêu trường siêu trọng" },
    { ma_loai_van_tai: "COURIER", ten_loai_van_tai: "Thư tín, mẫu", mo_ta: "Chuyển phát tài liệu" },
    { ma_loai_van_tai: "INLAND", ten_loai_van_tai: "Vận tải nội địa", mo_ta: "Từ cảng về kho" },
    { ma_loai_van_tai: "BARGE", ten_loai_van_tai: "Sà lan", mo_ta: "Vận tải sông" },
    { ma_loai_van_tai: "PIPE", ten_loai_van_tai: "Đường ống", mo_ta: "Dầu khí qua đường ống" },
    { ma_loai_van_tai: "HAND", ten_loai_van_tai: "Mang tay", mo_ta: "Hành lý ký gửi" },
    { ma_loai_van_tai: "POST", ten_loai_van_tai: "Bưu điện", mo_ta: "Chuyển phát qua bưu điện" },
  ];

  for (const data of loaiVanTaiData) {
    await prisma.loai_van_tai.create({ data }).catch((e) => {
      if (e.code === "P2002") return;
      throw e;
    });
  }

  // === LOAI_HINH_DAC_BIET (KHÔNG có @unique trên ma_loai_hinh → dùng create + catch) ===
  const loaiHinhData = [
    { ma_loai_hinh: "A11", ten_loai_hinh: "Nhập kinh doanh", mo_ta: "Nhập khẩu để kinh doanh thông thường" },
    { ma_loai_hinh: "A12", ten_loai_hinh: "Nhập gia công", mo_ta: "Nhập nguyên liệu để gia công xuất khẩu" },
    { ma_loai_hinh: "A13", ten_loai_hinh: "Nhập tái xuất", mo_ta: "Nhập để tái xuất" },
    { ma_loai_hinh: "A14", ten_loai_hinh: "Sản xuất xuất khẩu", mo_ta: "Nhập nguyên liệu sản xuất XK" },
    { ma_loai_hinh: "B11", ten_loai_hinh: "Xuất kinh doanh", mo_ta: "Xuất khẩu kinh doanh thông thường" },
    { ma_loai_hinh: "E21", ten_loai_hinh: "Nhập nguyên liệu SX XK (E21)", mo_ta: "Loại hình doanh nghiệp chế xuất" },
    { ma_loai_hinh: "E31", ten_loai_hinh: "Nhập kinh doanh KCN", mo_ta: "Khu công nghiệp" },
    { ma_loai_hinh: "G61", ten_loai_hinh: "Tạm nhập tái xuất", mo_ta: "Tạm nhập để tái xuất" },
    { ma_loai_hinh: "H11", ten_loai_hinh: "Xuất gia công", mo_ta: "Xuất sản phẩm gia công" },
    { ma_loai_hinh: "A41", ten_loai_hinh: "Nhập đầu tư", mo_ta: "Nhập máy móc dự án đầu tư" },
    { ma_loai_hinh: "B13", ten_loai_hinh: "Xuất tái nhập", mo_ta: "Xuất để tái nhập" },
    { ma_loai_hinh: "C11", ten_loai_hinh: "Nhập phi mậu dịch", mo_ta: "Quà biếu, viện trợ" },
    { ma_loai_hinh: "D11", ten_loai_hinh: "Xuất phi mậu dịch", mo_ta: "Quà biếu, viện trợ" },
    { ma_loai_hinh: "E62", ten_loai_hinh: "Tạm xuất tái nhập", mo_ta: "Tạm xuất để tái nhập" },
    { ma_loai_hinh: "A31", ten_loai_hinh: "Nhập kho ngoại quan", mo_ta: "Nhập vào kho ngoại quan" },
    { ma_loai_hinh: "B31", ten_loai_hinh: "Xuất kho ngoại quan", mo_ta: "Xuất từ kho ngoại quan" },
    { ma_loai_hinh: "E11", ten_loai_hinh: "Nhập tại chỗ", mo_ta: "Nhập tại chỗ từ DNCX" },
    { ma_loai_hinh: "F11", ten_loai_hinh: "Xuất tại chỗ", mo_ta: "Xuất tại chỗ cho DNCX" },
    { ma_loai_hinh: "G21", ten_loai_hinh: "Tạm nhập kinh doanh", mo_ta: "Tạm nhập để bán" },
    { ma_loai_hinh: "H21", ten_loai_hinh: "Gia công ngược", mo_ta: "Gia công cho thương nhân nước ngoài" },
  ];

  for (const data of loaiHinhData) {
    await prisma.loai_hinh_dac_biet.create({ data }).catch((e) => {
      if (e.code === "P2002") return; // nếu có trùng (dù không có unique, nhưng tránh lỗi khác)
      throw e;
    });
  }

  // === VAI_TRO (có @unique trên ma_vai_tro) ===
  const vaiTroData = [
    { ma_vai_tro: "SUPER_ADMIN", ten_vai_tro: "Quản trị hệ thống" },
    { ma_vai_tro: "ADMIN", ten_vai_tro: "Quản trị công ty" },
    { ma_vai_tro: "MANAGER", ten_vai_tro: "Quản lý" },
    { ma_vai_tro: "ACCOUNTANT", ten_vai_tro: "Kế toán" },
    { ma_vai_tro: "DECLARANT", ten_vai_tro: "Nhân viên khai báo hải quan" },
    { ma_vai_tro: "LOGISTICS", ten_vai_tro: "Nhân viên logistics" },
    { ma_vai_tro: "SALES", ten_vai_tro: "Nhân viên kinh doanh" },
    { ma_vai_tro: "PURCHASING", ten_vai_tro: "Nhân viên mua hàng" },
    { ma_vai_tro: "WAREHOUSE", ten_vai_tro: "Nhân viên kho" },
    { ma_vai_tro: "DOCUMENTS", ten_vai_tro: "Nhân viên chứng từ" },
    { ma_vai_tro: "CUSTOMS_AGENT", ten_vai_tro: "Đại lý hải quan" },
    { ma_vai_tro: "COMPLIANCE", ten_vai_tro: "Tuân thủ pháp lý" },
    { ma_vai_tro: "AUDITOR", ten_vai_tro: "Kiểm toán nội bộ" },
    { ma_vai_tro: "IT_SUPPORT", ten_vai_tro: "Hỗ trợ kỹ thuật" },
    { ma_vai_tro: "USER", ten_vai_tro: "Người dùng thông thường" },
    { ma_vai_tro: "GUEST", ten_vai_tro: "Khách xem" },
    { ma_vai_tro: "DIRECTOR", ten_vai_tro: "Giám đốc" },
    { ma_vai_tro: "DEPUTY", ten_vai_tro: "Phó giám đốc" },
    { ma_vai_tro: "IMPORT_STAFF", ten_vai_tro: "Nhân viên nhập khẩu" },
    { ma_vai_tro: "EXPORT_STAFF", ten_vai_tro: "Nhân viên xuất khẩu" },
  ];

  for (const data of vaiTroData) {
    await prisma.vai_tro.create({ data }).catch((e) => {
      if (e.code === "P2002") return;
      throw e;
    });
  }

  console.log("✅ Seed Master Data hoàn thành: quoc_gia, dia_diem_kho_bai, loai_van_tai, loai_hinh_dac_biet, vai_tro");
}
async function seedCoreDataRedo() {
  console.log("🌱 Bắt đầu SEED LẠI Core Data: cong_ty, nguoi_dung, doi_tac - mỗi bảng đúng 20 bản ghi");

  // Lấy dữ liệu master cần thiết
  const vaiTroList = await prisma.vai_tro.findMany();
  const quocGiaList = await prisma.quoc_gia.findMany();

  // --- 1. CONG_TY (20 công ty - upsert bằng ma_so_thue để an toàn khi chạy lại) ---
  const congTyData = [
    { ma_so_thue: "0101111111", ten_cong_ty: "CÔNG TY TNHH ECUS VIỆT NAM", dia_chi: "Hà Nội", ma_quoc_gia: "VN", nguoi_lien_he: "Nguyễn Văn An", dien_thoai: "0901111111", email: "contact@ecus.vn" },
    { ma_so_thue: "0102222222", ten_cong_ty: "CÔNG TY CP XNK SÀI GÒN", dia_chi: "TP. Hồ Chí Minh", ma_quoc_gia: "VN", nguoi_lien_he: "Trần Thị Bình", dien_thoai: "0912222222", email: "info@saigonimex.vn" },
    { ma_so_thue: "0103333333", ten_cong_ty: "CÔNG TY TNHH LOGISTICS HẢI PHÒNG", dia_chi: "Hải Phòng", ma_quoc_gia: "VN", nguoi_lien_he: "Lê Văn Cường", dien_thoai: "0923333333", email: "logi@haiphong.vn" },
    { ma_so_thue: "0104444444", ten_cong_ty: "CÔNG TY CP THƯƠNG MẠI ĐÀ NẴNG", dia_chi: "Đà Nẵng", ma_quoc_gia: "VN", nguoi_lien_he: "Phạm Thị Dung", dien_thoai: "0934444444", email: "trade@danang.vn" },
    { ma_so_thue: "0105555555", ten_cong_ty: "CÔNG TY TNHH SAMSUNG VIỆT NAM", dia_chi: "Bắc Ninh", ma_quoc_gia: "VN", nguoi_lien_he: "Kim Min Ho", dien_thoai: "0945555555", email: "contact@samsung.vn" },
    { ma_so_thue: "0106666666", ten_cong_ty: "CÔNG TY CP VINAMILK", dia_chi: "TP. Hồ Chí Minh", ma_quoc_gia: "VN", nguoi_lien_he: "Mai Thị Hoa", dien_thoai: "0956666666", email: "export@vinamilk.vn" },
    { ma_so_thue: "0107777777", ten_cong_ty: "CÔNG TY TNHH FOXCONN VIỆT NAM", dia_chi: "Bắc Giang", ma_quoc_gia: "VN", nguoi_lien_he: "Chen Wei", dien_thoai: "0967777777", email: "info@foxconn.vn" },
    { ma_so_thue: "0108888888", ten_cong_ty: "CÔNG TY CP THÉP HÒA PHÁT", dia_chi: "Hưng Yên", ma_quoc_gia: "VN", nguoi_lien_he: "Trần Đình Long", dien_thoai: "0978888888", email: "export@hoaphat.vn" },
    { ma_so_thue: "0109999999", ten_cong_ty: "CÔNG TY TNHH TOYOTA VIỆT NAM", dia_chi: "Vĩnh Phúc", ma_quoc_gia: "VN", nguoi_lien_he: "Tanaka Hiroshi", dien_thoai: "0989999999", email: "info@toyota.vn" },
    { ma_so_thue: "0110000000", ten_cong_ty: "CÔNG TY CP DẦU KHÍ VIỆT NAM", dia_chi: "Hà Nội", ma_quoc_gia: "VN", nguoi_lien_he: "Nguyễn Văn Khánh", dien_thoai: "0900000000", email: "pv@petrovietnam.vn" },
    { ma_so_thue: "0111111112", ten_cong_ty: "CÔNG TY TNHH INTEL VIỆT NAM", dia_chi: "TP. Hồ Chí Minh", ma_quoc_gia: "VN", nguoi_lien_he: "John Smith", dien_thoai: "0911111112", email: "intel@vn.com" },
    { ma_so_thue: "0112222223", ten_cong_ty: "CÔNG TY CP FPT", dia_chi: "Hà Nội", ma_quoc_gia: "VN", nguoi_lien_he: "Trương Gia Bình", dien_thoai: "0922222223", email: "export@fpt.vn" },
    { ma_so_thue: "0113333334", ten_cong_ty: "CÔNG TY TNHH LG ELECTRONICS VN", dia_chi: "Hải Phòng", ma_quoc_gia: "VN", nguoi_lien_he: "Park Ji Sung", dien_thoai: "0933333334", email: "lg@vn.com" },
    { ma_so_thue: "0114444445", ten_cong_ty: "CÔNG TY CP VIETTEL", dia_chi: "Hà Nội", ma_quoc_gia: "VN", nguoi_lien_he: "Nguyễn Mạnh Hùng", dien_thoai: "0944444445", email: "export@viettel.vn" },
    { ma_so_thue: "0115555556", ten_cong_ty: "CÔNG TY TNHH PANASONIC VN", dia_chi: "Hà Nội", ma_quoc_gia: "VN", nguoi_lien_he: "Yamada Taro", dien_thoai: "0955555556", email: "panasonic@vn.com" },
    { ma_so_thue: "0116666667", ten_cong_ty: "CÔNG TY CP MASAN GROUP", dia_chi: "TP. Hồ Chí Minh", ma_quoc_gia: "VN", nguoi_lien_he: "Nguyễn Đăng Quang", dien_thoai: "0966666667", email: "export@masan.vn" },
    { ma_so_thue: "0117777778", ten_cong_ty: "CÔNG TY TNHH BOSCH VIỆT NAM", dia_chi: "Đồng Nai", ma_quoc_gia: "VN", nguoi_lien_he: "Hans Müller", dien_thoai: "0977777778", email: "bosch@vn.com" },
    { ma_so_thue: "0118888889", ten_cong_ty: "CÔNG TY CP VINFAST", dia_chi: "Hải Phòng", ma_quoc_gia: "VN", nguoi_lien_he: "Phạm Nhật Vượng", dien_thoai: "0988888889", email: "export@vinfast.vn" },
    { ma_so_thue: "0119999990", ten_cong_ty: "CÔNG TY TNHH UNILEVER VIỆT NAM", dia_chi: "TP. Hồ Chí Minh", ma_quoc_gia: "VN", nguoi_lien_he: "Maria Lopez", dien_thoai: "0999999990", email: "unilever@vn.com" },
    { ma_so_thue: "0120000001", ten_cong_ty: "CÔNG TY CP THỦY SẢN MINH PHÚ", dia_chi: "Cà Mau", ma_quoc_gia: "VN", nguoi_lien_he: "Lê Văn Thời", dien_thoai: "0900000001", email: "export@minhphu.com" },
  ];

  const createdCongTy = [];
  for (const data of congTyData) {
    const congTy = await prisma.cong_ty.upsert({
      where: { ma_so_thue: data.ma_so_thue },
      update: {},
      create: data,
    });
    createdCongTy.push(congTy);
  }

  // --- 2. NGUOI_DUNG (20 user - mật khẩu đều là "000000") ---
  // bcrypt hash của "000000" (cost 10)
  const hashedPassword = "$2b$10$0yvEJKywjDnm.CMarlN7neQHHv3vrVJmoPuTPsY3HvR5O7gNhVSbi";

  const nguoiDungData = [
    { ten_dang_nhap: "superadmin", ho_ten: "Super Administrator", email: "superadmin@ecus.vn", dien_thoai: "0900000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "SUPER_ADMIN")?.id_vai_tro, id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_dang_nhap: "admin_ecus", ho_ten: "Admin ECUS", email: "admin@ecus.vn", dien_thoai: "0900000002", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "ADMIN")?.id_vai_tro, id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_dang_nhap: "manager_ecus", ho_ten: "Manager ECUS", email: "manager@ecus.vn", dien_thoai: "0900000003", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "MANAGER")?.id_vai_tro, id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_dang_nhap: "declarant_ecus", ho_ten: "Khai báo ECUS", email: "declarant@ecus.vn", dien_thoai: "0900000004", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "DECLARANT")?.id_vai_tro, id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_dang_nhap: "logistics_ecus", ho_ten: "Logistics ECUS", email: "logistics@ecus.vn", dien_thoai: "0900000005", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "LOGISTICS")?.id_vai_tro, id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_dang_nhap: "admin_saigon", ho_ten: "Admin Sài Gòn", email: "admin@saigonimex.vn", dien_thoai: "0910000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "ADMIN")?.id_vai_tro, id_cong_ty: createdCongTy[1].id_cong_ty },
    { ten_dang_nhap: "sales_saigon", ho_ten: "Sales Sài Gòn", email: "sales@saigonimex.vn", dien_thoai: "0910000002", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "SALES")?.id_vai_tro, id_cong_ty: createdCongTy[1].id_cong_ty },
    { ten_dang_nhap: "accountant_hp", ho_ten: "Kế toán Hải Phòng", email: "accountant@haiphong.vn", dien_thoai: "0920000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "ACCOUNTANT")?.id_vai_tro, id_cong_ty: createdCongTy[2].id_cong_ty },
    { ten_dang_nhap: "import1", ho_ten: "NV Nhập khẩu 1", email: "import1@ecus.vn", dien_thoai: "0900000006", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "IMPORT_STAFF")?.id_vai_tro, id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_dang_nhap: "export1", ho_ten: "NV Xuất khẩu 1", email: "export1@ecus.vn", dien_thoai: "0900000007", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "EXPORT_STAFF")?.id_vai_tro, id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_dang_nhap: "user_samsung", ho_ten: "User Samsung VN", email: "user@samsung.vn", dien_thoai: "0940000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "USER")?.id_vai_tro, id_cong_ty: createdCongTy[4].id_cong_ty },
    { ten_dang_nhap: "manager_vinamilk", ho_ten: "Manager Vinamilk", email: "manager@vinamilk.vn", dien_thoai: "0950000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "MANAGER")?.id_vai_tro, id_cong_ty: createdCongTy[5].id_cong_ty },
    { ten_dang_nhap: "declarant_foxconn", ho_ten: "Declarant Foxconn", email: "declarant@foxconn.vn", dien_thoai: "0960000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "DECLARANT")?.id_vai_tro, id_cong_ty: createdCongTy[6].id_cong_ty },
    { ten_dang_nhap: "admin_hoaphat", ho_ten: "Admin Hòa Phát", email: "admin@hoaphat.vn", dien_thoai: "0970000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "ADMIN")?.id_vai_tro, id_cong_ty: createdCongTy[7].id_cong_ty },
    { ten_dang_nhap: "logistics_toyota", ho_ten: "Logistics Toyota", email: "logistics@toyota.vn", dien_thoai: "0980000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "LOGISTICS")?.id_vai_tro, id_cong_ty: createdCongTy[8].id_cong_ty },
    { ten_dang_nhap: "sales_intel", ho_ten: "Sales Intel VN", email: "sales@intel.vn", dien_thoai: "0911000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "SALES")?.id_vai_tro, id_cong_ty: createdCongTy[10].id_cong_ty },
    { ten_dang_nhap: "manager_fpt", ho_ten: "Manager FPT", email: "manager@fpt.vn", dien_thoai: "0921000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "MANAGER")?.id_vai_tro, id_cong_ty: createdCongTy[11].id_cong_ty },
    { ten_dang_nhap: "declarant_lg", ho_ten: "Declarant LG VN", email: "declarant@lg.vn", dien_thoai: "0931000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "DECLARANT")?.id_vai_tro, id_cong_ty: createdCongTy[12].id_cong_ty },
    { ten_dang_nhap: "admin_viettel", ho_ten: "Admin Viettel", email: "admin@viettel.vn", dien_thoai: "0941000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "ADMIN")?.id_vai_tro, id_cong_ty: createdCongTy[13].id_cong_ty },
    { ten_dang_nhap: "user_masan", ho_ten: "User Masan", email: "user@masan.vn", dien_thoai: "0961000001", mat_khau: hashedPassword, id_vai_tro: vaiTroList.find(v => v.ma_vai_tro === "USER")?.id_vai_tro, id_cong_ty: createdCongTy[15].id_cong_ty },
  ];

  const createdNguoiDung = [];
  for (const data of nguoiDungData) {
    const user = await prisma.nguoi_dung.upsert({
      where: { ten_dang_nhap: data.ten_dang_nhap },
      update: { mat_khau: hashedPassword }, // đảm bảo mật khẩu luôn là 000000 khi chạy lại
      create: {
        ...data,
        kich_hoat: true,
      },
    });
    createdNguoiDung.push(user);
  }

  // --- 3. DOI_TAC (20 đối tác) ---
  const doiTacData = [
    { ten_doi_tac: "ABC Electronics Ltd.", loai_doi_tac: "XUAT_KHAU", ma_quoc_gia: "CN", dia_chi: "Shanghai, China", nguoi_lien_he: "Li Wei", dien_thoai_lien_he: "+862112345678", email_lien_he: "sales@abcelec.cn", id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_doi_tac: "XYZ Global Trading Inc.", loai_doi_tac: "NHAP_KHAU", ma_quoc_gia: "US", dia_chi: "New York, USA", nguoi_lien_he: "John Doe", dien_thoai_lien_he: "+12125550123", email_lien_he: "purchase@xyzglobal.us", id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_doi_tac: "Đại lý Hải quan Hà Nội", loai_doi_tac: "DAI_LY", ma_quoc_gia: "VN", dia_chi: "Hà Nội", nguoi_lien_he: "Nguyễn Văn Hải", dien_thoai_lien_he: "0903111111", email_lien_he: "agent@hanoi.vn", id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_doi_tac: "COSCO Shipping", loai_doi_tac: "NHA_SAN_XUAT", ma_quoc_gia: "CN", dia_chi: "Shanghai, China", nguoi_lien_he: "Wang Ming", dien_thoai_lien_he: "+862198765432", email_lien_he: "booking@cosco.com", id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_doi_tac: "Samsung Electronics Korea", loai_doi_tac: "XUAT_KHAU", ma_quoc_gia: "KR", dia_chi: "Suwon, Korea", nguoi_lien_he: "Kim Ji-hoon", dien_thoai_lien_he: "+82311234567", email_lien_he: "export@samsung.kr", id_cong_ty: createdCongTy[4].id_cong_ty },
    { ten_doi_tac: "Apple Inc.", loai_doi_tac: "NHAP_KHAU", ma_quoc_gia: "US", dia_chi: "Cupertino, USA", nguoi_lien_he: "Supply Chain", dien_thoai_lien_he: "+14085550198", email_lien_he: "supply@apple.com", id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_doi_tac: "Foxconn International", loai_doi_tac: "GIA_CONG", ma_quoc_gia: "TW", dia_chi: "Taipei, Taiwan", nguoi_lien_he: "Terry Gou", dien_thoai_lien_he: "+886212345678", email_lien_he: "contract@foxconn.com", id_cong_ty: createdCongTy[6].id_cong_ty },
    { ten_doi_tac: "Maersk Line", loai_doi_tac: "NHA_SAN_XUAT", ma_quoc_gia: "DK", dia_chi: "Copenhagen, Denmark", nguoi_lien_he: "Booking Dept", dien_thoai_lien_he: "+4533633363", email_lien_he: "booking@maersk.com", id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_doi_tac: "Panasonic Japan", loai_doi_tac: "XUAT_KHAU", ma_quoc_gia: "JP", dia_chi: "Osaka, Japan", nguoi_lien_he: "Export Team", dien_thoai_lien_he: "+81669081111", email_lien_he: "export@panasonic.jp", id_cong_ty: createdCongTy[14].id_cong_ty },
    { ten_doi_tac: "Amazon Global", loai_doi_tac: "NHAP_KHAU", ma_quoc_gia: "US", dia_chi: "Seattle, USA", nguoi_lien_he: "Vendor Central", dien_thoai_lien_he: "+12062661000", email_lien_he: "vendor@amazon.com", id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_doi_tac: "Đại lý Hải quan Sài Gòn", loai_doi_tac: "DAI_LY", ma_quoc_gia: "VN", dia_chi: "TP.HCM", nguoi_lien_he: "Trần Văn Nam", dien_thoai_lien_he: "0918222222", email_lien_he: "agent@saigon.vn", id_cong_ty: createdCongTy[1].id_cong_ty },
    { ten_doi_tac: "Evergreen Marine", loai_doi_tac: "NHA_SAN_XUAT", ma_quoc_gia: "TW", dia_chi: "Taipei, Taiwan", nguoi_lien_he: "Booking", dien_thoai_lien_he: "+886225057788", email_lien_he: "booking@evergreen.com", id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_doi_tac: "LG Electronics Korea", loai_doi_tac: "XUAT_KHAU", ma_quoc_gia: "KR", dia_chi: "Seoul, Korea", nguoi_lien_he: "Export Dept", dien_thoai_lien_he: "+82212345678", email_lien_he: "export@lge.com", id_cong_ty: createdCongTy[12].id_cong_ty },
    { ten_doi_tac: "Walmart Stores Inc.", loai_doi_tac: "NHAP_KHAU", ma_quoc_gia: "US", dia_chi: "Bentonville, USA", nguoi_lien_he: "Supplier", dien_thoai_lien_he: "+14792734000", email_lien_he: "supplier@walmart.com", id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_doi_tac: "Intel Corporation", loai_doi_tac: "XUAT_KHAU", ma_quoc_gia: "US", dia_chi: "Santa Clara, USA", nguoi_lien_he: "Supply Chain", dien_thoai_lien_he: "+14087658080", email_lien_he: "supply@intel.com", id_cong_ty: createdCongTy[10].id_cong_ty },
    { ten_doi_tac: "Hapag-Lloyd", loai_doi_tac: "NHA_SAN_XUAT", ma_quoc_gia: "DE", dia_chi: "Hamburg, Germany", nguoi_lien_he: "Booking", dien_thoai_lien_he: "+494030010", email_lien_he: "booking@hlag.com", id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_doi_tac: "Toyota Motor Japan", loai_doi_tac: "XUAT_KHAU", ma_quoc_gia: "JP", dia_chi: "Toyota City, Japan", nguoi_lien_he: "Export", dien_thoai_lien_he: "+81565282121", email_lien_he: "export@toyota.jp", id_cong_ty: createdCongTy[8].id_cong_ty },
    { ten_doi_tac: "Best Buy", loai_doi_tac: "NHAP_KHAU", ma_quoc_gia: "US", dia_chi: "Richfield, USA", nguoi_lien_he: "Vendor", dien_thoai_lien_he: "+16122911000", email_lien_he: "vendor@bestbuy.com", id_cong_ty: createdCongTy[0].id_cong_ty },
    { ten_doi_tac: "Đại lý Hải quan Đà Nẵng", loai_doi_tac: "DAI_LY", ma_quoc_gia: "VN", dia_chi: "Đà Nẵng", nguoi_lien_he: "Lê Thị Lan", dien_thoai_lien_he: "0935333333", email_lien_he: "agent@danang.vn", id_cong_ty: createdCongTy[3].id_cong_ty },
    { ten_doi_tac: "Bosch Germany", loai_doi_tac: "XUAT_KHAU", ma_quoc_gia: "DE", dia_chi: "Gerlingen, Germany", nguoi_lien_he: "Export Team", dien_thoai_lien_he: "+497118110", email_lien_he: "export@bosch.com", id_cong_ty: createdCongTy[16].id_cong_ty },
  ];

  // Xóa cũ nếu cần chạy lại sạch (tuỳ chọn), hoặc dùng upsert nếu có unique field
  // Ở đây dùng create vì không có unique constraint rõ ràng ngoài id tự tăng
  const createdDoiTac = [];
  for (const data of doiTacData) {
    const doiTac = await prisma.doi_tac.create({
      data,
    });
    createdDoiTac.push(doiTac);
  }

  console.log("✅ SEED LẠI HOÀN TẤT:");
  console.log(`   → cong_ty: ${createdCongTy.length} bản ghi`);
  console.log(`   → nguoi_dung: ${createdNguoiDung.length} bản ghi (mật khẩu đều là 000000)`);
  console.log(`   → doi_tac: ${createdDoiTac.length} bản ghi`);
}
async function seedContractData() {
  console.log("🌱 Bắt đầu seed Contract Data: hop_dong, vat_lieu_hop_dong, san_pham_hop_dong, phu_luc_hop_dong, van_ban_giay_phep - mỗi bảng chính ~20 bản ghi");

  // Lấy dữ liệu cần thiết
  const congTyList = await prisma.cong_ty.findMany({ take: 20 });
  const nguoiDungList = await prisma.nguoi_dung.findMany({ take: 20 });
  const doiTacList = await prisma.doi_tac.findMany({ take: 20 });
  const loaiHinhList = await prisma.loai_hinh_dac_biet.findMany();

  const randomCongTy = () => congTyList[Math.floor(Math.random() * congTyList.length)];
  const randomNguoiDung = () => nguoiDungList[Math.floor(Math.random() * nguoiDungList.length)];
  const randomDoiTac = (loai) => {
    const filtered = doiTacList.filter(dt => dt.loai_doi_tac === loai);
    return filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : doiTacList[0];
  };
  const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // --- 1. HOP_DONG (20 hợp đồng - 10 nhập khẩu, 10 xuất khẩu) ---
  const hopDongList = [];
  for (let i = 1; i <= 20; i++) {
    const isNhapKhau = i <= 10;
    const loaiHD = isNhapKhau ? "NHAP_KHAU" : "XUAT_KHAU";
    const doiTac = isNhapKhau
      ? randomDoiTac("XUAT_KHAU")  // Nhà cung cấp nước ngoài
      : randomDoiTac("NHAP_KHAU"); // Khách hàng nước ngoài

    const hopDong = await prisma.hop_dong.create({
      data: {
        id_hop_dong: `HD-${String(i).padStart(3, '0')}`,
        so_hop_dong: `HD-ECUS-${String(i).padStart(4, '0')}`,
        loai_hop_dong: loaiHD,
        ngay_ky: randomDate(new Date(2023, 0, 1), new Date(2025, 11, 31)),
        ngay_het_han: randomDate(new Date(2026, 0, 1), new Date(2028, 11, 31)),
        tong_gia_tri: Math.round(Math.random() * 900000 + 100000), // 100k - 1M USD
        ma_ngoai_te: "USD",
        dieu_kien_thanh_toan: randomItem(["L/C", "TTR", "D/P", "T/T"]),
        ma_cuc_hai_quan: randomItem(["HP", "SG", "DN", "HN"]),
        id_cong_ty: randomCongTy().id_cong_ty,
        id_doi_tac: doiTac.id_doi_tac,
        nguoi_tao: randomNguoiDung().id_nguoi_dung,
      },
    });
    hopDongList.push(hopDong);
  }

  // --- 2. VAT_LIEU_HOP_DONG & SAN_PHAM_HOP_DONG (mỗi hợp đồng có 1-3 vật liệu/sản phẩm) ---
  const commonHS = ["84713020", "85171200", "85423100", "84715000", "85235110"];
  const commonUnits = ["Cái", "Chiếc", "Bộ", "Kg", "Mét"];

  for (const hd of hopDongList) {
    const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items
    for (let j = 1; j <= numItems; j++) {
      const isVatLieu = hd.loai_hop_dong === "NHAP_KHAU" || Math.random() > 0.5;

      if (isVatLieu) {
        await prisma.vat_lieu_hop_dong.create({
          data: {
            ma_vat_lieu: `VL-${hd.id_hop_dong}-${j}`,
            ten_vat_lieu: `Vật liệu ${j} cho ${hd.so_hop_dong}`,
            don_vi_tinh: randomItem(commonUnits),
            so_luong: Math.round(Math.random() * 9000 + 100),
            nguon_goc: randomItem(["CN", "KR", "JP", "US", "TW"]),
            ma_hs: randomItem(commonHS),
            don_gia: Math.round(Math.random() * 900 + 100),
            tong_gia_tri: Math.round(Math.random() * 90000 + 10000),
            id_hop_dong: hd.id_hop_dong,
          },
        });
      } else {
        await prisma.san_pham_hop_dong.create({
          data: {
            ma_san_pham: `SP-${hd.id_hop_dong}-${j}`,
            ten_san_pham: `Sản phẩm ${j} từ ${hd.so_hop_dong}`,
            don_vi_tinh: randomItem(commonUnits),
            so_luong: Math.round(Math.random() * 5000 + 50),
            ma_hs: randomItem(commonHS),
            don_gia: Math.round(Math.random() * 1900 + 100),
            tong_gia_tri: Math.round(Math.random() * 190000 + 10000),
            id_hop_dong: hd.id_hop_dong,
          },
        });
      }
    }
  }

  // Tổng cộng sẽ có khoảng 40-60 bản ghi vật liệu + sản phẩm

  // --- 3. PHU_LUC_HOP_DONG (20 phụ lục - phân bổ ngẫu nhiên cho các hợp đồng) ---
  for (let i = 1; i <= 20; i++) {
    const hd = randomItem(hopDongList);
    await prisma.phu_luc_hop_dong.create({
      data: {
        so_phu_luc: `PL-${String(i).padStart(3, '0')}`,
        ngay_phu_luc: randomDate(new Date(2024, 0, 1), new Date()),
        mo_ta: randomItem(["Điều chỉnh giá", "Thay đổi số lượng", "Gia hạn thời gian", "Bổ sung mặt hàng"]),
        loai_thay_doi: randomItem(["GIA", "SO_LUONG", "THOI_GIAN", "MAT_HANG"]),
        id_hop_dong: hd.id_hop_dong,
        nguoi_tao: randomNguoiDung().id_nguoi_dung,
      },
    });
  }

  // --- 4. VAN_BAN_GIAY_PHEP (20 giấy phép - chủ yếu cho hợp đồng nhập khẩu) ---
  const nhapKhauHDs = hopDongList.filter(hd => hd.loai_hop_dong === "NHAP_KHAU");
  for (let i = 1; i <= 20; i++) {
    const hd = i <= nhapKhauHDs.length ? nhapKhauHDs[i - 1] : randomItem(hopDongList);
    await prisma.van_ban_giay_phep.create({
      data: {
        ma_so: `GP-${String(i).padStart(4, '0')}`,
        loai: randomItem(["IMPORT_LICENSE", "EXPORT_LICENSE", "CO", "FQ", "HEALTH_CERT"]),
        id_hop_dong: hd.id_hop_dong,
      },
    });
  }

  console.log("✅ Seed Contract Data hoàn thành:");
  console.log(`   → hop_dong: 20`);
  console.log(`   → vat_lieu_hop_dong + san_pham_hop_dong: ~50 bản ghi`);
  console.log(`   → phu_luc_hop_dong: 20`);
  console.log(`   → van_ban_giay_phep: 20`);
}
async function seedTaxData() {
  console.log("🌱 Bắt đầu seed ma_hs và bieu_thue (20 mã HS phổ biến)");

  const maHSData = [
    { ma_hs: "84713020", mo_ta: "Máy tính xách tay", thue_nhap_khau: 0.0, thue_vat: 10.0 },
    { ma_hs: "85171200", mo_ta: "Điện thoại di động", thue_nhap_khau: 0.0, thue_vat: 10.0 },
    { ma_hs: "85423100", mo_ta: "Mạch tích hợp điện tử", thue_nhap_khau: 0.0, thue_vat: 10.0 },
    { ma_hs: "84715000", mo_ta: "Server/CPU", thue_nhap_khau: 0.0, thue_vat: 10.0 },
    { ma_hs: "85235110", mo_ta: "Ổ cứng SSD", thue_nhap_khau: 0.0, thue_vat: 10.0 },
    { ma_hs: "84433100", mo_ta: "Máy in đa năng", thue_nhap_khau: 0.0, thue_vat: 10.0 },
    { ma_hs: "85044090", mo_ta: "Bộ nguồn", thue_nhap_khau: 5.0, thue_vat: 10.0 },
    { ma_hs: "85444299", mo_ta: "Cáp kết nối", thue_nhap_khau: 0.0, thue_vat: 10.0 },
    { ma_hs: "85176249", mo_ta: "Router mạng", thue_nhap_khau: 0.0, thue_vat: 10.0 },
    { ma_hs: "90318090", mo_ta: "Cảm biến", thue_nhap_khau: 5.0, thue_vat: 10.0 },
    { ma_hs: "84151010", mo_ta: "Máy lạnh", thue_nhap_khau: 10.0, thue_vat: 10.0 },
    { ma_hs: "84501190", mo_ta: "Máy giặt", thue_nhap_khau: 15.0, thue_vat: 10.0 },
    { ma_hs: "62052000", mo_ta: "Áo sơ mi nam", thue_nhap_khau: 20.0, thue_vat: 10.0 },
    { ma_hs: "61091000", mo_ta: "Áo thun", thue_nhap_khau: 20.0, thue_vat: 10.0 },
    { ma_hs: "64039990", mo_ta: "Giày dép", thue_nhap_khau: 30.0, thue_vat: 10.0 },
    { ma_hs: "87032390", mo_ta: "Ô tô con", thue_nhap_khau: 70.0, thue_vat: 10.0 },
    { ma_hs: "72091700", mo_ta: "Thép cán nguội", thue_nhap_khau: 10.0, thue_vat: 10.0 },
    { ma_hs: "27101943", mo_ta: "Dầu diesel", thue_nhap_khau: 5.0, thue_vat: 10.0 },
    { ma_hs: "39011000", mo_ta: "Nhựa PE", thue_nhap_khau: 3.0, thue_vat: 10.0 },
    { ma_hs: "52010000", mo_ta: "Bông xơ", thue_nhap_khau: 0.0, thue_vat: 10.0 },
  ];

  for (const data of maHSData) {
    await prisma.ma_hs.create({ data }).catch((e) => {
      if (e.code === "P2002") return; // bỏ qua nếu trùng
      throw e;
    });
  }

  const allHS = await prisma.ma_hs.findMany();
  for (const hs of allHS) {
    await prisma.bieu_thue.create({
      data: {
        ma_hs: hs.ma_hs,
        hieu_luc_tu: new Date("2025-01-01"),
        hieu_luc_den: new Date("2030-12-31"),
        thue_suat: hs.thue_nhap_khau || 0,
        thue_vat: 10,
        ghi_chu: "Thuế suất mẫu",
      },
    }).catch((e) => {
      if (e.code === "P2002") return;
      throw e;
    });
  }

  console.log("✅ Seed ma_hs và bieu_thue hoàn thành (20 bản ghi mỗi bảng)");
}
async function seedLogisticsAndDeclarationData() {
  console.log("🌱 Bắt đầu seed Logistics & Declaration Data: lo_hang, hoa_don, van_don, container, to_khai_hai_quan, chi_tiet_to_khai - mỗi bảng chính 20 bản ghi");

  // Lấy dữ liệu cần thiết
  const hopDongList = await prisma.hop_dong.findMany({ take: 20 });
  const congTyList = await prisma.cong_ty.findMany({ take: 20 });
  const nguoiDungList = await prisma.nguoi_dung.findMany({ take: 20 });
  const doiTacList = await prisma.doi_tac.findMany({ take: 20 });
  const loaiVanTaiList = await prisma.loai_van_tai.findMany();
  const loaiHinhList = await prisma.loai_hinh_dac_biet.findMany();
  const diaDiemList = await prisma.dia_diem_kho_bai.findMany();
  const bieuThueList = await prisma.bieu_thue.findMany();

  const randomHopDong = () => hopDongList[Math.floor(Math.random() * hopDongList.length)];
  const randomCongTy = () => congTyList[Math.floor(Math.random() * congTyList.length)];
  const randomNguoiDung = () => nguoiDungList[Math.floor(Math.random() * nguoiDungList.length)];
  const randomDaiLy = () => doiTacList.filter(dt => dt.loai_doi_tac === "DAI_LY")[Math.floor(Math.random() * 3)] || doiTacList[0];
  const randomVanChuyen = () => doiTacList.filter(dt => dt.loai_doi_tac === "NHA_SAN_XUAT")[Math.floor(Math.random() * 5)] || doiTacList[0];
  const randomLoaiVanTai = () => loaiVanTaiList[Math.floor(Math.random() * loaiVanTaiList.length)];
  const randomLoaiHinh = () => loaiHinhList[Math.floor(Math.random() * loaiHinhList.length)];
  const randomDiaDiem = () => diaDiemList[Math.floor(Math.random() * diaDiemList.length)];
  const randomBieuThue = () => bieuThueList[Math.floor(Math.random() * bieuThueList.length)];
  const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  const trangThaiToKhaiList = ["CHO_GUI", "DA_GUI", "TU_CHOI", "DA_TIEP_NHAN", "DA_THONG_QUAN"];

  // --- 1. LO_HANG (20 lô hàng) ---
  const loHangIds = [];
  for (let i = 1; i <= 20; i++) {
    const hd = randomHopDong();
    const loHang = await prisma.lo_hang.create({
      data: {
        so_lo_hang: `LH-${String(i).padStart(4, '0')}`,
        cang_xep_hang: randomDiaDiem().ten_dia_diem,
        cang_do_hang: randomDiaDiem().ten_dia_diem,
        ngay_du_kien_xuat: randomDate(new Date(2025, 0, 1), new Date(2025, 11, 31)),
        ngay_du_kien_nhap: randomDate(new Date(2026, 0, 1), new Date(2026, 11, 31)),
        tong_gia_tri: Math.round(Math.random() * 800000 + 20000),
        ma_ngoai_te: "USD",
        mo_ta: `Lô hàng ${i} theo hợp đồng ${hd.so_hop_dong}`,
        id_hop_dong: hd.id_hop_dong,
        id_cong_ty: randomCongTy().id_cong_ty,
        id_dai_ly: randomDaiLy().id_doi_tac,
        id_van_chuyen: randomVanChuyen().id_doi_tac,
        id_loai_van_tai: randomLoaiVanTai().id_loai_van_tai,
        nguoi_tao: randomNguoiDung().id_nguoi_dung,
      },
    });
    loHangIds.push(loHang.id_lo_hang);
  }
  const loHangList = await prisma.lo_hang.findMany({
    where: { id_lo_hang: { in: loHangIds } },
    include: { hop_dong: true },
  });

  // --- 2. HOA_DON (20 hóa đơn thương mại) ---
  for (let i = 0; i < 20; i++) {
    const lh = loHangList[i];
    const isNhap = lh.hop_dong.loai_hop_dong === "NHAP_KHAU";
    await prisma.hoa_don.create({
      data: {
        so_hoa_don: `INV-${String(i + 1).padStart(4, '0')}`,
        ngay_hoa_don: randomDate(new Date(2025, 0, 1), new Date()),
        tong_tien: lh.tong_gia_tri,
        ma_ngoai_te: "USD",
        dieu_kien_giao_hang: randomItem(["FOB", "CIF", "CFR", "EXW", "DAP"]),
        id_lo_hang: lh.id_lo_hang,
        id_nguoi_ban: isNhap ? doiTacList.find(dt => dt.loai_doi_tac === "XUAT_KHAU")?.id_doi_tac : randomCongTy().id_cong_ty,
        id_nguoi_mua: isNhap ? randomCongTy().id_cong_ty : doiTacList.find(dt => dt.loai_doi_tac === "NHAP_KHAU")?.id_doi_tac,
      },
    });
  }

  // --- 3. VAN_DON & CONTAINER (mỗi lô hàng có 1 vận đơn + 1-3 container) ---
  for (const lh of loHangList) {
    await prisma.van_don.create({
      data: {
        so_van_don: `BL-${lh.so_lo_hang.slice(3)}`,
        ten_tau: randomItem(["COSCO SHIPPING", "MAERSK", "EVERGREEN", "HAPAG-LLOYD", "ONE"]),
        hanh_trinh: `${lh.cang_xep_hang} → ${lh.cang_do_hang}`,
        so_container: Math.floor(Math.random() * 10) + 1,
        id_lo_hang: lh.id_lo_hang,
      },
    });

    const numContainer = Math.floor(Math.random() * 3) + 1;
    for (let j = 1; j <= numContainer; j++) {
      await prisma.container.create({
        data: {
          so_container: `CONT${lh.id_lo_hang}-${j}`,
          so_chi: `SEAL${String(j).padStart(4, '0')}`,
          loai_container: randomItem(["20FT", "40FT", "40HC", "REEFER"]),
          trong_luong_brut: Math.round(Math.random() * 25000 + 5000),
          trong_luong_net: Math.round(Math.random() * 22000 + 4000),
          id_lo_hang: lh.id_lo_hang,
        },
      });
    }
  }

  // --- 4. TO_KHAI_HAI_QUAN (20 tờ khai - đa dạng trạng thái) ---
  const toKhaiList = [];
  for (let i = 1; i <= 20; i++) {
    const lh = loHangList[(i - 1) % loHangList.length];
    const trangThai = trangThaiToKhaiList[(i - 1) % trangThaiToKhaiList.length]; // Đa dạng trạng thái

    const toKhai = await prisma.to_khai_hai_quan.create({
      data: {
        so_to_khai: `TK${String(i).padStart(6, '0')}`,
        loai_to_khai: lh.hop_dong.loai_hop_dong === "NHAP_KHAU" ? "IDA" : "EDB",
        trang_thai_gui: trangThai,
        mau_kenh: randomItem(["IDA", "EDB", "IDC"]),
        phan_loai: randomItem(["XANH", "VANG", "DO"]),
        so_tien_thue: Math.round(Math.random() * 50000),
        ma_cuc_hai_quan: randomItem(["HP", "SG", "DN", "HN"]),
        ngay_khai_bao: new Date(),
        id_lo_hang: lh.id_lo_hang,
        id_loai_hinh: randomLoaiHinh().id_loai_hinh,
        id_hop_dong: lh.id_hop_dong,
        id_cong_ty: lh.id_cong_ty,
        nguoi_tao: randomNguoiDung().id_nguoi_dung,
      },
    });
    toKhaiList.push(toKhai);

    // --- 5. CHI_TIET_TO_KHAI (mỗi tờ khai có 1-4 dòng hàng) ---
    const numLines = Math.floor(Math.random() * 4) + 1;
    for (let j = 1; j <= numLines; j++) {
      const bt = randomBieuThue();
      await prisma.chi_tiet_to_khai.create({
        data: {
          so_dong: j,
          ma_hs: bt.ma_hs,
          mo_ta_hang_hoa: `Hàng hóa dòng ${j} - ${bt.ma_hs}`,
          so_luong: Math.round(Math.random() * 5000 + 10),
          don_vi_tinh: randomItem(["Cái", "Bộ", "Kg"]),
          don_gia: Math.round(Math.random() * 2000 + 50),
          tong_gia_tri: Math.round(Math.random() * 100000 + 5000),
          ma_ngoai_te: "USD",
          ma_quoc_gia: randomItem(["CN", "KR", "US", "JP"]),
          tien_thue: Math.round(Math.random() * 10000),
          tien_vat: Math.round(Math.random() * 10000),
          id_to_khai: toKhai.id_to_khai,
          id_bieu_thue: bt.id_bieu_thue,
        },
      });
    }
  }

  console.log("✅ Seed Logistics & Declaration hoàn thành:");
  console.log(`   → lo_hang: 20`);
  console.log(`   → hoa_don: 20`);
  console.log(`   → van_don: 20`);
  console.log(`   → container: ~40-60`);
  console.log(`   → to_khai_hai_quan: 20 (đa dạng trạng thái)`);
  console.log(`   → chi_tiet_to_khai: ~60 bản ghi`);
}
async function seedFinalData() {
  console.log("🌱 Bắt đầu seed Final Data: to_khai_tri_gia, thanh_toan_thue, phan_hoi_hai_quan, tai_lieu, thong_bao_he_thong, audit_log, log_tich_hop, lich_su_trang_thai - mỗi bảng chính ~20 bản ghi");

  // Lấy dữ liệu cần thiết
  const toKhaiList = await prisma.to_khai_hai_quan.findMany({ take: 20 });
  const nguoiDungList = await prisma.nguoi_dung.findMany({ take: 20 });
  const thanhToanList = []; // sẽ lưu để liên kết giao dịch ngân hàng

  const randomNguoiDung = () => nguoiDungList[Math.floor(Math.random() * nguoiDungList.length)];
  const randomToKhai = () => toKhaiList[Math.floor(Math.random() * toKhaiList.length)];
  const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // --- 1. TO_KHAI_TRI_GIA (20 tờ khai trị giá) ---
  for (let i = 1; i <= 20; i++) {
    const tk = toKhaiList[(i - 1) % toKhaiList.length];
    const triGia = await prisma.to_khai_tri_gia.create({
      data: {
        ma_phan_loai_khai_tri_gia: tk.loai_to_khai === "IDA" ? "IMPORT" : "EXPORT",
        ma_tien_te: "USD",
        gia_co_so_hieu_chinh: Math.round(Math.random() * 900000 + 100000),
        tong_he_so_phan_bo: 1.0 + Math.random() * 0.2,
        nguoi_nop_thue: "CÔNG TY TNHH ECUS VIỆT NAM",
        id_to_khai_hai_quan: tk.id_to_khai,
        nguoi_tao: randomNguoiDung().id_nguoi_dung,
      },
    });

    // Khoản điều chỉnh trị giá (1-2 khoản mỗi tờ khai trị giá)
    const numAdjust = Math.floor(Math.random() * 2) + 1;
    for (let j = 1; j <= numAdjust; j++) {
      const khoan = await prisma.khoan_dieu_chinh_tri_gia.create({
        data: {
          stt: j,
          ma_ten: randomItem(["PHI_VAN_CHUYEN", "PHI_BAO_HIEM", "PHI_GIA_CONG", "PHI_KHAC"]),
          ma_phan_loai: "COST",
          ma_tien_te: "USD",
          tri_gia_dieu_chinh: Math.round(Math.random() * 10000 + 500),
          tong_he_so_phan_bo: Math.random() * 0.05,
          loai_dieu_chinh: randomItem(["TANG", "GIAM"]),
          id_to_khai_tri_gia: triGia.id_to_khai_tri_gia,
        },
      });

      await prisma.chi_tiet_dieu_chinh_tri_gia.create({
        data: {
          ma_loai: khoan.ma_ten === "PHI_VAN_CHUYEN" ? "FREIGHT" : "INSURANCE",
          ma_tien_te: "USD",
          phi: khoan.tri_gia_dieu_chinh,
          mo_ta: `Chi tiết điều chỉnh ${j}`,
          id_khoan_dieu_chinh: khoan.id_khoan_dieu_chinh,
        },
      });
    }
  }

  // --- 2. THANH_TOAN_THUE & GIAO_DICH_NGAN_HANG (20 thanh toán) ---
  for (let i = 1; i <= 20; i++) {
    const tk = toKhaiList[(i - 1) % toKhaiList.length];
    const trangThai = randomItem(["COMPLETED", "PENDING", "FAILED", "REFUNDED"]);

    const thanhToan = await prisma.thanh_toan_thue.create({
      data: {
        so_tien: Math.round(Math.random() * 50000 + 5000),
        ma_ngoai_te: "VND",
        phuong_thuc_thanh_toan: randomItem(["BANK_TRANSFER", "CASH", "E_PAYMENT"]),
        trang_thai_thanh_toan: trangThai,
        tham_chieu_ngan_hang: `TXN${String(i).padStart(6, '0')}`,
        ngay_thanh_toan: trangThai === "COMPLETED" ? randomDate(new Date(2025, 0, 1), new Date()) : null,
        id_to_khai: tk.id_to_khai,
      },
    });
    thanhToanList.push(thanhToan);

    if (trangThai === "COMPLETED" || trangThai === "FAILED") {
      await prisma.giao_dich_ngan_hang.create({
        data: {
          ten_ngan_hang: randomItem(["Vietcombank", "BIDV", "Vietinbank", "Techcombank", "MB Bank"]),
          tai_khoan_ngan_hang: `ACC${Math.floor(Math.random() * 1000000000)}`,
          so_tien: thanhToan.so_tien,
          thoi_gian_giao_dich: new Date(),
          ma_phan_hoi: trangThai === "COMPLETED" ? "SUCCESS" : "FAILED",
          thong_diep_phan_hoi: trangThai === "COMPLETED" ? "Giao dịch thành công" : "Giao dịch thất bại",
          id_thanh_toan: thanhToan.id_thanh_toan,
        },
      });
    }
  }

  // --- 3. PHAN_HOI_HAI_QUAN (20 phản hồi) ---
  for (let i = 1; i <= 20; i++) {
    const tk = toKhaiList[(i - 1) % toKhaiList.length];
    await prisma.phan_hoi_hai_quan.create({
      data: {
        loai_thong_diep: randomItem(["ACCEPT", "REJECT", "REQUEST_AMEND", "INSPECTION"]),
        mau_kenh: tk.mau_kenh,
        noi_dung_thong_diep: randomItem([
          "Đã chấp nhận tờ khai",
          "Từ chối do thiếu chứng từ xuất xứ",
          "Yêu cầu bổ sung hóa đơn",
          "Chuyển luồng đỏ - kiểm hóa"
        ]),
        ngay_nhan: randomDate(new Date(2025, 0, 1), new Date()),
        id_to_khai: tk.id_to_khai,
      },
    });
  }

  // --- 4. TAI_LIEU (20 tài liệu - hóa đơn, vận đơn, CO, packing list...) ---
  const loaiTaiLieu = ["INVOICE", "PACKING_LIST", "BL", "CO", "CONTRACT", "CERTIFICATE", "HEALTH_CERT"];
  for (let i = 1; i <= 20; i++) {
    const tk = toKhaiList[(i - 1) % toKhaiList.length];
    await prisma.tai_lieu.create({
      data: {
        loai_tai_lieu: randomItem(loaiTaiLieu),
        ten_file: `${randomItem(loaiTaiLieu)}.pdf`,
        duong_dan: `/uploads/${Date.now()}_${i}.pdf`,
        kich_thuoc: Math.round(Math.random() * 3000000 + 100000),
        loai_mime: "application/pdf",
        nguoi_tai_len: randomNguoiDung().id_nguoi_dung,
        id_to_khai: tk.id_to_khai,
      },
    });
  }

  // --- 5. THONG_BAO_HE_THONG (20 thông báo) ---
  for (let i = 1; i <= 20; i++) {
    await prisma.thong_bao_he_thong.create({
      data: {
        tieu_de: randomItem(["Tờ khai đã được gửi", "Thanh toán thuế thành công", "Có phản hồi từ hải quan", "Tài liệu được tải lên"]),
        noi_dung: `Thông báo hệ thống số ${i}: Sự kiện quan trọng liên quan đến tờ khai hoặc lô hàng.`,
        loai_thong_bao: randomItem(["SUCCESS", "INFO", "WARNING", "ERROR"]),
        id_nguoi_dung: randomNguoiDung().id_nguoi_dung,
      },
    });
  }

  // --- 6. AUDIT_LOG (20 log audit) ---
  for (let i = 1; i <= 20; i++) {
    const tk = randomToKhai();
    await prisma.audit_log.create({
      data: {
        ten_bang: randomItem(["to_khai_hai_quan", "hop_dong", "lo_hang"]),
        id_ban_ghi: tk.id_to_khai || Math.floor(Math.random() * 1000),
        hanh_dong: randomItem(["THEM", "SUA", "XOA"]),
        du_lieu_moi: JSON.stringify({ mo_ta: "Dữ liệu mới sau thay đổi" }),
        id_nguoi_dung: randomNguoiDung().id_nguoi_dung,
      },
    });
  }

  // --- 7. LOG_TICH_HOP (20 log VNACCS) ---
  for (let i = 1; i <= 20; i++) {
    await prisma.log_tich_hop.create({
      data: {
        ten_he_thong: "VNACCS",
        huong: randomItem(["OUTBOUND", "INBOUND"]),
        ma_tuong_quan: `TK${String(i).padStart(6, '0')}`,
        du_lieu_yeu_cau: "{}",
        du_lieu_phan_hoi: randomItem(['{"status":"success"}', '{"status":"error"}']),
        trang_thai: randomItem(["SUCCESS", "ERROR", "PENDING"]),
        thong_bao_loi: Math.random() > 0.7 ? "Timeout kết nối" : null,
      },
    });
  }

  // --- 8. LICH_SU_TRANG_THAI (20 lịch sử trạng thái tờ khai) ---
  const trangThaiOptions = ["NHAP", "CHO_GUI", "DA_GUI", "DA_TIEP_NHAN", "DA_THONG_QUAN", "TU_CHOI"];
  for (let i = 1; i <= 20; i++) {
    const tk = toKhaiList[(i - 1) % toKhaiList.length];
    await prisma.lich_su_trang_thai.create({
      data: {
        trang_thai_cu: randomItem(trangThaiOptions),
        trang_thai_moi: randomItem(trangThaiOptions),
        ghi_chu: "Chuyển trạng thái tự động/system",
        ngay_thay_doi: randomDate(new Date(2025, 0, 1), new Date()),
        id_to_khai: tk.id_to_khai,
        nguoi_thay_doi: randomNguoiDung().id_nguoi_dung,
      },
    });
  }

  console.log("✅ Seed Final Data hoàn thành - TOÀN BỘ HỆ THỐNG ĐÃ CÓ DỮ LIỆU MẪU ĐẦY ĐỦ!");
  console.log("   → to_khai_tri_gia + điều chỉnh: 20 + ~30 chi tiết");
  console.log("   → thanh_toan_thue + giao_dich_ngan_hang: 20");
  console.log("   → phan_hoi_hai_quan: 20");
  console.log("   → tai_lieu: 20");
  console.log("   → thong_bao_he_thong: 20");
  console.log("   → audit_log: 20");
  console.log("   → log_tich_hop: 20");
  console.log("   → lich_su_trang_thai: 20");
}
