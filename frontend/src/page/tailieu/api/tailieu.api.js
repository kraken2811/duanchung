import axios from "axios";

const BASE_URL = "/tai_lieus";

export const getTailieuList = (params) => {
  return axios.get(BASE_URL, { params });
};

export const getTailieuById = (id) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const getTailieuByToKhai = (idToKhai) => {
  return axios.get(`${BASE_URL}/to-khai/${idToKhai}`);
};

export const createTailieu = (idToKhai, formData) => {
  return axios.post(
    `${BASE_URL}/upload/${idToKhai}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const updateTailieu = (id, data) => {
  return axios.put(`${BASE_URL}/${id}`, data);
};

export const deleteTailieu = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
