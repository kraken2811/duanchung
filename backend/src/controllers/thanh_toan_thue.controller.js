const Thong_bao_he_thong = require("../models/thong_bao_he_thong.model");

module.exports = {
  // 🔹 Lấy tất cả thông báo hệ thống
  getAll: (req, res) => {
    Thong_bao_he_thong.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách thông báo hệ thống",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // 🔹 Lấy thông báo hệ thống theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Thong_bao_he_thong.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy thông tin thông báo hệ thống",
          error: err,
        });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy thông báo hệ thống",
        });
      }
      res.status(200).json(result[0]);
    });
  },

  // 🔹 Thêm thông báo hệ thống mới
  insert: (req, res) => {
    const thong_bao_he_thong = req.body;
    Thong_bao_he_thong.insert(thong_bao_he_thong, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm thông báo hệ thống",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm thông báo hệ thống thành công",
        data: result,
      });
    });
  },

  // 🔹 Cập nhật thông báo hệ thống
  update: (req, res) => {
    const id = req.params.id;
    const thong_bao_he_thong = req.body;
    Thong_bao_he_thong.update(thong_bao_he_thong, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật thông báo hệ thống",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật thông báo hệ thống thành công",
        data: result,
      });
    });
  },

  // 🔹 Xóa thông báo hệ thống
  delete: (req, res) => {
    const id = req.params.id;
    Thong_bao_he_thong.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa thông báo hệ thống",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa thông báo hệ thống thành công",
        data: result,
      });
    });
  },
};
