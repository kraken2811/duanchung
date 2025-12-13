const Phu_luc_hop_dong = require("../../models/phu_luc_hop_dong.model");

module.exports = {
  // Lấy tất cả phụ lục hợp đồng
  getAll: (req, res) => {
    Phu_luc_hop_dong.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách phụ lục hợp đồng",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // Lấy phụ lục hợp đồng theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Phu_luc_hop_dong.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy phụ lục hợp đồng",
          error: err,
        });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy phụ lục hợp đồng",
        });
      }
      res.status(200).json(result[0]);
    });
  },

  // Thêm mới phụ lục hợp đồng
  insert: (req, res) => {
    const phu_luc_hop_dong = req.body;
    Phu_luc_hop_dong.insert(phu_luc_hop_dong, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm phụ lục hợp đồng",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm phụ lục hợp đồng thành công",
        data: result,
      });
    });
  },

  // Cập nhật phụ lục hợp đồng
  update: (req, res) => {
    const id = req.params.id;
    const phu_luc_hop_dong = req.body;
    Phu_luc_hop_dong.update(phu_luc_hop_dong, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật phụ lục hợp đồng",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật phụ lục hợp đồng thành công",
        data: result,
      });
    });
  },

  // Xóa phụ lục hợp đồng
  delete: (req, res) => {
    const id = req.params.id;
    Phu_luc_hop_dong.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa phụ lục hợp đồng",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa phụ lục hợp đồng thành công",
        data: result,
      });
    });
  },
};
