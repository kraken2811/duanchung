// api/contract.api.js (CẬP NHẬT HOÀN CHỈNH)

import { apiClient } from "@/lib/api";

// 1. Hợp đồng
export const contractAPI = {
  getAll: () => apiClient.get("/hop_dongs"),
  getById: (id) => apiClient.get(`/hop_dongs/${id}`),
  createFull: (data) => apiClient.post("/hop_dongs", data),
  update: (id, data) => apiClient.put(`/hop_dongs/${id}`, data),
  delete: (id) => apiClient.delete(`/hop_dongs/${id}`),
};

// 2. Phụ lục hợp đồng
export const appendixAPI = {
  getAll: () => apiClient.get("/phu_luc_hop_dongs"),
  getByContractId: (idHopDong) => apiClient.get(`/phu_luc_hop_dongs/hop-dong/${idHopDong}`),
  getById: (id) => apiClient.get(`/phu_luc_hop_dongs/${id}`),
  create: (data) => apiClient.post("/phu_luc_hop_dongs", data),
  update: (id, data) => apiClient.put(`/phu_luc_hop_dongs/${id}`, data),
  delete: (id) => apiClient.delete(`/phu_luc_hop_dongs/${id}`),
};

// 3. Vật liệu hợp đồng
export const materialAPI = {
  getAll: () => apiClient.get("/vat_lieu_hop_dongs"),
  getByContractId: (idHopDong) => apiClient.get(`/vat_lieu_hop_dongs/hop-dong/${idHopDong}`),
  getById: (id) => apiClient.get(`/vat_lieu_hop_dongs/${id}`),
  create: (data) => apiClient.post("/vat_lieu_hop_dongs", data),
  update: (id, data) => apiClient.put(`/vat_lieu_hop_dongs/${id}`, data),
  delete: (id) => apiClient.delete(`/vat_lieu_hop_dongs/${id}`),
};

// 4. Sản phẩm hợp đồng
export const productAPI = {
  getAll: () => apiClient.get("/san_pham_hop_dongs"),
  getByContractId: (idHopDong) => apiClient.get(`/san_pham_hop_dongs/hop-dong/${idHopDong}`),
  getById: (id) => apiClient.get(`/san_pham_hop_dongs/${id}`),
  create: (data) => apiClient.post("/san_pham_hop_dongs", data),
  update: (id, data) => apiClient.put(`/san_pham_hop_dongs/${id}`, data),
  delete: (id) => apiClient.delete(`/san_pham_hop_dongs/${id}`),
};

// 5. Công ty & Đối tác
export const companyAPI = {
  getAll: () => apiClient.get("/cong_tys"),
  getById: (id) => apiClient.get(`/cong_tys/${id}`),
};

export const partnerAPI = {
  getAll: () => apiClient.get("/doi_tacs"),
  getById: (id) => apiClient.get(`/doi_tacs/${id}`),
};

// 6. Các bảng khác (chuẩn bị cho tương lai)
export const documentAPI = {
  getByContractId: (idHopDong) => apiClient.get(`/van_ban_giay_pheps/hop-dong/${idHopDong}`),
  // ... thêm CRUD sau
};

export const shipmentAPI = {
  getAll: () => apiClient.get("/lo_hangs"),
  // ...
};

export const declarationAPI = {
  getList: (query) => apiClient.get("/to_khai_hai_quans/list", { params: query }),
  getStatistics: () => apiClient.get("/to_khai_hai_quans/statistics"),
  // ...
};

export const categoryAPI = {
  getAll: () => apiClient.get("/danh_mucs"),
  // ...
};