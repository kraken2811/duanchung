import axios from "@/lib/axios";

export const logAPI = {
  // Lấy toàn bộ lịch sử giao dịch của một tờ khai cụ thể
  getByDeclaration: (declarationNumber) => 
    axios.get(`/processing-log/declaration/${declarationNumber}`),

  // Lấy chi tiết một bản tin (nếu nội dung quá dài không trả về ở list)
  getMessageDetail: (messageId) => 
    axios.get(`/processing-log/message/${messageId}`),

  // Giả lập hành động "Lấy phản hồi từ Hải quan" (Sync)
  syncFromCustoms: (declarationNumber) => 
    axios.post(`/processing-log/sync`, { declarationNumber }),
    
  // Tải bản tin gốc (file XML) về máy
  downloadMessageXML: (messageId) =>
    axios.get(`/processing-log/download/${messageId}`, { responseType: 'blob' }),
};