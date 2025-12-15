const Lich_su_trang_thai = require("../models/lich_su_trang_thai.model");

module.exports = {
  // Lấy tất cả lịch sử trạng thái
  getAll: (req, res) => {
    Lich_su_trang_thai.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy danh sách lịch sử trạng thái:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.status(200).json(result);
    });
  },

  // Lấy lịch sử trạng thái theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Lich_su_trang_thai.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy lịch sử trạng thái:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ message: `Không tìm thấy lịch sử trạng thái có id = ${id}` });
      }
      res.status(200).json(result[0]);
    });
  },

  // Thêm mới một bản ghi lịch sử trạng thái
  insert: (req, res) => {
    const lich_su_trang_thai = req.body;
    Lich_su_trang_thai.insert(lich_su_trang_thai, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm lịch sử trạng thái:", err);
        return res.status(500).json({ message: "Thêm lịch sử trạng thái thất bại", error: err });
      }
      res.status(201).json({
        message: "Thêm lịch sử trạng thái thành công",
        data: result,
      });
    });
  },

  // Cập nhật lịch sử trạng thái theo ID
  update: (req, res) => {
    const id = req.params.id;
    const lich_su_trang_thai = req.body;

    Lich_su_trang_thai.update(lich_su_trang_thai, id, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật lịch sử trạng thái:", err);
        return res.status(500).json({ message: "Cập nhật lịch sử trạng thái thất bại", error: err });
      }
      res.status(200).json({
        message: `Cập nhật lịch sử trạng thái id = ${id} thành công`,
      });
    });
  },

  // Xóa lịch sử trạng thái theo ID
  delete: (req, res) => {
    const id = req.params.id;

    Lich_su_trang_thai.remove(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa lịch sử trạng thái:", err);
        return res.status(500).json({ message: "Xóa lịch sử trạng thái thất bại", error: err });
      }
      res.status(200).json({
        message: `Xóa lịch sử trạng thái id = ${id} thành công`,
      });
    });
  },
};
