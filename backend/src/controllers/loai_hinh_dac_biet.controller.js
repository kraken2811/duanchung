const Loai_hinh_dac_biet = require("../models/loai_hinh_dac_biet.model");

module.exports = {
  getAll: (req, res) => {
    Loai_hinh_dac_biet.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách loại hình đặc biệt",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Loai_hinh_dac_biet.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy loại hình đặc biệt theo ID",
          error: err,
        });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy loại hình đặc biệt" });
      }
      res.status(200).json(result[0]);
    });
  },

  insert: (req, res) => {
    const loai_hinh_dac_biet = req.body;
    Loai_hinh_dac_biet.insert(loai_hinh_dac_biet, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm loại hình đặc biệt",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm loại hình đặc biệt thành công",
        data: result,
      });
    });
  },

  update: (req, res) => {
    const loai_hinh_dac_biet = req.body;
    const id = req.params.id;
    Loai_hinh_dac_biet.update(loai_hinh_dac_biet, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật loại hình đặc biệt",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật loại hình đặc biệt thành công",
        data: result,
      });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Loai_hinh_dac_biet.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa loại hình đặc biệt",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa loại hình đặc biệt thành công",
        data: result,
      });
    });
  },
};
