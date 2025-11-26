import { Steps } from "antd";
import { FiFileText, FiUpload, FiCheckCircle } from "react-icons/fi";

export default function IDBStepBar() {
  return (
    <Steps
      current={0}
      items={[
        {
          title: "Thông tin tờ khai",
          icon: <FiFileText />,
        },
        {
          title: "Chứng từ bổ sung",
          icon: <FiUpload />,
        },
        {
          title: "Hoàn tất",
          icon: <FiCheckCircle />,
        },
      ]}
    />
  );
}
