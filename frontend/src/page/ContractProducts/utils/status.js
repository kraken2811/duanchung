// utils/status.js
const formatPrice = (value) => {
  if (value == null || value === "") return "0";
  const num = parseFloat(value);
  if (isNaN(num)) return "0";
  // Loại bỏ số 0 thừa ở cuối, nhưng giữ tối đa 4 chữ số thập phân
  return parseFloat(num.toFixed(4)).toString();
};

export const mapAPIProductToUI = (item) => {
  return {
    id: item.id_san_pham,
    productCode: item.ma_san_pham || "",
    productName: item.ten_san_pham || "",
    hsCode: item.ma_hs || "",
    unit: item.don_vi_tinh || "Cái",
    // 👇 Dùng chuỗi đã được format thay vì số
    unitPrice: formatPrice(item.don_gia),
    quantity: item.so_luong || "0",
    totalValue: formatPrice(item.tong_gia_tri),
    status: item.trang_thai || "NHAP",
    contractId: item.id_hop_dong,
  };
};