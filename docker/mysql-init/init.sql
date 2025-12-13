-- ================================
-- INIT DATABASE FOR ECUS5
-- ================================

-- Tạo database (nếu chưa có)
CREATE DATABASE IF NOT EXISTS ecus5
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Dùng database
USE ecus5;

-- ⚠️ KHÔNG tạo user ở đây
-- Docker MySQL sẽ tự tạo user từ ENV:
-- MYSQL_USER / MYSQL_PASSWORD

-- Optional: set timezone
SET GLOBAL time_zone = '+07:00';

-- Optional: test
CREATE TABLE IF NOT EXISTS __init_test (
  id INT PRIMARY KEY AUTO_INCREMENT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
