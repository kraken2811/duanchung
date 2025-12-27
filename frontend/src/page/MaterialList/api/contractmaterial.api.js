// src/page/ContractMaterials/api/contractmaterial.api.js
import { apiClient } from "@/lib/api";

/**
 * API quản lý Vật liệu Hợp đồng (vat_lieu_hop_dongs)
 */
export const contractMaterialAPI = {
  // Lấy tất cả vật liệu (toàn hệ thống)
  getAll: () => apiClient.get("/vat_lieu_hop_dongs"),

  // Lấy vật liệu theo ID hợp đồng
  getByContractId: (idHopDong) => 
    apiClient.get(`/vat_lieu_hop_dongs/hop-dong/${idHopDong}`),

  // Lấy 1 vật liệu theo ID
  getById: (id) => apiClient.get(`/vat_lieu_hop_dongs/${id}`),

  // Tạo mới
  create: (data) => apiClient.post("/vat_lieu_hop_dongs", data),

  // Cập nhật
  update: (id, data) => apiClient.put(`/vat_lieu_hop_dongs/${id}`, data),

  // Xóa
  delete: (id) => apiClient.delete(`/vat_lieu_hop_dongs/${id}`),
};

// 👇 Giữ lại contractAPI để lấy ma_ngoai_te từ hợp đồng
export const contractAPI = {
  getAll: () => apiClient.get("/hop_dongs"),
  getById: (id) => apiClient.get(`/hop_dongs/${id}`),
};