import React from "react";
import { Card, Space, Button, Typography } from "antd";
import { FiRefreshCw, FiPrinter, FiX } from "react-icons/fi";
import "../css/log.css";

const { Title } = Typography;

export default function LogToolbar({ onRefresh, onPrint, onClose }) {
  return (
    <Card
      size="small"
      bodyStyle={{
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      style={{ marginBottom: 16, borderTop: "3px solid #1890ff" }}
    >
      <Space>
        <Title level={4} style={{ margin: 0, color: "#1890ff", marginRight: 12 }}>
          Kết quả xử lý tờ khai (Nhật ký truyền nhận)
        </Title>
      </Space>
      <Space>
        <Button className="textSibar" icon={<FiRefreshCw />} onClick={onRefresh}>
          Lấy phản hồi
        </Button>
        <Button className="textSibar" icon={<FiPrinter />} onClick={onPrint}>
          In danh sách
        </Button>
        <Button danger icon={<FiX />} onClick={onClose}>
          Đóng
        </Button>
      </Space>
    </Card>
  );
}