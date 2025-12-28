// api/invoice.api.js

import { apiClient } from "@/lib/api";

// 1. Hóa đơn
export const invoiceAPI = {
  getAll: (params) => apiClient.get("/hoa_dons", { params }),
  getById: (id) => apiClient.get(`/hoa_dons/${id}`),
  create: (data) => apiClient.post("/hoa_dons", data),
  update: (id, data) => apiClient.put(`/hoa_dons/${id}`, data),
  delete: (id) => apiClient.delete(`/hoa_dons/${id}`), // hoặc cập nhật trạng thái
};

// 2. Lô hàng
export const shipmentAPI = {
  getAll: () => apiClient.get("/lo_hangs"),
  getById: (id) => apiClient.get(`/lo_hangs/${id}`),
};

// 3. Đối tác
export const partnerAPI = {
  getAll: () => apiClient.get("/doi_tacs"),
  getById: (id) => apiClient.get(`/doi_tacs/${id}`),
};