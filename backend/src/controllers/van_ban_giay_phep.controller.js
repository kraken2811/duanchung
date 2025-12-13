const Van_ban_giay_phep = require("../../models/van_ban_giay_phep.model");

module.exports = {
  getAll: (req, res) => {
    Van_ban_giay_phep.getAll((err, result) => {
      if (err) {
        return res.status(500).send({ message: "Lỗi khi lấy danh sách văn bản giấy phép", error: err });
      }
      res.status(200).send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Van_ban_giay_phep.getById(id, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Lỗi khi lấy văn bản giấy phép theo ID", error: err });
      }
      if (!result || result.length === 0) {
        return res.status(404).send({ message: "Không tìm thấy văn bản giấy phép" });
      }
      res.status(200).send(result);
    });
  },

  insert: (req, res) => {
    const van_ban_giay_phep = req.body;
    Van_ban_giay_phep.insert(van_ban_giay_phep, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Lỗi khi thêm văn bản giấy phép", error: err });
      }
      res.status(201).send({ message: "Thêm văn bản giấy phép thành công", data: result });
    });
  },

  update: (req, res) => {
    const van_ban_giay_phep = req.body;
    const id = req.params.id;
    Van_ban_giay_phep.update(van_ban_giay_phep, id, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Lỗi khi cập nhật văn bản giấy phép", error: err });
      }
      res.status(200).send({ message: "Cập nhật văn bản giấy phép thành công", data: result });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Van_ban_giay_phep.delete(id, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Lỗi khi xóa văn bản giấy phép", error: err });
      }
      res.status(200).send({ message: "Xóa văn bản giấy phép thành công" });
    });
  },
};
