const To_khai_tri_gia = require("../models/to_khai_tri_gia.model");

module.exports = {
  // 🔹 Lấy tất cả tờ khai trị giá
  getAll: (req, res) => {
    To_khai_tri_gia.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách tờ khai trị giá",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // 🔹 Lấy tờ khai trị giá theo ID
  getById: (req, res) => {
    const id = req.params.id;
    To_khai_tri_gia.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy thông tin tờ khai trị giá",
          error: err,
        });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy tờ khai trị giá",
        });
      }
      res.status(200).json(result[0]);
    });
  },

  // 🔹 Thêm tờ khai trị giá mới
  insert: (req, res) => {
    const to_khai_tri_gia = req.body;
    To_khai_tri_gia.insert(to_khai_tri_gia, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm tờ khai trị giá",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm tờ khai trị giá thành công",
        data: result,
      });
    });
  },

  // 🔹 Cập nhật tờ khai trị giá
  update: (req, res) => {
    const id = req.params.id;
    const to_khai_tri_gia = req.body;
    To_khai_tri_gia.update(to_khai_tri_gia, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật tờ khai trị giá",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật tờ khai trị giá thành công",
        data: result,
      });
    });
  },

  // 🔹 Xóa tờ khai trị giá
  delete: (req, res) => {
    const id = req.params.id;
    To_khai_tri_gia.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa tờ khai trị giá",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa tờ khai trị giá thành công",
        data: result,
      });
    });
  },
};
