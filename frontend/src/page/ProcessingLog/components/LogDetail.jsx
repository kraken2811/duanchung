import React from "react";
import { Card, Row, Col, Typography, Button, Space, Divider, Alert, Statistic, Empty } from "antd";
import { FiPrinter, FiDownload } from "react-icons/fi";
import { getRoutingChannelInfo, formatCurrency } from "../utils/status";

const { Text, Title } = Typography;

export default function LogDetail({ message }) {
  // 1. Nếu chưa chọn bản tin nào
  if (!message) {
    return (
      <Card style={{ height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Empty description="Chọn một bản tin để xem chi tiết" />
      </Card>
    );
  }

  const { detail, code, name, refNo, processDate } = message;

  // --- RENDERERS CHO CÁC LOẠI BẢN TIN ---

  // A. Hiển thị thông báo THUẾ (TAX)
  const renderTaxDetail = (data) => (
    <div style={{ marginTop: 16 }}>
      <Alert
        message="Thông tin tính thuế từ hệ thống"
        description="Số liệu do hệ thống VNACCS tính toán dựa trên tờ khai IDA."
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <div style={{ background: "#f6ffed", border: "1px solid #b7eb8f", padding: 24, borderRadius: 8 }}>
        <Row gutter={24}>
          <Col span={12}>
            <Text type="secondary">Thuế nhập khẩu:</Text>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{formatCurrency(data.importTax)}</div>
            <Divider style={{ margin: "12px 0" }} />
            <Text type="secondary">Thuế GTGT (VAT):</Text>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{formatCurrency(data.vatTax)}</div>
          </Col>
          <Col span={12} style={{ textAlign: "right", borderLeft: "1px dashed #d9d9d9" }}>
            <Statistic
              title="TỔNG THUẾ PHẢI NỘP"
              value={data.totalTax}
              precision={0}
              valueStyle={{ color: "#cf1322", fontWeight: "bold", fontSize: 28 }}
              suffix="VND"
            />
          </Col>
        </Row>
      </div>
    </div>
  );

  // B. Hiển thị PHÂN LUỒNG (ROUTING)
  const renderRoutingDetail = (data) => {
    const info = getRoutingChannelInfo(data.channel);
    return (
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <div
          style={{
            background: info.color,
            border: `2px solid ${info.borderColor}`,
            padding: "32px 16px",
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <Title level={2} style={{ color: info.textColor, margin: 0 }}>
            {info.label}
          </Title>
          <Text style={{ fontSize: 16, marginTop: 8, display: "block" }}>{info.description}</Text>
          {data.message && <div style={{ marginTop: 12, fontStyle: "italic" }}>"{data.message}"</div>}
        </div>
        <Alert message="Lưu ý: Doanh nghiệp cần in tờ khai và mang ra cảng để làm thủ tục." type="warning" showIcon />
      </div>
    );
  };

  // C. Hiển thị mặc định (TEXT/JSON)
  const renderDefaultDetail = (data) => (
    <div style={{ marginTop: 16 }}>
      <Card size="small" style={{ background: "#fafafa", border: "1px solid #f0f0f0" }}>
        <pre style={{ margin: 0, fontSize: 13, color: "#595959", whiteSpace: "pre-wrap" }}>
          {data.content || JSON.stringify(data, null, 2)}
        </pre>
      </Card>
    </div>
  );

  // Router hiển thị nội dung
  const renderContent = () => {
    if (!detail) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có nội dung chi tiết" />;
    
    switch (detail.type) {
      case "TAX": return renderTaxDetail(detail);
      case "ROUTING": return renderRoutingDetail(detail);
      default: return renderDefaultDetail(detail);
    }
  };

  return (
    <Card
      title={`[${code}] ${name}`}
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      bodyStyle={{ flex: 1, overflowY: "auto" }}
      extra={
        <Space>
          <Button size="small" icon={<FiDownload />}>XML</Button>
          <Button size="small" icon={<FiPrinter />}>In</Button>
        </Space>
      }
    >
      {/* Header thông tin chung */}
      <div style={{ marginBottom: 16, paddingBottom: 16, borderBottom: "1px dashed #e8e8e8" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Text type="secondary" style={{ fontSize: 12 }}>Số tham chiếu:</Text>
            <div style={{ fontWeight: 500 }}>{refNo}</div>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Text type="secondary" style={{ fontSize: 12 }}>Thời gian xử lý:</Text>
            <div style={{ fontWeight: 500 }}>{processDate}</div>
          </Col>
        </Row>
      </div>

      {/* Nội dung động */}
      {renderContent()}
    </Card>
  );
}