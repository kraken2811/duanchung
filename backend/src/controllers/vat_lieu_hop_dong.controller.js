const Vat_lieu_hop_dong = require("../../models/vat_lieu_hop_dong.model");

module.exports = {
  // 🔹 Lấy tất cả vật liệu hợp đồng
  getAll: (req, res) => {
    Vat_lieu_hop_dong.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy danh sách vật liệu hợp đồng",
          error: err,
        });
      }
      res.status(200).json(result);
    });
  },

  // 🔹 Lấy vật liệu hợp đồng theo ID
  getById: (req, res) => {
    const id = req.params.id;
    Vat_lieu_hop_dong.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi lấy thông tin vật liệu hợp đồng",
          error: err,
        });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy vật liệu hợp đồng",
        });
      }
      res.status(200).json(result[0]);
    });
  },

  // 🔹 Thêm vật liệu hợp đồng
  insert: (req, res) => {
    const vat_lieu_hop_dong = req.body;
    Vat_lieu_hop_dong.insert(vat_lieu_hop_dong, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi thêm vật liệu hợp đồng",
          error: err,
        });
      }
      res.status(201).json({
        message: "Thêm vật liệu hợp đồng thành công",
        data: result,
      });
    });
  },

  // 🔹 Cập nhật vật liệu hợp đồng
  update: (req, res) => {
    const id = req.params.id;
    const vat_lieu_hop_dong = req.body;
    Vat_lieu_hop_dong.update(vat_lieu_hop_dong, id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi cập nhật vật liệu hợp đồng",
          error: err,
        });
      }
      res.status(200).json({
        message: "Cập nhật vật liệu hợp đồng thành công",
        data: result,
      });
    });
  },

  // 🔹 Xóa vật liệu hợp đồng
  delete: (req, res) => {
    const id = req.params.id;
    Vat_lieu_hop_dong.delete(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Lỗi khi xóa vật liệu hợp đồng",
          error: err,
        });
      }
      res.status(200).json({
        message: "Xóa vật liệu hợp đồng thành công",
        data: result,
      });
    });
  },
};
