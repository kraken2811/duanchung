const Chi_tiet_to_khai = require("../../models/chi_tiet_to_khai.model");
module.exports = {
  getAll: (req, res) => {
    Chi_tiet_to_khai.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Chi_tiet_to_khai.getById(id, (result) => {
      res.send(result);
    });
  },
  insert: (req, res) => {
    const chi_tiet_to_khai = req.body;
    Chi_tiet_to_khai.insert(chi_tiet_to_khai, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const chi_tiet_to_khai = req.body;
    const id = req.params.id;
    Chi_tiet_to_khai.update(chi_tiet_to_khai, id, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const id = req.params.id;
    Chi_tiet_to_khai.delete(id, (result) => {
      res.send(result);
    });
  },
};
