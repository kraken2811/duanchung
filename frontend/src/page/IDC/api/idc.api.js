import axios from "@/lib/axios";

export const idcAPI = {
  // Tìm kiếm tờ khai gốc
  searchOriginal: (declarationNumber) =>
    axios.get(`/ida/${declarationNumber}`),

  // Tạo tờ khai sửa đổi mới
  create: (data) => axios.post("/idc", data),

  // Lưu nháp IDC
  saveDraft: (data) => axios.put("/idc/draft", data),

  // Gửi khai báo IDC
  declare: (data) => axios.post("/idc/declare", data),

  // Lấy phản hồi từ Hải quan
  getResponse: (idcNumber) => axios.get(`/idc/${idcNumber}/response`),

  // Lấy danh sách IDC đã khai
  getList: (params) => axios.get("/idc", { params }),

  // Validate trước khi gửi
  validate: (data) => axios.post("/idc/validate", data),
};