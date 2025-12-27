import { apiClient } from "@/lib/api";

export const getByToKhaiId = (id) =>
  apiClient.get(`/chi_tiet_to_khais/to-khai/${id}`).then(res => res.data);

export const createChiTietToKhai = (data) =>
  apiClient.post("/chi_tiet_to_khais", data);

export const updateChiTietToKhai = (id, data) =>
  apiClient.put(`/chi_tiet_to_khais/${id}`, data);

export const deleteChiTietToKhai = (id) =>
  apiClient.delete(`/chi_tiet_to_khais/${id}`);
export const getMaHs = () =>
  apiClient.get("/ma_hss").then(res => res.data);
export const getMaHsById = (id) =>
  apiClient.get(`/ma_hss/${id}`).then(res => res.data);
export const createMaHs = (data) =>
  apiClient.post("/ma_hss", data).then(res => res.data);
export const updateMaHs = (id, data) =>
  apiClient.put(`/ma_hss/${id}`, data).then(res => res.data);
export const deleteMaHs = (id) =>
  apiClient.delete(`/ma_hss/${id}`);