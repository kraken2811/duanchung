const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'long2811@',
  database: 'quan_ly_xuat_nhap_khau'
});
db.connect((err) => {
  if (err) {
    console.error('❌ Kết nối MySQL thất bại: ', err.message);
  } else {
    console.log('✅ Kết nối MySQL thành công!');
  }
});


module.exports = db;
