import axios from "axios";

const BASE_URL = "/dia_diem_kho_bais";

export const getKhoBaiList = (params) =>
  axios.get(BASE_URL, { params });

export const getKhoBaiById = (id) =>
  axios.get(`${BASE_URL}/${id}`);

export const createKhoBai = (data) =>
  axios.post(BASE_URL, data);

export const updateKhoBai = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);

export const deleteKhoBai = (id) =>
  axios.delete(`${BASE_URL}/${id}`);
