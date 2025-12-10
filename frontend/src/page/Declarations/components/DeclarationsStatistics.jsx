import { Row, Col, Card, Statistic } from "antd";
import { FiFileText, FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";

export default function DeclarationsStatistics({ data }) {
  const stats = {
    total: data.length,
    completed: data.filter((d) => d.status === "completed").length,
    pending: data.filter((d) => d.status === "pending").length,
    requiresRevision: data.filter((d) => d.requiresRevision).length,
  };

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card>
          <Statistic
            title="Tổng số tờ khai"
            value={stats.total}
            prefix={<FiFileText />}
            valueStyle={{ color: "#1890ff" }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Đã thông quan"
            value={stats.completed}
            prefix={<FiCheckCircle />}
            valueStyle={{ color: "#52c41a" }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Chờ xử lý"
            value={stats.pending}
            prefix={<FiClock />}
            valueStyle={{ color: "#faad14" }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Yêu cầu sửa đổi"
            value={stats.requiresRevision}
            prefix={<FiAlertCircle />}
            valueStyle={{ color: "#ff4d4f" }}
          />
        </Card>
      </Col>
    </Row>
  );
}
