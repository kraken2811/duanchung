const San_pham_hop_dong = require("../models/san_pham_hop_dong.model");

module.exports = {
  // 🔹 Lấy tất cả sản phẩm hợp đồng
  getAll: (req, res) => {
    San_pham_hop_dong.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách sản phẩm hợp đồng",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // 🔹 Lấy sản phẩm hợp đồng theo ID
  getById: (req, res) => {
    const id = req.params.id;
    San_pham_hop_dong.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy sản phẩm hợp đồng",
          error: err,
        });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy sản phẩm hợp đồng",
        });
      }
      res.status(200).json(result[0]);
    });
  },

  // 🔹 Thêm sản phẩm hợp đồng
  insert: (req, res) => {
    const san_pham_hop_dong = req.body;
    San_pham_hop_dong.insert(san_pham_hop_dong, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm sản phẩm hợp đồng",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm sản phẩm hợp đồng thành công",
        data: result,
      });
    });
  },

  // 🔹 Cập nhật sản phẩm hợp đồng
  update: (req, res) => {
    const id = req.params.id;
    const san_pham_hop_dong = req.body;
    San_pham_hop_dong.update(san_pham_hop_dong, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật sản phẩm hợp đồng",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật sản phẩm hợp đồng thành công",
        data: result,
      });
    });
  },

  // 🔹 Xóa sản phẩm hợp đồng
  delete: (req, res) => {
    const id = req.params.id;
    San_pham_hop_dong.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa sản phẩm hợp đồng",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa sản phẩm hợp đồng thành công",
        data: result,
      });
    });
  },
};
