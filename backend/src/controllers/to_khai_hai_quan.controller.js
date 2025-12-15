const To_khai_hai_quan = require("../models/to_khai_hai_quan.model");

module.exports = {
  // 🔹 Lấy tất cả tờ khai hải quan
  getAll: (req, res) => {
    To_khai_hai_quan.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách tờ khai hải quan",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // 🔹 Lấy tờ khai hải quan theo ID
  getById: (req, res) => {
    const id = req.params.id;
    To_khai_hai_quan.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy thông tin tờ khai hải quan",
          error: err,
        });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy tờ khai hải quan",
        });
      }
      res.status(200).json(result[0]);
    });
  },

  // 🔹 Thêm tờ khai hải quan mới
  insert: (req, res) => {
    const to_khai_hai_quan = req.body;
    To_khai_hai_quan.insert(to_khai_hai_quan, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm tờ khai hải quan",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm tờ khai hải quan thành công",
        data: result,
      });
    });
  },

  // 🔹 Cập nhật tờ khai hải quan
  update: (req, res) => {
    const id = req.params.id;
    const to_khai_hai_quan = req.body;
    To_khai_hai_quan.update(to_khai_hai_quan, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật tờ khai hải quan",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật tờ khai hải quan thành công",
        data: result,
      });
    });
  },

  // 🔹 Xóa tờ khai hải quan
  delete: (req, res) => {
    const id = req.params.id;
    To_khai_hai_quan.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa tờ khai hải quan",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa tờ khai hải quan thành công",
        data: result,
      });
    });
  },
};
