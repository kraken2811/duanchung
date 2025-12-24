import { apiClient } from "./api";

export const initAuth = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  }
};

export const clearAuth = () => {
  delete apiClient.defaults.headers.Authorization;
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
};
