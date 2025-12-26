import axios from "axios";

const BASE_URL = "/loai_van_tais";

export const getLoaiVanTaiList = () =>
  axios.get(BASE_URL);

export const createLoaiVanTai = (data) =>
  axios.post(BASE_URL, data);

export const updateLoaiVanTai = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);

export const deleteLoaiVanTai = (id) =>
  axios.delete(`${BASE_URL}/${id}`);
