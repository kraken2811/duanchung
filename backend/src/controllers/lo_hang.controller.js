const Lo_hang = require("../../models/lo_hang.model");

module.exports = {
  getAll: (req, res) => {
    Lo_hang.getAll((err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi lấy danh sách lô hàng", error: err });
      }
      res.status(200).json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Lo_hang.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi lấy thông tin lô hàng", error: err });
      }
      res.status(200).json(result);
    });
  },

  insert: (req, res) => {
    const lo_hang = req.body;
    Lo_hang.insert(lo_hang, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi thêm lô hàng", error: err });
      }
      res.status(201).json({ message: "Thêm lô hàng thành công", data: result });
    });
  },

  update: (req, res) => {
    const lo_hang = req.body;
    const id = req.params.id;
    Lo_hang.update(lo_hang, id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi cập nhật lô hàng", error: err });
      }
      res.status(200).json({ message: "Cập nhật lô hàng thành công", data: result });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Lo_hang.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Lỗi khi xóa lô hàng", error: err });
      }
      res.status(200).json({ message: "Xóa lô hàng thành công", data: result });
    });
  },
};
