import React from "react";
import { Table, Typography, Tag, Statistic, Card, Empty, Alert } from "antd";
import { formatCurrency, getChannelConfig } from "../utils/status";

const { Text, Title } = Typography;

export default function NotificationContent({ data }) {
  if (!data || !data.detail) return <Empty description="Không có nội dung chi tiết" />;

  const { code, detail } = data;

  // --- CASE 1: HIỂN THỊ BẢNG THUẾ (TAX) ---
  if (code === 'TAX') {
    // Cấu hình cột cho bảng thuế
    const columns = [
      { 
        title: "STT", 
        render: (_, __, i) => i + 1, 
        width: 60, 
        align: "center" 
      },
      { 
        title: "Sắc thuế", 
        dataIndex: "name", 
        render: (text) => <b>{text}</b> 
      },
      { 
        title: "Trị giá tính thuế (VND)", 
        dataIndex: "value", 
        align: "right", 
        render: formatCurrency 
      },
      { 
        title: "Thuế suất", 
        dataIndex: "rate", 
        align: "center",
        width: 100
      },
      { 
        title: "Tiền thuế (VND)", 
        dataIndex: "amount", 
        align: "right", 
        render: (v) => <b style={{ color: "#cf1322" }}>{formatCurrency(v)}</b> 
      },
    ];

    // Tính tổng tiền thuế nếu API không trả về
    const totalCalc = (detail.taxes || []).reduce((sum, item) => sum + item.amount, 0);
    const totalDisplay = detail.totalTax || totalCalc;

    return (
      <div style={{ background: "#fff" }}>
        <Alert 
           message="Thông tin tính thuế chi tiết" 
           description="Số liệu dưới đây được hệ thống VNACCS tính toán dựa trên tờ khai nhập khẩu." 
           type="info" 
           showIcon 
           style={{ marginBottom: 16 }} 
        />
        
        <Table
          dataSource={detail.taxes || []}
          columns={columns}
          rowKey="id"
          pagination={false}
          bordered
          size="middle"
          summary={() => (
            <Table.Summary.Row style={{ backgroundColor: "#fffbe6" }}>
              <Table.Summary.Cell index={0} colSpan={4} align="right">
                <Text strong>TỔNG CỘNG TIỀN THUẾ:</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right">
                <Text type="danger" strong style={{ fontSize: 16 }}>
                  {formatCurrency(totalDisplay)}
                </Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />

        <div style={{ marginTop: 24, padding: 20, background: "#f6ffed", border: "1px solid #b7eb8f", borderRadius: 8, textAlign: 'right' }}>
            <Statistic 
                title="SỐ TIỀN PHẢI NỘP (GHI NHẬN TẠI KHO BẠC)" 
                value={totalDisplay} 
                precision={0} 
                valueStyle={{ color: '#3f8600', fontWeight: 'bold' }} 
                suffix="VND" 
            />
        </div>
      </div>
    );
  }

  // --- CASE 2: HIỂN THỊ PHÂN LUỒNG (RCC) ---
  if (code === 'RCC') {
    const config = getChannelConfig(detail.channel); // Lấy màu sắc từ utils

    return (
      <div style={{ padding: 40, textAlign: "center", border: "2px dashed #d9d9d9", background: "#fafafa", borderRadius: 8 }}>
        <Title level={3} style={{ color: "#595959" }}>KẾT QUẢ PHÂN LUỒNG TỜ KHAI</Title>
        
        <div style={{ margin: "30px 0" }}>
            <Tag color={config.color} style={{ fontSize: 24, padding: "10px 40px", borderRadius: 4 }}>
               {config.text}
            </Tag>
        </div>
        
        <Text style={{ fontSize: 16, display: 'block', marginBottom: 8 }}>
            {config.desc}
        </Text>
        
        {detail.message && (
            <div style={{ marginTop: 20, padding: 10, background: "#fff", display: "inline-block", border: "1px solid #eee" }}>
                <Text type="secondary" italic>{detail.message}</Text>
            </div>
        )}
      </div>
    );
  }

  // --- CASE 3: HIỂN THỊ MẶC ĐỊNH (TEXT) ---
  return (
    <div>
      <Text strong>Nội dung chi tiết:</Text>
      <div style={{ 
        marginTop: 8,
        padding: 16, 
        background: "#f5f5f5", 
        border: "1px solid #e8e8e8", 
        minHeight: 200, 
        whiteSpace: "pre-wrap",
        fontFamily: "monospace",
        borderRadius: 4
      }}>
        {detail.message || detail.content || JSON.stringify(detail, null, 2)}
      </div>
    </div>
  );
}