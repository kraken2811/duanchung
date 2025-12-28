import { apiClient } from "@/lib/api";

const Base_URL = "/to_khai_ides";
const URL = "/tai_lieus"

export const getIDEList = async (keyword) => {
  const res = await apiClient.get(`${Base_URL}/list`, {
    params: { q: keyword },
  });
  return res.data;
};

export const getToKhaiIDE = async (so_to_khai) => {
  const res = await apiClient.get(`${Base_URL}/${so_to_khai}`);
  return res.data;
};

export const saveIDEForm = async (payload) => {
  const res = await apiClient.post(
    `${Base_URL}`,
    payload
  );
  return res.data;
};

export const guiIDE = async (id_sua_doi) => {
  const res = await apiClient.post(
    `${Base_URL}/gui/${id_sua_doi}`
  );
  return res.data;
};

export const uploadIDE = async (formData) => {
  const res = await apiClient.post("/tai_lieus/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
