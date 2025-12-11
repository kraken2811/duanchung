const nguoidung = require("../models/nguoi_dung.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;
exports.login = async (req, res) => {
    try {
        const { taikhoan, matkhau } = req.body;

        if (!taikhoan || !matkhau) {
            return res.status(400).json({ message: "Vui lòng nhập tài khoản và mật khẩu!" });
        }

        nguoidung.login(taikhoan, async (err, nguoidung) => {
            console.error("CHI TIẾT LỖI TỪ DATABASE:", err);
            if (err) return res.status(500).json({ message: "Lỗi server!" });
            if (!nguoidung) return res.status(401).json({ message: "Tài khoản không tồn tại!" });

            const isMatch = await bcrypt.compare(matkhau, nguoidung.mat_khau);

            if (!isMatch) {
                return res.status(401).json({ message: "Mật khẩu không đúng!" });
            }

            const token = jwt.sign(
                { id_nguoidung: nguoidung.id_nguoidung, taikhoan: nguoidung.ten_dang_nhap, vaitro: nguoidung.id_vai_tro },
                SECRET_KEY,
                { expiresIn: "1000h" }
            );

            res.json({
                message: "Đăng nhập thành công!",
                token,
                nguoidung: {
                    id_nguoidung: nguoidung.id_nguoi_dung,
                    hoten: nguoidung.ho_ten,
                    quyen: nguoidung.ten_vai_tro,
                }
            });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server!" });
    }
};