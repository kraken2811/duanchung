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
│   ├── package.json
│   └── package-lock.json
│
└── README.md
Bước 1: Thiết lập file .env
Bước 2: cd BE,FE và chạy lệnh npm install
Bước 3: Khởi tạo Prisma (cd Backend) npx prisma generate
3.2 Tạo bảng trong database từ Prisma schema npx prisma migrate dev --name init
nhanh – không migration: npm prisma db push

cd backend
npx prisma migrate deploy    # Áp dụng migration vào database
npx exec prisma migrate dev       # Tạo migration mới
npx exec prisma generate          # Tạo Prisma Client
npx exec prisma studio           # Mở Prisma Studio
