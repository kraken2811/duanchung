import axios from "axios";

const BASE_URL = "/lo_hangs"; 

export const getLoHangList = (params) =>
  axios.get(BASE_URL, { params });

export const getLoHangById = (id) =>
  axios.get(`${BASE_URL}/${id}`);

export const createLoHang = (data) =>
  axios.post(BASE_URL, data);

export const updateLoHang = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);

export const deleteLoHang = (id) =>
  axios.delete(`${BASE_URL}/${id}`);
