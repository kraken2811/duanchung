// controllers/tai_lieu.controller.js
const TaiLieu = require("../models/tai_lieu.model");

/**
 * GET /tai-lieu
 * Lấy tất cả tài liệu
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await TaiLieu.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách tài liệu",
      error: error.message,
    });
  }
};

/**
 * GET /tai-lieu/:id
 * Lấy tài liệu theo ID
 */
exports.getById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_tai_lieu không hợp lệ" });
    }

    const data = await TaiLieu.getById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy tài liệu",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy tài liệu",
      error: error.message,
    });
  }
};

/**
 * GET /tai-lieu/doi-tuong
 * Query: loai_doi_tuong, id_doi_tuong
 */
exports.getByDoiTuong = async (req, res) => {
  try {
    const { loai_doi_tuong, id_doi_tuong } = req.query;

    if (!loai_doi_tuong || !id_doi_tuong) {
      return res.status(400).json({
        message: "Thiếu loai_doi_tuong hoặc id_doi_tuong",
      });
    }

    const data = await TaiLieu.getByDoiTuong(
      loai_doi_tuong,
      Number(id_doi_tuong)
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy tài liệu theo đối tượng",
      error: error.message,
    });
  }
};

/**
 * GET /tai-lieu/to-khai/:id_to_khai
 */
exports.getByToKhai = async (req, res) => {
  try {
    const id_to_khai = Number(req.params.id_to_khai);
    if (!Number.isInteger(id_to_khai)) {
      return res.status(400).json({ message: "id_to_khai không hợp lệ" });
    }

    const data = await TaiLieu.getByToKhai(id_to_khai);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy tài liệu theo tờ khai",
      error: error.message,
    });
  }
};



/**
 * PUT /tai-lieu/:id
 * Cập nhật metadata tài liệu
 */
exports.update = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_tai_lieu không hợp lệ" });
    }

    const exists = await TaiLieu.getById(id);
    if (!exists) {
      return res.status(404).json({
        message: "Không tìm thấy tài liệu",
      });
    }

    const updated = await TaiLieu.update(id, req.body);

    res.status(200).json({
      message: "Cập nhật tài liệu thành công",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật tài liệu",
      error: error.message,
    });
  }
};

/**
 * DELETE /tai-lieu/:id
 * ⚠️ Không khuyến khích delete cứng
 */
exports.delete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id_tai_lieu không hợp lệ" });
    }

    await TaiLieu.remove(id);

    res.status(200).json({
      message: "Xóa tài liệu thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xóa tài liệu",
      error: error.message,
    });
  }
};
exports.upload = async (req, res) =>{
  try{
    const id_to_khai = Number(req.params.id_to_khai);
    const {loai_tai_lieu} = req.body;
    const userID = req.user?.id;
    if(!file){
      return res.status(400).json({message:"No file upload"});
    }
    const data = {
      loai_doi_tuong : "To_khai_hai_quan",
      id_doi_tuong: id_to_khai,
      loai_tai_lieu,
      ten_file: file.originalname,
      duong_dan: file.path,
      kich_thuoc: file.size,
      loai_mime: file.mimetype,
      id_to_khai,
      nguoi_tai_len: userID,
    };
    const created = await TaiLieu.insert(req.body);

    res.status(201).json({
      message: "Thêm tài liệu thành công",
      data: created,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm tài liệu",
      error: error.message,
    });
  
  }
}