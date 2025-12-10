import dayjs from "dayjs";

/**
 * Định dạng dữ liệu Hợp đồng trước khi gửi lên API (Payload formatting)
 * @param {Object} data - Dữ liệu thô từ React Hook Form
 * @param {Array} materials - Danh sách nguyên phụ liệu
 * @param {Array} products - Danh sách sản phẩm
 * @param {Array} equipments - Danh sách thiết bị
 * @returns {Object} Dữ liệu chuẩn hóa
 */
export const formatContractPayload = (data, materials = [], products = [], equipments = []) => {
  return {
    ...data,
    // Chuyển đổi đối tượng dayjs thành chuỗi YYYY-MM-DD chuẩn ISO
    signedDate: data.signedDate ? dayjs(data.signedDate).format("YYYY-MM-DD") : null,
    expirationDate: data.expirationDate ? dayjs(data.expirationDate).format("YYYY-MM-DD") : null,
    extensionDate: data.extensionDate ? dayjs(data.extensionDate).format("YYYY-MM-DD") : null,

    // Gán danh sách chi tiết và loại bỏ các trường thừa (như ID tạm của frontend nếu cần)
    materials: materials.map(item => ({
      code: item.code,
      name: item.name,
      hsCode: item.hsCode,
      unit: item.unit,
      origin: item.origin
    })),

    products: products.map(item => ({
      code: item.code,
      name: item.name,
      hsCode: item.hsCode,
      unit: item.unit,
      unitPrice: item.unitPrice
    })),

    equipments: equipments, // Giữ nguyên hoặc map tương tự
    
    // Metadata (ngày tạo, người tạo - nếu cần xử lý tại client)
    submittedAt: new Date().toISOString(),
  };
};

/**
 * Helper để parse dữ liệu từ API về Form (nếu cần load lại Hợp đồng cũ)
 */
export const parseContractData = (apiData) => {
    if (!apiData) return {};
    return {
        ...apiData,
        signedDate: apiData.signedDate ? dayjs(apiData.signedDate) : null,
        expirationDate: apiData.expirationDate ? dayjs(apiData.expirationDate) : null,
    }
}