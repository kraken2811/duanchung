const Van_don = require("../../models/van_don.model");

module.exports = {
  // 🔹 Lấy tất cả vận đơn
  getAll: (req, res) => {
    Van_don.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách vận đơn",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // 🔹 Lấy vận đơn theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Van_don.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy thông tin vận đơn",
          error: err,
        });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy vận đơn",
        });
      }
      res.status(200).json(result[0]);
    });
  },

  // 🔹 Thêm vận đơn mới
  insert: (req, res) => {
    const van_don = req.body;
    Van_don.insert(van_don, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm vận đơn",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm vận đơn thành công",
        data: result,
      });
    });
  },

  // 🔹 Cập nhật vận đơn
  update: (req, res) => {
    const id = req.params.id;
    const van_don = req.body;
    Van_don.update(van_don, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật vận đơn",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật vận đơn thành công",
        data: result,
      });
    });
  },

  // 🔹 Xóa vận đơn
  delete: (req, res) => {
    const id = req.params.id;
    Van_don.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa vận đơn",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa vận đơn thành công",
        data: result,
      });
    });
  },
};
