import { Steps } from "antd";
import { FiSearch, FiTrash2, FiCheckCircle } from "react-icons/fi";

export default function IDEStepBar() {
  return (
    <Steps
      size="small"
      current={1} // Đang ở bước 2: Khai báo hủy
      items={[
        {
          title: "Chọn tờ khai",
          description: "Xác định tờ khai cần hủy",
          icon: <FiSearch />,
          status: "finish", // Bước 1 đã xong
        },
        {
          title: "Khai báo hủy (IDE)",
          description: "Nhập lý do & Gửi yêu cầu",
          icon: <FiTrash2 />, // Icon thùng rác biểu thị việc hủy
          status: "process", // Đang thực hiện bước này
        },
        {
          title: "Kết quả xử lý",
          description: "Chấp nhận/Từ chối",
          icon: <FiCheckCircle />,
          status: "wait", // Bước tiếp theo
        },
      ]}
      style={{ padding: "0 12px" }}
    />
  );
}