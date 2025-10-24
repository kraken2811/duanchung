const Tai_lieu = require("../models/tai_lieu.model");

module.exports = {
  // 🔹 Lấy tất cả tài liệu
  getAll: (req, res) => {
    Tai_lieu.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách tài liệu",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // 🔹 Lấy tài liệu theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Tai_lieu.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy tài liệu",
          error: err,
        });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy tài liệu",
        });
      }
      res.status(200).json(result[0]);
    });
  },

  // 🔹 Thêm tài liệu mới
  insert: (req, res) => {
    const tai_lieu = req.body;
    Tai_lieu.insert(tai_lieu, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm tài liệu",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm tài liệu thành công",
        data: result,
      });
    });
  },

  // 🔹 Cập nhật tài liệu
  update: (req, res) => {
    const id = req.params.id;
    const tai_lieu = req.body;
    Tai_lieu.update(tai_lieu, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật tài liệu",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật tài liệu thành công",
        data: result,
      });
    });
  },

  // 🔹 Xóa tài liệu
  delete: (req, res) => {
    const id = req.params.id;
    Tai_lieu.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa tài liệu",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa tài liệu thành công",
        data: result,
      });
    });
  },
};
