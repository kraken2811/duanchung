const Nguoi_dung = require("../models/nguoi_dung.model");

module.exports = {
  // Lấy tất cả người dùng
  getAll: (req, res) => {
    Nguoi_dung.getAll((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng", error: err });
      }
      res.status(200).json(result);
    });
  },

  // Lấy người dùng theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Nguoi_dung.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng", error: err });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }
      res.status(200).json(result[0]);
    });
  },

  // Thêm người dùng mới
  insert: (req, res) => {
    const nguoi_dung = req.body;
    Nguoi_dung.insert(nguoi_dung, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi thêm người dùng", error: err });
      }
      res.status(201).json({ message: "Thêm người dùng thành công", data: result });
    });
  },

  // Cập nhật người dùng
  update: (req, res) => {
    const id = req.params.id;
    const nguoi_dung = req.body;
    Nguoi_dung.update(nguoi_dung, id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi cập nhật người dùng", error: err });
      }
      res.status(200).json({ message: "Cập nhật người dùng thành công", data: result });
    });
  },

  // Xóa người dùng
  delete: (req, res) => {
    const id = req.params.id;
    Nguoi_dung.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi xóa người dùng", error: err });
      }
      res.status(200).json({ message: "Xóa người dùng thành công", data: result });
    });
  },
};
