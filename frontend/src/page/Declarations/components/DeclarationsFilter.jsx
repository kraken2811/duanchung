import { useState } from "react";
import { Card, Row, Col, Input, DatePicker, Select, Button, Space } from "antd";
import { FiSearch } from "react-icons/fi";
import "../css/Declaration.css";
import {
  DECLARATION_TYPES,
  INCOTERMS,
} from "@/page/IDA/api/rule.api";

const { RangePicker } = DatePicker;

export default function DeclarationsFilter({ onSearch, onReset }) {
  const [filters, setFilters] = useState({
    dateRange: null,
    declarationNumber: "",
    type: "",
    partnerName: "",
    status: "",
    channel: "",
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const emptyFilters = {
      dateRange: null,
      declarationNumber: "",
      type: "",
      partnerName: "",
      status: "",
      channel: "",
    };
    setFilters(emptyFilters);
    onReset(emptyFilters);
  };

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Khoảng thời gian
          </label>
          <RangePicker
            style={{ width: "100%" }}
            placeholder={["Từ ngày", "Đến ngày"]}
            format="DD/MM/YYYY"
            value={filters.dateRange}
            onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
          />
        </Col>
        <Col span={6}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Số tờ khai
          </label>
          <Input
            placeholder="Nhập số tờ khai"
            prefix={<FiSearch />}
            value={filters.declarationNumber}
            onChange={(e) =>
              setFilters({ ...filters, declarationNumber: e.target.value })
            }
          />
        </Col>
        <Col span={5}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Loại hình
          </label>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn loại hình"
            value={filters.type || undefined}
            onChange={(value) => setFilters({ ...filters, type: value })}
            allowClear
          >
            {DECLARATION_TYPES.map((type) => (
              <Select.Option key={type.value} value={type.value}>
                {type.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={5}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Trạng thái
          </label>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn trạng thái"
            value={filters.status || undefined}
            onChange={(value) => setFilters({ ...filters, status: value })}
            allowClear
          >
            <Select.Option value="draft">Bản nháp</Select.Option>
            <Select.Option value="pending">Chờ thông quan</Select.Option>
            <Select.Option value="completed">Đã thông quan</Select.Option>
            <Select.Option value="inspection">Đang kiểm tra</Select.Option>
            <Select.Option value="cancelled">Đã hủy</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={10}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Tên đối tác
          </label>
          <Input
            placeholder="Nhập tên công ty, người xuất/nhập khẩu"
            value={filters.partnerName}
            onChange={(e) =>
              setFilters({ ...filters, partnerName: e.target.value })
            }
          />
        </Col>
        <Col span={6}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Luồng thông quan
          </label>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn luồng"
            value={filters.channel || undefined}
            onChange={(value) => setFilters({ ...filters, channel: value })}
            allowClear
          >
            <Select.Option value="green">Luồng xanh</Select.Option>
            <Select.Option value="yellow">Luồng vàng</Select.Option>
            <Select.Option value="red">Luồng đỏ</Select.Option>
          </Select>
        </Col>
        <Col span={8} style={{ display: "flex", alignItems: "flex-end" }}>
          <Space>
            <Button type="primary" icon={<FiSearch />} size="large" onClick={handleSearch}>
              Tìm kiếm
            </Button>
            <Button className="textSibar" size="large" onClick={handleReset}>
              Xóa bộ lọc
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}
