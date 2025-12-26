import axios from "axios";

const BASE_URL = "/doi_tacs";

export const getDoiTacList = (params) =>
  axios.get(BASE_URL, { params });

export const getDoiTacById = (id) =>
  axios.get(`${BASE_URL}/${id}`);

export const createDoiTac = (data) =>
  axios.post(BASE_URL, data);

export const updateDoiTac = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);

export const deleteDoiTac = (id) =>
  axios.delete(`${BASE_URL}/${id}`);
