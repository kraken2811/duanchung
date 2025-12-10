import { Steps } from "antd";
import { FiFileText, FiEdit3, FiCheckCircle } from "react-icons/fi";

export default function IDAStepBar() {
  return (
    <Steps
      current={0}
      items={[
        {
          title: "Thông tin tờ khai",
          icon: <FiFileText />,
        },
        {
          title: "Hàng hóa",
          icon: <FiEdit3 />,
        },
        {
          title: "Hoàn tất",
          icon: <FiCheckCircle />,
        },
      ]}
    />
  );
}
