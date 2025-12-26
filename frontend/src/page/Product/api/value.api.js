import axios from "axios";

export const getValueAdjustments = (params) =>
  axios.get("/chi_tiet_dieu_chinh_tri_gias", { params });

export const createValueAdjustment = (data) =>
  axios.post("/chi_tiet_dieu_chinh_tri_gias", data);