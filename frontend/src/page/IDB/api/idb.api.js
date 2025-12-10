import axios from "@/lib/axios";

export const idbAPI = {
  // Gửi khai báo chính thức
  declare: (data) => axios.post("/idb/declare", data),
  
  // Lấy thông tin tờ khai từ bước IDA (để fill vào form IDB)
  getFromIDA: (idaId) => axios.get(`/idb/load-from-ida/${idaId}`),
  
  // Lấy thông báo thuế / Phân luồng
  getTaxInfo: (id) => axios.get(`/idb/${id}/tax`),
  getRoutingResult: (id) => axios.get(`/idb/${id}/routing`),
};