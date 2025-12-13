const Loai_van_tai = require("../../models/loai_van_tai.model");

module.exports = {
  // Lấy tất cả
  getAll: (req, res) => {
    Loai_van_tai.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách loại vận tải",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // Lấy theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Loai_van_tai.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy loại vận tải theo ID",
          error: err,
        });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy loại vận tải" });
      }
      res.status(200).json(result[0]);
    });
  },

  // Thêm mới
  insert: (req, res) => {
    const loai_van_tai = req.body;
    Loai_van_tai.insert(loai_van_tai, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm loại vận tải",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm loại vận tải thành công",
        data: result,
      });
    });
  },

  // Cập nhật
  update: (req, res) => {
    const loai_van_tai = req.body;
    const id = req.params.id;
    Loai_van_tai.update(loai_van_tai, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật loại vận tải",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật loại vận tải thành công",
        data: result,
      });
    });
  },

  // Xóa
  delete: (req, res) => {
    const id = req.params.id;
    Loai_van_tai.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa loại vận tải",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa loại vận tải thành công",
        data: result,
      });
    });
  },
};
