const Giao_dich_ngan_hang = require("../../models/giao_dich_ngan_hang.model");

module.exports = {
  // Lấy tất cả giao dịch ngân hàng
  getAll: (req, res) => {
    Giao_dich_ngan_hang.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy danh sách giao dịch:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.status(200).json(result);
    });
  },

  // Lấy giao dịch theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Giao_dich_ngan_hang.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy giao dịch:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: `Không tìm thấy giao dịch có id = ${id}` });
      }
      res.status(200).json(result[0]);
    });
  },

  // Thêm mới giao dịch
  insert: (req, res) => {
    const giao_dich_ngan_hang = req.body;
    Giao_dich_ngan_hang.insert(giao_dich_ngan_hang, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm giao dịch:", err);
        return res.status(500).json({ message: "Thêm giao dịch thất bại", error: err });
      }
      res.status(201).json({
        message: "Thêm giao dịch thành công",
        data: result,
      });
    });
  },

  // Cập nhật giao dịch theo ID
  update: (req, res) => {
    const giao_dich_ngan_hang = req.body;
    const id = req.params.id;
    Giao_dich_ngan_hang.update(giao_dich_ngan_hang, id, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật giao dịch:", err);
        return res.status(500).json({ message: "Cập nhật giao dịch thất bại", error: err });
      }
      res.status(200).json({ message: `Cập nhật giao dịch id = ${id} thành công` });
    });
  },

  // Xóa giao dịch theo ID
  delete: (req, res) => {
    const id = req.params.id;
    Giao_dich_ngan_hang.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa giao dịch:", err);
        return res.status(500).json({ message: "Xóa giao dịch thất bại", error: err });
      }
      res.status(200).json({ message: `Xóa giao dịch id = ${id} thành công` });
    });
  },
};
