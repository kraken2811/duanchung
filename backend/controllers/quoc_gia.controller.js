const Quoc_gia = require("../models/quoc_gia.model");

module.exports = {
  // 🔹 Lấy tất cả quốc gia
  getAll: (req, res) => {
    Quoc_gia.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách quốc gia",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // 🔹 Lấy quốc gia theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Quoc_gia.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy thông tin quốc gia",
          error: err,
        });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy quốc gia",
        });
      }
      res.status(200).json(result[0]);
    });
  },

  // 🔹 Thêm quốc gia mới
  insert: (req, res) => {
    const quoc_gia = req.body;
    Quoc_gia.insert(quoc_gia, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm quốc gia",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm quốc gia thành công",
        data: result,
      });
    });
  },

  // 🔹 Cập nhật thông tin quốc gia
  update: (req, res) => {
    const id = req.params.id;
    const quoc_gia = req.body;
    Quoc_gia.update(quoc_gia, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật quốc gia",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật quốc gia thành công",
        data: result,
      });
    });
  },

  // 🔹 Xóa quốc gia
  delete: (req, res) => {
    const id = req.params.id;
    Quoc_gia.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa quốc gia",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa quốc gia thành công",
        data: result,
      });
    });
  },
};
