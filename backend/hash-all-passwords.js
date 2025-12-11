/**
 * File: hash-all-passwords.js
 * Mục đích: Hash lại toàn bộ mật khẩu đang lưu dạng text thô thành bcrypt
 * Chỉ chạy 1 lần duy nhất!
 */

const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '123Aa@',
    database: 'quan_ly_xuat_nhap_khau',
    port: 3306
};


async function hashAllPasswords() {
    let connection;
    try {
        console.log("Đang kết nối database...");
        connection = await mysql.createConnection(dbConfig);

        // Lấy tất cả user có mật khẩu chưa hash
        console.log("Đang lấy danh sách người dùng...");
        const [users] = await connection.execute(`
            SELECT id_nguoi_dung, mat_khau 
            FROM nguoi_dung 
            WHERE mat_khau IS NOT NULL
        `);

        console.log(`Tìm thấy ${users.length} người dùng cần hash`);

        let count = 0;
        for (let user of users) {
            if (user.mat_khau && typeof user.mat_khau === 'string' && user.mat_khau.trim() !== '') {
                if (!user.mat_khau.startsWith('$2b$') && !user.mat_khau.startsWith('$2a$')) {
                    const hashed = await bcrypt.hash(user.mat_khau.trim(), 12);
                    await connection.execute(
                        'UPDATE nguoi_dung SET mat_khau = ? WHERE id_nguoi_dung = ?',
                        [hashed, user.id_nguoi_dung]
                    );
                    console.log(`Đã hash user ID: ${user.id_nguoi_dung}`);
                    count++;
                } else {
                    console.log(`User ID: ${user.id_nguoi_dung} đã được hash rồi, bỏ qua`);
                }
            } else {
                console.log(`User ID: ${user.id_nguoi_dung} có mật khẩu NULL/rỗng, bỏ qua`);
            }
        }

        console.log(`\nHOÀN TẤT! Đã hash thành công ${count} mật khẩu`);
        console.log("Từ giờ bạn có thể dùng bcrypt.compare bình thường trong login!");

    } catch (error) {
        console.error("LỖI KHI HASH MẬT KHẨU:", error.message);
    } finally {
        if (connection) connection.end();
        process.exit();
    }
}

// Chạy luôn
hashAllPasswords();