import { apiClient } from "@/lib/api";

const Base_URL = "/to_khai_idcs"

export const getToKhai = async ( so_to_khai ) => {
  const res = await apiClient.get(`${Base_URL}/${ so_to_khai }`);
  return res.data;
};

export const updateIDCChiTiet = async (payload) => {
  const res = await apiClient.post(
    `${Base_URL}/chi-tiet/update`,
    payload
  );
  return res.data;
};

export const saveIDCForm = async (payload) => {
  const res = await apiClient.post(
    `${Base_URL}/sua-doi`,
    payload
  );
  return res.data;
};

export const guiIDC = async (id_to_khai) => {
  const res = await apiClient.post(
    `${Base_URL}/gui/${id_to_khai}`
  );
  return res.data;
};

export const phanHoiHaiQuanIDC = async (id_to_khai, payload) => {
  const res = await apiClient.post(
    `${Base_URL}/phan-hoi/${id_to_khai}`,
    payload
  );
  return res.data;
}