import { Steps } from "antd";
import { FiSearch, FiEdit3, FiFileText, FiCheckCircle } from "react-icons/fi";

export default function IDCStepBar({ currentStep = 0 }) {
  return (
    <Steps
      current={currentStep}
      items={[
        {
          title: "Tìm kiếm TK gốc",
          description: "Nhập số tờ khai cần sửa",
          icon: <FiSearch />,
        },
        {
          title: "Thông tin sửa đổi",
          description: "Điền lý do và loại sửa đổi",
          icon: <FiEdit3 />,
          status: currentStep >= 1 ? "process" : "wait",
        },
        {
          title: "Chỉnh sửa nội dung",
          description: "Sửa các trường thông tin",
          icon: <FiFileText />,
          status: currentStep >= 2 ? "process" : "wait",
        },
        {
          title: "Gửi và phản hồi",
          description: "Khai báo và nhận kết quả",
          icon: <FiCheckCircle />,
          status: currentStep >= 3 ? "process" : "wait",
        },
      ]}
    />
  );
}