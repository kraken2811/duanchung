import { Steps } from "antd";
import { FiFileText, FiShoppingCart, FiCheckCircle } from "react-icons/fi";

export default function IDBStepBar() {
  return (
    <Steps
      current={1} // Đang ở bước 2 (IDB)
      items={[
        {
          title: "Đăng ký (IDA)",
          icon: <FiFileText />,
          description: "Đã hoàn thành"
        },
        {
          title: "Khai chính thức (IDB)",
          icon: <FiShoppingCart />,
          description: "Đang thực hiện"
        },
        {
          title: "Hoàn tất",
          icon: <FiCheckCircle />,
        },
      ]}
    />
  );
}