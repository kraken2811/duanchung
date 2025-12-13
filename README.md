Dự án ECUS5 là hệ thống quản lý xuất nhập khẩu, bao gồm:
Backend: NodeJS (Express) + Prisma + MySQL
Frontend: React + Vite
Database: MySQL
ORM: Prisma (Prisma-first, migrate tạo bảng)
DUANCHUNG
├── backend
│   ├── common
│   ├── controllers
│   ├── models
│   ├── prisma
│   │   └── schema.prisma
│   ├── routes
│   ├── .env
│   ├── .env.exmple
│   ├── app.js
│   ├── Dockerfile
│   ├── prisma.config.ts
│   ├── package.json
│   └── package-lock.json
│
├── frontend
│   ├── src
│   ├── public
│   ├── .env
│   ├── .env.exmple
│   ├── vite-project
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
├── docker-compose.local.yml
├── docker-compose.dev.yml
├── docker-compose.uat.yml
├── docker-compose.prod.yml
├── docker-compose.yml
└── README.md


vào mysql chạy
-- Tạo database nếu chưa có
CREATE DATABASE IF NOT EXISTS ecus5
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
(nếu có user tên như vậy rồi)
DROP USER IF EXISTS 'ECUS5'@'localhost';

(tạo user)
CREATE USER 'ECUS5'@'localhost'
IDENTIFIED WITH caching_sha2_password
BY 'ecus5';
(cấp quyền cho user)
GRANT ALL PRIVILEGES ON ecus5.* TO 'ECUS5'@'localhost';
FLUSH PRIVILEGES;

(kiểm tra lại)
SELECT user, host, plugin
FROM mysql.user
WHERE user = 'ECUS5';

(db báo là plugin = caching_sha2_password là ok)

Bước 1: Thiết lập file .env
Bước 2: cd BE,FE và chạy lệnh npm install
Bước 3: Khởi tạo Prisma (cd Backend) npx prisma generate
Bước 4: để đấy lên mysql npm prisma db push

cd backend
npx prisma migrate deploy    # Áp dụng migration vào database
npx exec prisma migrate dev       # Tạo migration mới
npx exec prisma generate          # Tạo Prisma Client
npx exec prisma studio           # Mở Prisma Studio

