import axios from "@/lib/axios";

export const contractAPI = {
  create: (data) => axios.post("/contract", data),
  update: (id, data) => axios.put(`/contract/${id}`, data),
  getDetails: (id) => axios.get(`/contract/${id}`),
  // Giả lập import excel
  importExcel: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post("/contract/import", formData);
  }
};