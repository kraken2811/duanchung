import axios from "axios";

export const getInventoryByLoHang = (loHangId) =>
  axios.get("/chi_tiet_to_khais", {
    params: { lo_hang_id: loHangId },
  });
