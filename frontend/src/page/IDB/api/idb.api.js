import { apiClient } from "@/lib/api";
const Base_URL = "/to_khai_hai_quans"

export const getTrangThai = async (payload) => {
  const res = await apiClient.get(`${Base_URL}/status_tk`, payload);
  return res.data;
};

export const getMaIDB = async (so_to_khai) => {
  const res = await apiClient.get(`${Base_URL}/${encodeURIComponent(so_to_khai)}/idb`);
  return res.data
};

export const submitIDB = async (so_to_khai) => {
  const res = await apiClient.post(`${Base_URL}/idb/submit`, { so_to_khai });
  return res.data;
};