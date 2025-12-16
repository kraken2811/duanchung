const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 START SEED');

  // ======================
  // vai_tro
  // ======================
  await prisma.vai_tro.createMany({
    data: [
      { ma_vai_tro: 'ADMIN', ten_vai_tro: 'Admin' },
      { ma_vai_tro: 'USER', ten_vai_tro: 'User' },
      { ma_vai_tro: 'STAFF', ten_vai_tro: 'Staff' },
    ],
  });

  // ======================
  // cong_ty
  // ======================
  await prisma.cong_ty.createMany({
    data: [
      { ma_so_thue: '0101', ten_cong_ty: 'Công ty A' },
      { ma_so_thue: '0102', ten_cong_ty: 'Công ty B' },
      { ma_so_thue: '0103', ten_cong_ty: 'Công ty C' },
    ],
  });

  // ======================
  // nguoi_dung
  // ======================
  await prisma.nguoi_dung.createMany({
    data: [
      { ten_dang_nhap: 'admin', mat_khau: '123456', id_vai_tro: 1, id_cong_ty: 1 },
      { ten_dang_nhap: 'user1', mat_khau: '123456', id_vai_tro: 2, id_cong_ty: 1 },
      { ten_dang_nhap: 'staff1', mat_khau: '123456', id_vai_tro: 3, id_cong_ty: 2 },
    ],
  });

  // ======================
  // doi_tac
  // ======================
  await prisma.doi_tac.createMany({
    data: [
      { ten_doi_tac: 'Đối tác XK', loai_doi_tac: 'XUAT_KHAU', id_cong_ty: 1 },
      { ten_doi_tac: 'Đối tác NK', loai_doi_tac: 'NHAP_KHAU', id_cong_ty: 1 },
      { ten_doi_tac: 'Đại lý', loai_doi_tac: 'DAI_LY', id_cong_ty: 2 },
    ],
  });

  // ======================
  // hop_dong
  // ======================
  await prisma.hop_dong.createMany({
    data: [
      { id_hop_dong: 'hd-001', so_hop_dong: 'HD001', loai_hop_dong: 'XK', id_cong_ty: 1, id_doi_tac: 1, nguoi_tao: 1 },
      { id_hop_dong: 'hd-002', so_hop_dong: 'HD002', loai_hop_dong: 'NK', id_cong_ty: 1, id_doi_tac: 2, nguoi_tao: 1 },
      { id_hop_dong: 'hd-003', so_hop_dong: 'HD003', loai_hop_dong: 'GC', id_cong_ty: 2, id_doi_tac: 2, nguoi_tao: 2 },
    ],
  });

  // ======================
  // vat_lieu_hop_dong
  // ======================
  await prisma.vat_lieu_hop_dong.createMany({
    data: [
      { ma_vat_lieu: 'VL01', id_hop_dong: 'hd-001' },
      { ma_vat_lieu: 'VL02', id_hop_dong: 'hd-002' },
      { ma_vat_lieu: 'VL03', id_hop_dong: 'hd-003' },
    ],
  });

  // ======================
  // san_pham_hop_dong
  // ======================
  await prisma.san_pham_hop_dong.createMany({
    data: [
      { ma_san_pham: 'SP01', id_hop_dong: 'hd-001' },
      { ma_san_pham: 'SP02', id_hop_dong: 'hd-002' },
      { ma_san_pham: 'SP03', id_hop_dong: 'hd-003' },
    ],
  });

  // ======================
  // danh_muc
  // ======================
  await prisma.danh_muc.createMany({
    data: [
      { id_hop_dong: 'hd-001', id_vat_lieu: 1 },
      { id_hop_dong: 'hd-002', id_san_pham: 2 },
      { id_hop_dong: 'hd-003', id_vat_lieu: 3 },
    ],
  });

  // ======================
  // loai_van_tai
  // ======================
  await prisma.loai_van_tai.createMany({
    data: [
      { ma_loai_van_tai: 'SEA', ten_loai_van_tai: 'Đường biển' },
      { ma_loai_van_tai: 'AIR', ten_loai_van_tai: 'Hàng không' },
      { ma_loai_van_tai: 'ROAD', ten_loai_van_tai: 'Đường bộ' },
    ],
  });

  // ======================
  // lo_hang
  // ======================
  await prisma.lo_hang.createMany({
    data: [
      { so_lo_hang: 'LH01', id_hop_dong: 'hd-001', id_cong_ty: 1, id_loai_van_tai: 1, nguoi_tao: 1 },
      { so_lo_hang: 'LH02', id_hop_dong: 'hd-002', id_cong_ty: 1, id_loai_van_tai: 2, nguoi_tao: 1 },
      { so_lo_hang: 'LH03', id_hop_dong: 'hd-003', id_cong_ty: 2, id_loai_van_tai: 3, nguoi_tao: 2 },
    ],
  });

  // ======================
  // ma_hs
  // ======================
  await prisma.ma_hs.createMany({
    data: [
      { ma_hs: '0101' },
      { ma_hs: '0201' },
      { ma_hs: '0301' },
    ],
  });

  // ======================
  // bieu_thue
  // ======================
  await prisma.bieu_thue.createMany({
    data: [
      { ma_hs: '0101', hieu_luc_tu: new Date() },
      { ma_hs: '0201', hieu_luc_tu: new Date() },
      { ma_hs: '0301', hieu_luc_tu: new Date() },
    ],
  });

  // ======================
  // to_khai_hai_quan
  // ======================
  await prisma.to_khai_hai_quan.createMany({
    data: [
      { so_to_khai: 'TK01', loai_to_khai: 'XK', phan_loai: 'A', id_lo_hang: 1, id_cong_ty: 1, nguoi_tao: 1 },
      { so_to_khai: 'TK02', loai_to_khai: 'NK', phan_loai: 'B', id_lo_hang: 2, id_cong_ty: 1, nguoi_tao: 1 },
      { so_to_khai: 'TK03', loai_to_khai: 'GC', phan_loai: 'C', id_lo_hang: 3, id_cong_ty: 2, nguoi_tao: 2 },
    ],
  });

  // ======================
  // audit_log
  // ======================
  await prisma.audit_log.createMany({
    data: [
      { ten_bang: 'nguoi_dung', id_ban_ghi: 1, hanh_dong: 'THEM', id_nguoi_dung: 1 },
      { ten_bang: 'hop_dong', id_ban_ghi: 1, hanh_dong: 'THEM', id_nguoi_dung: 1 },
      { ten_bang: 'lo_hang', id_ban_ghi: 1, hanh_dong: 'THEM', id_nguoi_dung: 2 },
    ],
  });

  console.log('✅ SEED DONE');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
