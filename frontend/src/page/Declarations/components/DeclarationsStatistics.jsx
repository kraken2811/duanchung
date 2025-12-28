import { Row, Col, Card, Statistic } from "antd";
import { FiFileText, FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";

export default function DeclarationsStatistics({ data }) {
  if (!data) return null;

  const {
    total = 0,
    daThongQuan = 0,
    choXuLy = 0,
    yeuCauSua = 0,
  } = data;

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card>
          <Statistic
            title="Tổng số tờ khai"
            value={total}
            prefix={<FiFileText />}
            valueStyle={{ color: "#1890ff" }}
          />
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic
            title="Đã thông quan"
            value={daThongQuan}
            prefix={<FiCheckCircle />}
            valueStyle={{ color: "#52c41a" }}
          />
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic
            title="Chờ xử lý"
            value={choXuLy}
            prefix={<FiClock />}
            valueStyle={{ color: "#faad14" }}
          />
        </Card>
      </Col>

      <Col span={6}>
        <Card>
          <Statistic
            title="Yêu cầu sửa đổi"
            value={yeuCauSua}
            prefix={<FiAlertCircle />}
            valueStyle={{ color: "#ff4d4f" }}
          />
        </Card>
      </Col>
    </Row>
  );
}
