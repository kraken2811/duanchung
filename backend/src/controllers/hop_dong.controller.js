const Hop_dong = require("../models/hop_dong.model");

module.exports = {
  // Lấy danh sách tất cả hợp đồng
  getAll: (req, res) => {
    Hop_dong.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy danh sách hợp đồng:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.status(200).json(result);
    });
  },

  // Lấy hợp đồng theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Hop_dong.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy hợp đồng:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: `Không tìm thấy hợp đồng có id = ${id}` });
      }
      res.status(200).json(result[0]);
    });
  },

  // Thêm mới hợp đồng
  insert: (req, res) => {
    const hop_dong = req.body;
    Hop_dong.insert(hop_dong, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm hợp đồng:", err);
        return res.status(500).json({ message: "Thêm hợp đồng thất bại", error: err });
      }
      res.status(201).json({
        message: "Thêm hợp đồng thành công",
        data: result,
      });
    });
  },

  // Cập nhật hợp đồng theo ID
  update: (req, res) => {
    const hop_dong = req.body;
    const id = req.params.id;
    Hop_dong.update(hop_dong, id, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật hợp đồng:", err);
        return res.status(500).json({ message: "Cập nhật hợp đồng thất bại", error: err });
      }
      res.status(200).json({ message: `Cập nhật hợp đồng id = ${id} thành công` });
    });
  },

  // Xóa hợp đồng theo ID
  delete: (req, res) => {
    const id = req.params.id;
    Hop_dong.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa hợp đồng:", err);
        return res.status(500).json({ message: "Xóa hợp đồng thất bại", error: err });
      }
      res.status(200).json({ message: `Xóa hợp đồng id = ${id} thành công` });
    });
  },
};
