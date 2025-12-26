import axios from "axios";

const BASE_URL = "/ma_hss";

export const getMaHSList = (params) =>
  axios.get(BASE_URL, { params });

export const getMaHSById = (id) =>
  axios.get(`${BASE_URL}/${id}`);

export const createMaHS = (data) =>
  axios.post(BASE_URL, data);

export const updateMaHS = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);

export const deleteMaHS = (id) =>
  axios.delete(`${BASE_URL}/${id}`);
