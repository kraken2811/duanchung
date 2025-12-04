import { Space, Button, Input, Select, Divider, Radio } from "antd";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiUpload,
  FiDownload,
  FiX,
  FiRefreshCw,
} from "react-icons/fi";

const { Search } = Input;
const { Option } = Select;

export default function MaterialListToolbar({
  onAdd,
  onEdit,
  onDelete,
  onImport,
  onExport,
  onClose,
  hasSelection,
}) {
  // Addon select cho ô tìm kiếm
  const searchFilter = (
    <Select defaultValue="code" style={{ width: 130 }}>
      <Option value="code">Mã nguyên liệu</Option>
      <Option value="name">Tên nguyên liệu</Option>
      <Option value="hsCode">Mã HS</Option>
    </Select>
  );

  return (
    <div className="toolbar-container" style={{ marginBottom: 16 }}>
      {/* Hàng 1: Các nút tác vụ chính (Action Bar) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#f5f5f5",
          padding: "8px 12px",
          border: "1px solid #d9d9d9",
          borderBottom: "none",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      >
        <Space wrap>
          <Button type="primary" icon={<FiPlus />} onClick={onAdd}>
            Thêm mới
          </Button>
          <Button
            icon={<FiEdit />}
            disabled={!hasSelection}
            onClick={onEdit}
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<FiTrash2 />}
            disabled={!hasSelection}
            onClick={onDelete}
          >
            Xóa
          </Button>
          <Divider type="vertical" />
          <Button icon={<FiUpload />} onClick={onImport}>
            Nhập Excel
          </Button>
          <Button icon={<FiDownload />} onClick={onExport}>
            Xuất Excel
          </Button>
        </Space>

        <Space>
          <Button icon={<FiRefreshCw />}>Nạp lại</Button>
          <Button icon={<FiX />} danger onClick={onClose}>
            Đóng
          </Button>
        </Space>
      </div>

      {/* Hàng 2: Bộ lọc (Filter Bar) */}
      <div
        style={{
          padding: "12px",
          border: "1px solid #d9d9d9",
          background: "#fff",
        }}
      >
        <Space size="large" wrap>
          <div style={{ width: 400 }}>
            <Search
              addonBefore={searchFilter}
              placeholder="Nhập từ khóa tìm kiếm..."
              allowClear
              enterButton
            />
          </div>
          
          <Space>
            <span style={{ fontWeight: 500 }}>Nguồn gốc:</span>
            <Radio.Group defaultValue="all" buttonStyle="solid" size="middle">
              <Radio.Button value="all">Tất cả</Radio.Button>
              <Radio.Button value="import">Nhập khẩu</Radio.Button>
              <Radio.Button value="domestic">Trong nước</Radio.Button>
            </Radio.Group>
          </Space>
        </Space>
      </div>
    </div>
  );
}