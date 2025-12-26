import { apiClient } from "@/lib/api";

export const getByDraftId = (draftId) =>
  apiClient.get("/chi_tiet_to_khais", { params: { draft_id: draftId } })
    .then(r => r.data);

export const getByToKhaiId = (toKhaiId) =>
  apiClient.get("/chi_tiet_to_khais", { params: { id_to_khai: toKhaiId } })
    .then(r => r.data);

export const createChiTietToKhai = (payload) =>
  apiClient.post("/chi_tiet_to_khais", payload).then(r => r.data);

export const updateChiTietToKhai = (id, payload) =>
  apiClient.put(`/chi_tiet_to_khais/${id}`, payload).then(r => r.data);

export const deleteChiTietToKhai = (id) =>
  apiClient.delete(`/chi_tiet_to_khais/${id}`);

export const calcTaxByMaHS = (id, payload) =>
  apiClient.post(`/chi_tiet_to_khais/${id}/calc-tax`, payload)
    .then(r => r.data);

