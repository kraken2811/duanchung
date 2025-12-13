const Ma_hs = require("../../models/ma_hs.model");

module.exports = {
  // Lấy tất cả mã HS
  getAll: (req, res) => {
    Ma_hs.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách mã HS",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // Lấy mã HS theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Ma_hs.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy mã HS theo ID",
          error: err,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy mã HS" });
      }

      res.status(200).json(result[0]);
    });
  },

  // Thêm mã HS
  insert: (req, res) => {
    const ma_hs = req.body;
    Ma_hs.insert(ma_hs, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm mã HS",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm mã HS thành công",
        data: result,
      });
    });
  },

  // Cập nhật mã HS
  update: (req, res) => {
    const ma_hs = req.body;
    const id = req.params.id;
    Ma_hs.update(ma_hs, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật mã HS",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật mã HS thành công",
        data: result,
      });
    });
  },

  // Xóa mã HS
  delete: (req, res) => {
    const id = req.params.id;
    Ma_hs.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa mã HS",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa mã HS thành công",
        data: result,
      });
    });
  },
};
