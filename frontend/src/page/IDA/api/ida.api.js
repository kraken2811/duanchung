import { apiClient } from "@/lib/api";


export const createIDA = async (payload) => {
  const res = await apiClient.post("/to_khai_hai_quans", payload);
  return res.data;
};

export const updateIDA = async (id, payload) => {
  const res = await apiClient.put(`/to_khai_hai_quans/${id}`, payload);
  return res.data;
};

export const getIDAById = async (id) => {
  const res = await apiClient.get(`/to_khai_hai_quans/${id}`);
  return res.data;
};

export const submitIDA = async (id) => {
  const res = await apiClient.post(`/to_khai_hai_quans/${id}/submit`);
  return res.data;
};

export const createIDAGoods = async (payload) => {
  const res = await apiClient.post("/chi_tiet_to_khais", payload);
  return res.data;
};


export const createInvoice = async (payload) => {
  const res = await apiClient.post("/hoa_dons", payload);
  return res.data;
};

export const createBillOfLading = async (payload) => {
  const res = await apiClient.post("/van_dons", payload);
  return res.data;
};
