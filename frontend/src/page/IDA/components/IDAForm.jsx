import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Divider, Tabs, Space } from "antd";
import { FiSave, FiSend, FiPrinter } from "react-icons/fi";
import useNotify from "@/components/notification/useNotify";

// Import các component con đã tách
import GeneralInfo1 from "./GeneralInfo1";
import GeneralInfo2 from "./GeneralInfo2";
import GoodsList from "./GoodsList";
import Attachments from "./Attachments";

// Import giả định
import { IDA_DEFAULT } from "../types"; 
import { formatIDA } from "../utils/status";
import "../css/IDA.css";

export default function IDAForm() {
  const notify = useNotify();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: IDA_DEFAULT,
  });

  // State goods vẫn giữ ở Parent để khi Save/Declare có thể gộp dữ liệu
  const [goods, setGoods] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  // --- LOGIC CHUNG ---
  const onSave = (data) => {
    // Ghép dữ liệu từ Form (data) và dữ liệu từ GoodsList (goods)
    const final = formatIDA({ ...data, goods });
    console.log("LƯU IDA:", final);
    notify.success("Đã lưu thông tin tờ khai");
  };

  const onDeclare = (data) => {
    const final = formatIDA({ ...data, goods });
    console.log("KHAI BÁO IDA:", final);
    notify.success("Đã gửi tờ khai lên hệ thống VNACCS");
  };

  const tabItems = [
    { 
      key: "1", 
      label: "Thông tin chung 1", 
      children: <GeneralInfo1 register={register} setValue={setValue} /> 
    },
    { 
      key: "2", 
      label: "Thông tin chung 2", 
      children: <GeneralInfo2 register={register} setValue={setValue} /> 
    },
    { 
      key: "3", 
      label: "Danh sách hàng", 
      children: <GoodsList goods={goods} setGoods={setGoods} /> 
    },
    { 
      key: "4", 
      label: "Đính kèm chứng từ", 
      children: <Attachments /> 
    },
  ];

  return (
    <div>
      {/* Thanh công cụ */}
      <div 
        style={{
          background: "#fff",
          padding: "12px 16px",
          borderBottom: "1px solid #d9d9d9",
          marginBottom: 16,
        }}
      >
        <Space>
          <Button className="textSibar" icon={<FiSave />} onClick={handleSubmit(onSave)}>
            Ghi
          </Button>
          <Button  type="primary" icon={<FiSend />} onClick={handleSubmit(onDeclare)}>
            Khai báo
          </Button>
          <Button className="textSibar" icon={<FiPrinter />}>In</Button>
          <Divider type="vertical" />
          <Button className="textSibar">Lấy phản hồi</Button>
          <Button className="textSibar">Đăng ký mới</Button>
          <Button danger>Xóa</Button>
        </Space>
      </div>

      <Tabs activeKey={activeTab} items={tabItems} onChange={setActiveTab} />
    </div>
  );
}