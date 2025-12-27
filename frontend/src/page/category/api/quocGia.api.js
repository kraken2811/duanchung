import axios from "axios";

const BASE_URL = "/quoc_gias";

export const getQuocGiaList = () =>
  axios.get(BASE_URL);

export const createQuocGia = (data) =>
  axios.post(BASE_URL, data);

export const updateQuocGia = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);

export const deleteQuocGia = (id) =>
  axios.delete(`${BASE_URL}/${id}`);
