import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Space, Typography, Spin, Divider } from "antd";
import { FiArrowLeft, FiPrinter, FiDownload } from "react-icons/fi";

// Import Components vừa tạo
import NotificationInfo from "../components/NotificationInfo";
import NotificationContent from "../components/NotificationContent";

// Import Utils & API
import { getPageTitle } from "../utils/status";
import { notificationAPI } from "../api/notification.api";
import { NOTIFICATION_DEFAULT } from "../types";

const { Title } = Typography;

export default function CustomsNotificationView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(NOTIFICATION_DEFAULT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Logic gọi API lấy dữ liệu...
    // (Giả lập để test)
    setLoading(true);
    setTimeout(() => {
        // ... Load data here
        setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <div style={{ padding: 50, textAlign: "center" }}><Spin size="large" /></div>;

  return (
    <div style={{ padding: 24, background: "#f0f2f5", minHeight: "100vh" }}>
      {/* HEADER TOOLBAR */}
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
             {getPageTitle(data.code)}
           </Title>
        </Space>
        <Space>
           <Button icon={<FiPrinter />} onClick={() => window.print()}>In ấn</Button>
           <Button icon={<FiDownload />}>Tải XML</Button>
        </Space>
      </Card>

      {/* BODY CONTENT */}
      <Card style={{ minHeight: 600 }}>
        
        {/* 1. Component Thông tin định danh */}
        <NotificationInfo data={data} />
        
        <Divider orientation="left" style={{ borderColor: '#d9d9d9' }}>NỘI DUNG CHI TIẾT</Divider>
        
        {/* 2. Component Nội dung chính */}
        <NotificationContent data={data} />
        
        <div style={{ marginTop: 40, textAlign: "center", color: "#ccc", fontSize: 12 }}>
            -- HẾT BẢN TIN --
        </div>
      </Card>
    </div>
  );
}