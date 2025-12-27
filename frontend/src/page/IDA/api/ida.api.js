import { apiClient } from "@/lib/api";

export const createIDA = (payload) =>
  apiClient
    .post("/to_khai_hai_quans/ida/gen1", payload)
    .then((r) => r.data);
export const updateGen2 = (id, payload) =>
  apiClient.put(`/to_khai_hai_quans/ida/gen2/${id}`, payload)
    .then(res => res.data);
export const createIDAGoods = (payload) =>
  apiClient
    .post("/chi_tiet_to_khais", payload)
    .then((r) => r.data);
export const createLoHang = (payload) =>
  apiClient
    .post("/lo_hangs", payload)
    .then((r) => r.data);
export const createInvoice = (payload) =>
  apiClient
    .post("/hoa_dons", payload)
    .then((r) => r.data);
export const createBillOfLading = (payload) =>
  apiClient
    .post("/van_dons", payload)
    .then((r) => r.data);
export const declareIDA = (idToKhai) =>
  apiClient.post(`/to_khai_hai_quans/ida/declare/${idToKhai}`);
export const getToKhaiList = (params) =>
  apiClient
    .get("/to_khai_hai_quans/list", { params })
    .then((r) => r.data);

export const getToKhaiById = (id) =>
  apiClient
    .get(`/to_khai_hai_quans/${id}`)
    .then((r) => r.data);
