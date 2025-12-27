import { apiClient } from "@/lib/api";
const Base_URL = "/to_khai_hai_quans"

export const getLoaiHinh = () =>
  apiClient.get("/loai_hinh_dac_biets").then(r => r.data);

export const getTokhai = () =>
  apiClient.get("/to_khai_hai_quans").then(r => r.data);


export const getThongKe = async (params) => {
  const res = await apiClient.get(`${Base_URL}/statistics`, { params });
  return res.data?.data ?? res.data;
};

export const fliterTK = async (payload) => {
  const res = await apiClient.get("/to_khai_hai_quans/list", {
    params: payload,
  });
  return res.data;
};

export const deleteTK = async (id_to_khai) => {
  const res = await apiClient.delete(`${Base_URL}/${ id_to_khai }`);
  return res.data;
};

export const declarationsAPI = {
  getLoaiHinh,
  getTokhai,
  getThongKe,
  fliterTK,
};