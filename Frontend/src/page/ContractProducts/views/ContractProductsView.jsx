import React from "react";
import { Card, Tabs } from "antd";
import { FiDatabase, FiBox, FiCpu } from "react-icons/fi";
import ContractProductTab from "../components/ContractProductTab"; // Import component vừa tạo

export default function ContractView() {
  const items = [
    {
      key: "1",
      label: (
        <span>
          <FiDatabase style={{ marginRight: 8 }} /> Nguyên liệu
        </span>
      ),
      children: <div style={{ padding: 20 }}>Nội dung tab Nguyên liệu (Đang phát triển)</div>,
    },
    {
      key: "2",
      label: (
        <span>
          <FiBox style={{ marginRight: 8 }} /> Danh mục Sản phẩm
        </span>
      ),
      children: <ContractProductTab />, // Sử dụng component Sản phẩm ở đây
    },
    {
      key: "3",
      label: (
        <span>
          <FiCpu style={{ marginRight: 8 }} /> Thiết bị
        </span>
      ),
      children: <div style={{ padding: 20 }}>Nội dung tab Thiết bị (Đang phát triển)</div>,
    },
  ];

  return (
    <div style={{ padding: "16px" }}>
      <h2 style={{ textTransform: "uppercase", color: "#0050b3", marginBottom: 16 }}>
        Đăng ký sản phẩm hợp đồng gia công
      </h2>
      
      {/* Thông tin chung của hợp đồng (Header) */}
      <Card style={{ marginBottom: 16 }} size="small" title="Thông tin chung">
         {/* Ví dụ header hợp đồng */}
         <div style={{display: 'flex', gap: 20}}>
            <strong>Số hợp đồng: HD-2023-GC01</strong>
            <strong>Đối tác: SAMSUNG ELECTRONICS</strong>
            <strong>Ngày ký: 01/01/2023</strong>
         </div>
      </Card>

      {/* Khu vực Tabs chi tiết */}
      <Card bodyStyle={{ padding: 0 }}>
        <Tabs 
          defaultActiveKey="2" 
          items={items} 
          type="card" 
          style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
        />
      </Card>
    </div>
  );
}