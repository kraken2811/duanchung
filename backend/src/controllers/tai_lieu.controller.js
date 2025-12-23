const TaiLieu = require("../models/tai_lieu.model");

/**
 * GET /tai-lieu
 */
exports.getAll = async (_req, res) => {
  try {
    const data = await TaiLieu.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

/**
 * GET /tai-lieu/:id
 */
exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    const data = await TaiLieu.getById(id);
    if (!data) {
      return res.status(404).json({ message: "Không tìm thấy tài liệu" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

/**
 * GET /tai-lieu/doi-tuong?loai_doi_tuong=&id_doi_tuong=
 */
exports.getByDoiTuong = async (req, res) => {
  const { loai_doi_tuong, id_doi_tuong } = req.query;

  if (!loai_doi_tuong || !id_doi_tuong) {
    return res.status(400).json({ message: "Thiếu tham số" });
  }

  try {
    const data = await TaiLieu.getByDoiTuong(
      loai_doi_tuong,
      Number(id_doi_tuong)
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

/**
 * GET /tai-lieu/to-khai/:id_to_khai
 */
exports.getByToKhai = async (req, res) => {
  const id_to_khai = Number(req.params.id_to_khai);
  if (!Number.isInteger(id_to_khai)) {
    return res.status(400).json({ message: "id_to_khai không hợp lệ" });
  }

  try {
    const data = await TaiLieu.getByToKhai(id_to_khai);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

/**
 * POST /tai-lieu/upload/:id_to_khai
 */
exports.upload = async (req, res) => {
  const id_to_khai = Number(req.params.id_to_khai);
  const file = req.file;
  const userId = req.user?.id;
  const { loai_tai_lieu, ghi_chu } = req.body;

  if (!Number.isInteger(id_to_khai)) {
    return res.status(400).json({ message: "id_to_khai không hợp lệ" });
  }

  if (!file) {
    return res.status(400).json({ message: "Chưa upload file" });
  }

  try {
    const data = {
      loai_doi_tuong: "TO_KHAI_HAI_QUAN",
      id_doi_tuong: id_to_khai,
      loai_tai_lieu,
      ten_file: file.originalname,
      duong_dan: file.path,
      kich_thuoc: file.size,
      loai_mime: file.mimetype,
      id_to_khai,
      nguoi_tai_len: userId,
      ghi_chu,
    };

    const created = await TaiLieu.insert(data);

    res.status(201).json({
      message: "Upload tài liệu thành công",
      data: created,
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

/**
 * PUT /tai-lieu/:id
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    const exists = await TaiLieu.getById(id);
    if (!exists) {
      return res.status(404).json({ message: "Không tìm thấy tài liệu" });
    }

    const updated = await TaiLieu.update(id, req.body);

    res.json({
      message: "Cập nhật thành công",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

/**
 * DELETE /tai-lieu/:id
 */
exports.delete = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    await TaiLieu.remove(id);
    res.json({ message: "Xóa tài liệu thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
