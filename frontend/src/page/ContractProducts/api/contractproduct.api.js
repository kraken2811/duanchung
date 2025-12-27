// src/api/contractproduct.api.js
import { apiClient } from "@/lib/api";

/**
 * API quản lý Sản phẩm Hợp đồng (san_pham_hop_dongs)
 */
export const contractProductAPI = {
  // Lấy tất cả sản phẩm (toàn hệ thống)
  getAll: () => apiClient.get("/san_pham_hop_dongs"),

  // Lấy sản phẩm theo ID hợp đồng
  getByContractId: (idHopDong) => 
    apiClient.get(`/san_pham_hop_dongs/hop-dong/${idHopDong}`),

  // Lấy 1 sản phẩm theo ID
  getById: (id) => apiClient.get(`/san_pham_hop_dongs/${id}`),

  // Tạo mới
  create: (data) => apiClient.post("/san_pham_hop_dongs", data),

  // Cập nhật
  update: (id, data) => apiClient.put(`/san_pham_hop_dongs/${id}`, data),

  // Xóa
  delete: (id) => apiClient.delete(`/san_pham_hop_dongs/${id}`),
};

export const contractAPI = {
  getAll: () => apiClient.get("/hop_dongs"),
  getById: (id) => apiClient.get(`/hop_dongs/${id}`),
};