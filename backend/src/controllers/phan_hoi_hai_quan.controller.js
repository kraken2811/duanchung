const Phan_hoi_hai_quan = require("../../models/phan_hoi_hai_quan.model");

module.exports = {
  // Lấy tất cả phản hồi
  getAll: (req, res) => {
    Phan_hoi_hai_quan.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách phản hồi hải quan",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // Lấy phản hồi theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Phan_hoi_hai_quan.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy phản hồi hải quan",
          error: err,
        });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy phản hồi hải quan",
        });
      }
      res.status(200).json(result[0]);
    });
  },

  // Thêm phản hồi mới
  insert: (req, res) => {
    const phan_hoi_hai_quan = req.body;
    Phan_hoi_hai_quan.insert(phan_hoi_hai_quan, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm phản hồi hải quan",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm phản hồi hải quan thành công",
        data: result,
      });
    });
  },

  // Cập nhật phản hồi
  update: (req, res) => {
    const id = req.params.id;
    const phan_hoi_hai_quan = req.body;
    Phan_hoi_hai_quan.update(phan_hoi_hai_quan, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật phản hồi hải quan",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật phản hồi hải quan thành công",
        data: result,
      });
    });
  },

  // Xóa phản hồi
  delete: (req, res) => {
    const id = req.params.id;
    Phan_hoi_hai_quan.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa phản hồi hải quan",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa phản hồi hải quan thành công",
        data: result,
      });
    });
  },
};
