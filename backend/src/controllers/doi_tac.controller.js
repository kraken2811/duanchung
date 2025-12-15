const Doi_tac = require("../models/doi_tac.model");

module.exports = {
  // Lấy tất cả đối tác
  getAll: (req, res) => {
    Doi_tac.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy danh sách đối tác:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.status(200).json(result);
    });
  },

  // Lấy đối tác theo id
  getById: (req, res) => {
    const id = req.params.id;
    Doi_tac.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy đối tác:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: `Không tìm thấy đối tác có id = ${id}` });
      }
      res.status(200).json(result[0]);
    });
  },

  // Thêm mới đối tác
  insert: (req, res) => {
    const doi_tac = req.body;
    Doi_tac.insert(doi_tac, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm đối tác:", err);
        return res.status(500).json({ message: "Thêm đối tác thất bại", error: err });
      }
      res.status(201).json({
        message: "Thêm đối tác thành công",
        data: result,
      });
    });
  },

  // Cập nhật thông tin đối tác
  update: (req, res) => {
    const doi_tac = req.body;
    const id = req.params.id;
    Doi_tac.update(doi_tac, id, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật đối tác:", err);
        return res.status(500).json({ message: "Cập nhật đối tác thất bại", error: err });
      }
      res.status(200).json({ message: `Cập nhật đối tác id = ${id} thành công` });
    });
  },

  // Xóa đối tác
  delete: (req, res) => {
    const id = req.params.id;
    Doi_tac.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa đối tác:", err);
        return res.status(500).json({ message: "Xóa đối tác thất bại", error: err });
      }
      res.status(200).json({ message: `Xóa đối tác id = ${id} thành công` });
    });
  },
};
