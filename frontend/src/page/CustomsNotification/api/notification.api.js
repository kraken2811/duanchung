// import axios from '@/lib/axios';

// export const notificationAPI = {
//   // Lấy chi tiết nội dung thông báo theo ID
//   getDetail: (id) => axios.get(`/customs-notification/${id}`),

//   // Đánh dấu đã đọc (nếu cần tính năng đếm thông báo chưa đọc)
//   markAsRead: (id) => axios.put(`/customs-notification/${id}/read`),

//   // Tải về file gốc XML của thông báo này
//   downloadXML: (id) => axios.get(`/customs-notification/${id}/download`, { responseType: 'blob' }),
  
//   // Gửi lệnh in (Server side rendering PDF hoặc lấy dữ liệu in)
//   print: (id) => axios.get(`/customs-notification/${id}/print`),
// };