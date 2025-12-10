import { Steps } from "antd";
import { FiFileText, FiLayers, FiCheckCircle } from "react-icons/fi";

export default function ContractStepBar() {
  return (
    <Steps
      size="small"
      current={0} // Mặc định đang ở bước đầu tiên
      items={[
        {
          title: "Thông tin Hợp đồng",
          description: "Khai báo thông tin chung",
          icon: <FiFileText />,
        },
        {
          title: "Danh mục Hàng hóa",
          description: "NPL, Sản phẩm, Thiết bị",
          icon: <FiLayers />,
        },
        {
          title: "Khai báo & Phản hồi",
          description: "Gửi HQ và nhận kết quả",
          icon: <FiCheckCircle />,
        },
      ]}
      style={{ marginBottom: 16 }}
    />
  );
}