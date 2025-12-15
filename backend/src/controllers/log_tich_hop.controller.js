const Log_tich_hop = require("../models/log_tich_hop.model");

module.exports = {
  // Lấy tất cả log tích hợp
  getAll: (req, res) => {
    Log_tich_hop.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách log tích hợp",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // Lấy log tích hợp theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Log_tich_hop.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy log tích hợp theo ID",
          error: err,
        });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy log tích hợp" });
      }
      res.status(200).json(result[0]);
    });
  },

  // Thêm mới log tích hợp
  insert: (req, res) => {
    const log_tich_hop = req.body;
    Log_tich_hop.insert(log_tich_hop, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm log tích hợp",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm log tích hợp thành công",
        data: result,
      });
    });
  },

  // Cập nhật log tích hợp
  update: (req, res) => {
    const log_tich_hop = req.body;
    const id = req.params.id;
    Log_tich_hop.update(log_tich_hop, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật log tích hợp",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật log tích hợp thành công",
        data: result,
      });
    });
  },

  // Xóa log tích hợp
  delete: (req, res) => {
    const id = req.params.id;
    Log_tich_hop.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa log tích hợp",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa log tích hợp thành công",
        data: result,
      });
    });
  },
};
