import React from "react";
import { Descriptions, Tag } from "antd";

export default function NotificationInfo({ data }) {
  if (!data) return null;

  return (
    <Descriptions 
      title="THÔNG TIN ĐỊNH DANH" 
      bordered 
      size="small" 
      column={2}
      labelStyle={{ background: "#fafafa", width: "160px", fontWeight: 600 }}
      contentStyle={{ background: "#fff" }}
      style={{ marginBottom: 24 }}
    >
      <Descriptions.Item label="Số tờ khai">
        <span style={{ fontWeight: "bold", color: "#1890ff" }}>
          {data.refNo || "---"}
        </span>
      </Descriptions.Item>
      
      <Descriptions.Item label="Ngày xử lý">
        {data.processDate || "---"}
      </Descriptions.Item>
      
      <Descriptions.Item label="Số tiếp nhận bản tin">
        {data.id ? `MSG-${data.id}` : "---"}
      </Descriptions.Item>
      
      <Descriptions.Item label="Mã thông điệp">
        <Tag color="blue">{data.code || "UNK"}</Tag>
      </Descriptions.Item>

      <Descriptions.Item label="Đơn vị Hải quan">
        {data.customsCode || "00 - Tổng cục Hải quan"}
      </Descriptions.Item>
      
      <Descriptions.Item label="Trạng thái">
         <Tag color="success">Đã tiếp nhận</Tag>
      </Descriptions.Item>
    </Descriptions>
  );
}