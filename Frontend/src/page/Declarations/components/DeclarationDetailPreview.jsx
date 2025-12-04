import { Card, Row, Col, Space, Tag, Badge, Divider } from "antd";
import { FiFileText, FiCheckCircle, FiClock } from "react-icons/fi";
import { getChannelConfig } from "../utils/helpers";

export default function DeclarationDetailPreview({ declaration }) {
  if (!declaration) return null;

  const channelConfig = getChannelConfig(declaration.channel);

  return (
    <Card
      title={
        <Space>
          <FiFileText />
          <span>Chi tiết tóm tắt</span>
        </Space>
      }
    >
      <Row gutter={16}>
        <Col span={6}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: "#999", fontSize: 12, marginBottom: 4 }}>
              Số tờ khai
            </div>
            <div style={{ fontWeight: 500 }}>{declaration.declarationNumber}</div>
          </div>
        </Col>
        <Col span={6}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: "#999", fontSize: 12, marginBottom: 4 }}>
              Luồng thông quan
            </div>
            <div>
              <Badge color={channelConfig.color} text={channelConfig.text} />
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: "#999", fontSize: 12, marginBottom: 4 }}>
              Số lượng hàng hóa
            </div>
            <div style={{ fontWeight: 500 }}>{declaration.itemCount} dòng</div>
          </div>
        </Col>
        <Col span={6}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: "#999", fontSize: 12, marginBottom: 4 }}>
              Tổng thuế
            </div>
            <div style={{ fontWeight: 500, color: "#1890ff" }}>
              {declaration.totalTax.toLocaleString("en-US")} USD
            </div>
          </div>
        </Col>
      </Row>
      <Divider style={{ margin: "12px 0" }} />
      <Row gutter={16}>
        <Col span={12}>
          <div style={{ color: "#999", fontSize: 12, marginBottom: 4 }}>
            Tên đối tác
          </div>
          <div>{declaration.partnerName}</div>
        </Col>
        <Col span={6}>
          <div style={{ color: "#999", fontSize: 12, marginBottom: 4 }}>
            Trạng thái nộp thuế
          </div>
          <div>
            {declaration.taxPaid ? (
              <Tag color="success" icon={<FiCheckCircle />}>
                Đã nộp thuế
              </Tag>
            ) : (
              <Tag color="warning" icon={<FiClock />}>
                Chưa nộp thuế
              </Tag>
            )}
          </div>
        </Col>
        <Col span={6}>
          <div style={{ color: "#999", fontSize: 12, marginBottom: 4 }}>
            Tài liệu đính kèm
          </div>
          <div>
            {declaration.hasAttachment ? (
              <Tag color="blue" icon={<FiFileText />}>
                Có tài liệu
              </Tag>
            ) : (
              <Tag>Chưa có</Tag>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
}
