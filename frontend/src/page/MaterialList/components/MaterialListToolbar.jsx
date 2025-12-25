import React from "react";
import { Space, Button, Input, Select, Divider, Row, Col } from "antd";
import {
  FiPlus, FiEdit, FiTrash2, FiUpload, FiDownload, FiRefreshCw, FiSearch, FiPrinter
} from "react-icons/fi";

const { Option } = Select;

export default function MaterialListToolbar({
  onAdd,
  onEdit,
  onDelete,
  onImport,
  onExport,
  onRefresh,
  hasSelection,
}) {
  return (
    <div className="toolbar-wrapper">
      {/* 1. Action Bar: Nền trắng, icon style mới */}
      <div style={{ background: "#fff", padding: "12px 16px", borderBottom: "1px solid #d9d9d9" }}>
        <Space>
          <Button type="primary" icon={<FiPlus />} onClick={onAdd}>Thêm mới</Button>
          <Button className="textSibar" icon={<FiEdit />} disabled={!hasSelection} onClick={onEdit}>Sửa</Button>
          <Button danger icon={<FiTrash2 />} disabled={!hasSelection} onClick={onDelete}>Xóa</Button>
          <Divider type="vertical" />
          <Button className="textSibar" icon={<FiUpload />} onClick={onImport}>Nhập Excel</Button>
          <Button className="textSibar" icon={<FiDownload />} onClick={onExport}>Xuất Excel</Button>
          <Button className="textSibar" icon={<FiPrinter />}>In danh sách</Button>
          <Divider type="vertical" />
          <Button className="textSibar" icon={<FiRefreshCw />} onClick={onRefresh}>Nạp lại</Button>
        </Space>
      </div>

      {/* 2. Filter Bar: Nhẹ nhàng hơn, nằm ngay dưới */}
      <div style={{ padding: "12px 16px", background: "#f5f5f5" }}>
        <Row gutter={16} align="middle">
          <Col>
             <span style={{ fontWeight: 500, marginRight: 8 }}>Tìm kiếm:</span>
          </Col>
          <Col style={{ width: 400 }}>
             <Input.Group compact>
                <Select defaultValue="code" style={{ width: "30%" }}>
                  <Option value="code">Mã NPL</Option>
                  <Option value="name">Tên NPL</Option>
                  <Option value="hsCode">Mã HS</Option>
                </Select>
                <Input style={{ width: "70%" }} placeholder="Nhập từ khóa..." suffix={<FiSearch text="gray" />} />
             </Input.Group>
          </Col>
          <Col>
             <span style={{ fontWeight: 500, margin: "0 8px 0 16px" }}>Nguồn gốc:</span>
             <Select defaultValue="all" style={{ width: 150 }}>
                <Option value="all">Tất cả</Option>
                <Option value="import">Nhập khẩu</Option>
                <Option value="domestic">Trong nước</Option>
             </Select>
          </Col>
        </Row>
      </div>

      <style jsx>{`
        .textSibar { color: #595959; border-color: transparent; background: transparent; }
        .textSibar:hover { color: #1890ff; background: #e6f7ff; }
      `}</style>
    </div>
  );
}