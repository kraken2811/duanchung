// src/page/ContractMaterials/utils/status.js

/**
 * Map response từ API vat_lieu_hop_dong sang định dạng UI
 */
export const mapAPIMaterialToUI = (item) => {
  return {
    id: item.id_vat_lieu_hop_dong, // hoặc item.id nếu backend trả id thường
    materialCode: item.ma_vat_lieu || "",
    materialName: item.ten_vat_lieu || "",
    unit: item.don_vi_tinh || "Cái",
    quantity: item.so_luong || 0,
    hsCode: item.ma_hs || "",
    unitPrice: item.don_gia || "0",
    origin: item.nguon_goc || "",
    totalValue: item.tong_gia_tri || "0",
    contractId: item.id_hop_dong,
  };
};