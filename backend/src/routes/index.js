const express = require('express');
const router = express.Router();

// ===== Import routes =====
router.use('/auths', require('./auth.route'))
router.use('/audit_logs', require('./audit_log.route'));
router.use('/bieu_thues', require('./bieu_thue.route'));//
router.use('/to_khai_idcs', require('./to_khai_idc.route'));
router.use('/to_khai_ides', require('./to_khai_ide.route'));
router.use('/cau_hinh_he_thongs', require('./cau_hinh_he_thong.route'));
router.use('/chi_tiet_dieu_chinh_tri_gias', require('./chi_tiet_dieu_chinh_tri_gia.route'));
router.use('/chi_tiet_to_khais', require('./chi_tiet_to_khai.route'));
router.use('/cong_tys', require('./cong_ty.route'));
router.use('/containers', require('./container.route'));
router.use('/danh_mucs', require('./danh_muc.route'));
router.use('/dia_diem_kho_bais', require('./dia_diem_kho_bai.route'));
router.use('/doi_tacs', require('./doi_tac.route'));
router.use('/giao_dich_ngan_hangs', require('./giao_dich_ngan_hang.route'));
router.use('/hoa_dons', require('./hoa_don.route'));
router.use('/hop_dongs', require('./hop_dong.route'));
router.use('/khoan_dieu_chinh_tri_gias', require('./khoan_dieu_chinh_tri_gia.route'));
router.use('/lich_su_trang_thais', require('./lich_su_trang_thai.route'));
router.use('/lo_hangs', require('./lo_hang.route'));
router.use('/loai_hinh_dac_biets', require('./loai_hinh_dac_biet.route'));
router.use('/loai_van_tais', require('./loai_van_tai.route'));
router.use('/log_tich_hops', require('./log_tich_hop.route'));
router.use('/ma_hss', require('./ma_hs.route'));
router.use('/nguoi_dungs', require('./nguoi_dung.route'));
router.use('/phan_hoi_hai_quans', require('./phan_hoi_hai_quan.route'));
router.use('/phu_luc_hop_dongs', require('./phu_luc_hop_dong.route'));
router.use('/quoc_gias', require('./quoc_gia.route'));
router.use('/san_pham_hop_dongs', require('./san_pham_hop_dong.route'));
router.use('/tai_lieus', require('./tai_lieu.route'));
router.use('/thanh_toan_thues', require('./thanh_toan_thue.route'));
router.use('/thong_bao_he_thongs', require('./thong_bao_he_thong.route'));
router.use('/to_khai_hai_quans', require('./to_khai_hai_quan.route'));
router.use('/to_khai_tri_gias', require('./to_khai_tri_gia.route'));
router.use('/vai_tros', require('./vai_tro.route'));
router.use('/van_ban_giay_pheps', require('./van_ban_giay_phep.route'));
router.use('/van_dons', require('./van_don.route'));
router.use('/vat_lieu_hop_dongs', require('./vat_lieu_hop_dong.route'));
router.use('/eda', require ('./eda.routes'))
module.exports = router;
