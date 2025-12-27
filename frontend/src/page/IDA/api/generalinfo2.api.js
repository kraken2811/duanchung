import apiClient from "@/lib/api";
export const getIncoterms = async () => {
  const res = await apiClient.get("/incoterms");
  return res.data;
};
export const getTienTes = async () => {
  const res = await apiClient.get("/tien-tes");
  return res.data;
};
export const getPaymentMethods = async () => {
  const res = await apiClient.get("/phuong-thuc-thanh-toans");
  return res.data;
};
