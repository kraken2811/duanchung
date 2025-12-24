const IDC = require("../models/to_khai_idc.model");

function normalize(body = {}) {
    const data = { ...body };

    const toNumOrNull = (v) =>
        v === undefined || v === null || v === "" || Number.isNaN(Number(v))
            ? null
            : Number(v);

    data.id_chi_tiet = toNumOrNull(data.id_chi_tiet);
    data.so_luong = toNumOrNull(data.so_luong);
    data.don_gia = toNumOrNull(data.don_gia);

    if (typeof data.ma_hs === "string") data.ma_hs = data.ma_hs.trim();
    if (typeof data.ly_do_sua === "string") data.ly_do_sua = data.ly_do_sua.trim();

    return data;
}

exports.searchTokhai = async (req, res) => {
  try {
    const { so_to_khai } = req.params;
    if (!so_to_khai) {
      return res.status(400).json({ message: "Số tờ khai là bắt buộc" });
    }

    const tk = await IDC.findTokhaiBySoToKhai(so_to_khai);

    if (!tk) {
      return res.status(404).json({ message: "Không tìm thấy tờ khai" });
    }

    if (tk.trang_thai_gui === "DA_THONG_QUAN") {
      return res.status(400).json({
        message: "Tờ khai đã thông quan, không thể chỉnh sửa",
      });
    }

    res.json(tk);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.updateChiTiet = async (req, res) => {
    const payload = normalize(req.body);
    const userId = req.user?.id || null;

    if (!payload.id_chi_tiet || !payload.ly_do_sua) {
        return res.status(400).json({ message: "ID chi tiết và lý do sửa là bắt buộc" });
    }

    IDC.findChiTietById(payload.id_chi_tiet, (err, olData) => {
        if (err) return res.status(500).json({ message: "Lỗi server" });
        if (!olData) return res.status(404).json({ message: "Không tìm thấy chi tiết tờ khai" });

        const updatedData = {
            so_luong: payload.so_luong ?? olData.so_luong,
            don_gia: payload.don_gia ?? olData.don_gia,
            ma_hs: payload.ma_hs ?? olData.ma_hs,
        };

        IDC.updateChiTiet(payload.id_chi_tiet, updatedData, (err, newData) => {
            if (err) return res.status(500).json({ message: "Lỗi server" });

            IDC.createAuditLog({
                ten_bang: "chi_tiet_to_khai",
                id_ban_ghi: payload.id_chi_tiet,
                hanh_dong: "SUA",
                du_lieu_cu: olData,
                du_lieu_moi: newData,
                id_nguoi_tao: userId,
            }, (err) => {
                if (err) console.error("Lỗi khi tạo audit log:", err);

                res.json({ message: "Cập nhật chi tiết tờ khai thành công", data: newData});
            });
        });
    });
};

exports.phanHoiHaiQuan = async (req, res) => {
    const id_to_khai = Number(req.params.id_to_khai);
    const { ket_qua, noi_dung } = req.body;

    if (!Number.isInteger(id_to_khai)) {
        return res.status(400).json({ message: "ID tờ khai không hợp lệ" });
    }

    if (!ket_qua) {
        return res.status(400).json({ message: "Kết quả phản hồi là bắt buộc" });
    }

    IDC.createPhanHoiHaiQuan( 
        {
            id_to_khai,
            loai_thong_diep: "IDC",
            noi_dung_thong_diep: noi_dung || "",
        },
        (err) => {
            if (err) return res.status(500).json({ message: "Lỗi server" });

            IDC.createLichSuTrangThai(
                {
                    id_to_khai,
                    trang_thai_cu: "SUA_IDC",
                    trang_thai_moi: ket_qua,
                    ghi_chu: noi_dung || "",
                },
                (err) => {
                    if (err) return res.status(500).json({ message: "Lỗi server" });

                    res.json({ message: "Phản hồi hải quan đã được ghi nhận" });
                }
            );
        }
    );
};

exports.guiIDC = async (req, res) => {
  try {
    const id_to_khai = Number(req.params.id_to_khai);
    const { ghi_chu } = req.body;
    const userId = req.user?.id || null;

    const tk = await IDC.findToKhaiById(id_to_khai);
    if (!tk) {
      return res.status(404).json({ message: "Không tìm thấy tờ khai" });
    }

    await IDC.createLichSuTrangThai({
      id_to_khai,
      trang_thai_cu: tk.trang_thai_gui,
      trang_thai_moi: "SUA_IDC",
      ghi_chu: ghi_chu || "Gửi IDC",
      nguoi_thay_doi: userId,
    });

    res.json({ message: "Đã gửi IDC" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};