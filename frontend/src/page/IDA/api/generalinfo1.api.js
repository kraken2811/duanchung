import { apiClient } from "@/lib/api";

export const getCongTys = () =>
  apiClient.get("/cong_tys").then(r => r.data);

export const getLoaiHinh = () =>
  apiClient.get("/loai_hinh_dac_biets").then(r => r.data);

export const getQuocGias = () =>
  apiClient.get("/quoc_gias").then(r => r.data);

export const getLoaiVanTai = () =>
  apiClient.get("/loai_van_tais").then(r => r.data);

export const getKhoBais = () =>
  apiClient.get("/dia_diem_kho_bais").then(r => r.data);

export const getDoiTacs = (params = {}) =>
  apiClient
    .get("/doi_tacs", { params })
    .then(r => r.data);
