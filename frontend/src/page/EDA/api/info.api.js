import { apiClient } from "@/lib/api";

export const getCongTys = async () => {
  const res = await apiClient.get("/cong_tys");
  return res.data;
};

export const getDoiTacs = async (params) => {
  const res = await apiClient.get("/doi_tacs", { params });
  return res.data;
};

export const getLoaiVanTai = async () => {
  const res = await apiClient.get("/loai_van_tais");
  return res.data;
};

export const getKhoBais = async () => {
  const res = await apiClient.get("/dia_diem_kho_bais");
  return res.data;
};

export const getLoaiHinh = async () => {
  const res = await apiClient.get("/loai_hinh_dac_biets");
  return res.data;
};
