import { apiClient } from "@/lib/api";

export const loginApi = async (payload) => {
  const res = await apiClient.post("/auths/login", payload);
  return res.data;
};

export const refreshTokenApi = async () => {
  const res = await apiClient.post("/auths/refresh");
  return res.data;
};

export const logoutApi = async () => {
  const res = await apiClient.post("/auths/logout");
  return res.data;
};
export const checkMstApi = async (ma_so_thue) => {
  const res = await apiClient.post("/auths/check-mst", { ma_so_thue });
  return res.data;
};