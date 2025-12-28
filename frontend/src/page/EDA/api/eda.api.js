import { apiClient } from "@/lib/api";
export const createEDA = (payload) =>
  apiClient
    .post("/eda", payload)
    .then((r) => r.data);
export const updateEDAGen2 = (id, payload) =>
  apiClient
    .put(`/eda/${id}`, payload)
    .then((r) => r.data);
export const createEDAGoods = (payload) =>
  apiClient
    .post("/eda/goods", payload)
    .then((r) => r.data);
export const submitEDA = (id) =>
  apiClient.post(`/eda/${id}/submit`).then(r => r.data);
export const getEDAById = (id) =>
  apiClient
    .get(`/eda/${id}`)
    .then((r) => r.data);
export const getEDAList = (params) =>
  apiClient
    .get("/eda", { params })
    .then((r) => r.data);
    
export const saveEDAContainers = (id, payload) =>
  apiClient.post(`/eda/${id}/containers`, payload);