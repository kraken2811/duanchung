import axios from "axios";

const BASE_URL = "/to_khai_hai_quans";

export const getToKhaiList = (params) =>
  axios.get(BASE_URL, { params });

export const getToKhaiById = (id) =>
  axios.get(`${BASE_URL}/${id}`);
