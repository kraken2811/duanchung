const Chi_tiet_dieu_chinh_tri_gia = require("../models/chi_tiet_dieu_chinh_tri_gia.model");
module.exports = {
  getAll: (req, res) => {
    Chi_tiet_dieu_chinh_tri_gia.getAll((result) => {
      res.send(result);
    });
  },
  getById: (req, res) => {
    const id = req.params.id;
    Chi_tiet_dieu_chinh_tri_gia.getById(id, (result) => {
      res.send(result);
    });
  },
  insert: (req, res) => {
    const chi_tiet_dieu_chinh_tri_gia = req.body;
    Chi_tiet_dieu_chinh_tri_gia.insert(chi_tiet_dieu_chinh_tri_gia, (result) => {
      res.send(result);
    });
  },
  update: (req, res) => {
    const chi_tiet_dieu_chinh_tri_gia = req.body;
    const id = req.params.id;
    Chi_tiet_dieu_chinh_tri_gia.update(chi_tiet_dieu_chinh_tri_gia, id, (result) => {
      res.send(result);
    });
  },
  delete: (req, res) => {
    const id = req.params.id;
    Chi_tiet_dieu_chinh_tri_gia.delete(id, (result) => {
      res.send(result);
    });
  },
};
