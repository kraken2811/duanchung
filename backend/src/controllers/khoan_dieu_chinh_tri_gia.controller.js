const Khoan_dieu_chinh_tri_gia = require("../models/khoan_dieu_chinh_tri_gia.model");

module.exports = {
  // Lấy tất cả khoản điều chỉnh trị giá
  getAll: (req, res) => {
    Khoan_dieu_chinh_tri_gia.getAll((err, result) => {
      if (err) {
        console.error("Lỗi khi lấy danh sách khoản điều chỉnh trị giá:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      res.status(200).json(result);
    });
  },

  // Lấy khoản điều chỉnh trị giá theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Khoan_dieu_chinh_tri_gia.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi lấy khoản điều chỉnh trị giá:", err);
        return res.status(500).json({ message: "Lỗi server", error: err });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: `Không tìm thấy khoản điều chỉnh trị giá có id = ${id}` });
      }
      res.status(200).json(result[0]);
    });
  },

  // Thêm mới khoản điều chỉnh trị giá
  insert: (req, res) => {
    const khoan_dieu_chinh_tri_gia = req.body;
    Khoan_dieu_chinh_tri_gia.insert(khoan_dieu_chinh_tri_gia, (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm khoản điều chỉnh trị giá:", err);
        return res.status(500).json({ message: "Thêm khoản điều chỉnh trị giá thất bại", error: err });
      }
      res.status(201).json({
        message: "Thêm khoản điều chỉnh trị giá thành công",
        data: result,
      });
    });
  },

  // Cập nhật khoản điều chỉnh trị giá
  update: (req, res) => {
    const khoan_dieu_chinh_tri_gia = req.body;
    const id = req.params.id;
    Khoan_dieu_chinh_tri_gia.update(khoan_dieu_chinh_tri_gia, id, (err, result) => {
      if (err) {
        console.error("Lỗi khi cập nhật khoản điều chỉnh trị giá:", err);
        return res.status(500).json({ message: "Cập nhật khoản điều chỉnh trị giá thất bại", error: err });
      }
      res.status(200).json({ message: `Cập nhật khoản điều chỉnh trị giá id = ${id} thành công` });
    });
  },

  // Xóa khoản điều chỉnh trị giá
  delete: (req, res) => {
    const id = req.params.id;
    Khoan_dieu_chinh_tri_gia.remove(id, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa khoản điều chỉnh trị giá:", err);
        return res.status(500).json({ message: "Xóa khoản điều chỉnh trị giá thất bại", error: err });
      }
      res.status(200).json({ message: `Xóa khoản điều chỉnh trị giá id = ${id} thành công` });
    });
  },
};
