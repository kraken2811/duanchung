const Vai_tro = require("../models/vai_tro.model");

module.exports = {
  getAll: (req, res) => {
    Vai_tro.getAll((err, result) => {
      if (err) {
        return res.status(500).send({ message: "Lỗi khi lấy danh sách vai trò", error: err });
      }
      res.status(200).send(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Vai_tro.getById(id, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Lỗi khi lấy vai trò theo ID", error: err });
      }
      if (!result || result.length === 0) {
        return res.status(404).send({ message: "Không tìm thấy vai trò" });
      }
      res.status(200).send(result);
    });
  },

  insert: (req, res) => {
    const vai_tro = req.body;
    Vai_tro.insert(vai_tro, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Lỗi khi thêm vai trò", error: err });
      }
      res.status(201).send({ message: "Thêm vai trò thành công", data: result });
    });
  },

  update: (req, res) => {
    const vai_tro = req.body;
    const id = req.params.id;
    Vai_tro.update(vai_tro, id, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Lỗi khi cập nhật vai trò", error: err });
      }
      res.status(200).send({ message: "Cập nhật vai trò thành công", data: result });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Vai_tro.delete(id, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Lỗi khi xoá vai trò", error: err });
      }
      res.status(200).send({ message: "Xoá vai trò thành công" });
    });
  },
};
