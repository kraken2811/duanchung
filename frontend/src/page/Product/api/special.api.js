import axios from "axios";

export const getSpecialTypeByLoHang = (loHangId) =>
  axios.get("/loai_hinh_dac_biets", {
    params: { lo_hang_id: loHangId },
  });
