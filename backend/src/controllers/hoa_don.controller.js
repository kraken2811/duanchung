const Hoa_don = require("../../models/hoa_don.model");

module.exports = {
  // Lấy tất cả hóa đơn
  getAll: (req, res) => {
    Hoa_don.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy danh sách hóa đơn:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.status(200).json(result);
    });
  },

  // Lấy hóa đơn theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Hoa_don.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy hóa đơn:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: `Không tìm thấy hóa đơn có id = ${id}` });
      }
      res.status(200).json(result[0]);
    });
  },

  // Thêm mới hóa đơn
  insert: (req, res) => {
    const hoa_don = req.body;
    Hoa_don.insert(hoa_don, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm hóa đơn:", err);
        return res.status(500).json({ message: "Thêm hóa đơn thất bại", error: err });
      }
      res.status(201).json({
        message: "Thêm hóa đơn thành công",
        data: result,
      });
    });
  },

  // Cập nhật hóa đơn theo ID
  update: (req, res) => {
    const hoa_don = req.body;
    const id = req.params.id;
    Hoa_don.update(hoa_don, id, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật hóa đơn:", err);
        return res.status(500).json({ message: "Cập nhật hóa đơn thất bại", error: err });
      }
      res.status(200).json({ message: `Cập nhật hóa đơn id = ${id} thành công` });
    });
  },

  // Xóa hóa đơn theo ID
  delete: (req, res) => {
    const id = req.params.id;
    Hoa_don.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa hóa đơn:", err);
        return res.status(500).json({ message: "Xóa hóa đơn thất bại", error: err });
      }
      res.status(200).json({ message: `Xóa hóa đơn id = ${id} thành công` });
    });
  },
};
