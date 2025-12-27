import axios from "axios";
const BASE_URL = "/giao_dich_ngan_hangs";

export const getBankTransactionList = (params) =>
  axios.get(BASE_URL, { params });
export const getBankTransactionById = (id) =>
  axios.get(`${BASE_URL}/${id}`);   