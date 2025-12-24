import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Table, Input, Button, Row, Col, Select, InputNumber,
  Card, message, Modal, Space, Divider
} from "antd";
import {
  FiPlus, FiSave, FiTrash2, FiUpload, FiDownload, FiPrinter, FiPackage
} from "react-icons/fi";
import { UNITS } from "@/page/IDA/api/rule.api"; // Giữ nguyên import cũ của bạn
// Import CSS chung nếu có, hoặc dùng style nội bộ bên dưới
import "../css/product.css"; 

const { TextArea } = Input;
const { Option } = Select;

// Dữ liệu mẫu
const MOCK_DATA = [
  {
    id: 1,
    productCode: "SP001",
    productName: "Áo sơ mi nam cotton",
    hsCode: "62052000",
    unit: "PCE",
    unitPrice: 2.5,
    partnerCode: "ABC-01",
    notes: "Gia công giai đoạn 1",
  },
  {
    id: 2,
    productCode: "SP002",
    productName: "Quần tây nữ vải tuyết mưa",
    hsCode: "62046200",
    unit: "PCE",
    unitPrice: 3.0,
    partnerCode: "ABC-02",
    notes: "",
  },
];

export default function ContractProductTab() {
  const [products, setProducts] = useState(MOCK_DATA);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      productCode: "",
      productName: "",
      hsCode: "",
      unit: "PCE",
      unitPrice: 0,
      partnerCode: "",
      notes: "",
    },
  });

  // --- HANDLERS ---
  const handleAddNew = () => {
    reset({
      productCode: "",
      productName: "",
      hsCode: "",
      unit: "PCE",
      unitPrice: 0,
      partnerCode: "",
      notes: "",
    });
    setSelectedRowId(null);
  };

  const onSave = (data) => {
    if (!data.productCode || !data.productName) {
      message.error("Vui lòng nhập Mã và Tên sản phẩm!");
      return;
    }

    if (selectedRowId) {
      const updated = products.map((p) => (p.id === selectedRowId ? { ...data, id: selectedRowId } : p));
      setProducts(updated);
      message.success("Cập nhật thành công!");
    } else {
      if (products.some((p) => p.productCode === data.productCode)) {
        message.warning("Mã sản phẩm đã tồn tại!");
        return;
      }
      setProducts([...products, { ...data, id: Date.now() }]);
      message.success("Thêm mới thành công!");
      handleAddNew();
    }
  };

  const handleDelete = () => {
    if (!selectedRowId) {
      message.warning("Vui lòng chọn dòng để xóa");
      return;
    }
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      onOk: () => {
        setProducts(products.filter((p) => p.id !== selectedRowId));
        handleAddNew();
        message.success("Đã xóa sản phẩm");
      }
    });
  };

  const handleRowClick = (record) => {
    setSelectedRowId(record.id);
    Object.keys(record).forEach((key) => setValue(key, record[key]));
  };

  // --- RENDERERS ---

  // 1. Toolbar: Đồng bộ style nền trắng + icon với UnifiedContractForm
  const renderToolbar = () => (
    <div style={{ background: "#fff", padding: "12px 16px", borderBottom: "1px solid #d9d9d9", marginBottom: 16 }}>
      <Space>
        <Button type="primary" icon={<FiSave />} onClick={handleSubmit(onSave)}>Ghi lại</Button>
        <Button className="textSibar" onClick={handleAddNew} style={{ borderColor: "#1890ff", color: "#1890ff" }} icon={<FiPlus />}>Thêm mới</Button>
        <Button danger icon={<FiTrash2 />} onClick={handleDelete} disabled={!selectedRowId}>Xóa dòng</Button>
        <Divider type="vertical" />
        <Button className="textSibar" icon={<FiUpload />}>Nhập Excel</Button>
        <Button className="textSibar" icon={<FiDownload />}>Xuất Excel</Button>
        <Button className="textSibar" icon={<FiPrinter />}>In phiếu</Button>
      </Space>
    </div>
  );

  // 2. Form: Đồng bộ style Card title + Label fontWeight 500
  const renderForm = () => (
    <Card 
      title={<span><FiPackage style={{ marginRight: 8 }} />Thông tin chi tiết sản phẩm</span>} 
      size="small" 
      bordered={false} 
      className="shadow-sm"
      style={{ marginBottom: 16 }}
    >
      <Row gutter={[16, 12]}>
        <Col span={8}>
          <label style={{ fontWeight: 500 }}>Mã sản phẩm <span style={{ color: 'red' }}>*</span></label>
          <Controller
            name="productCode" control={control}
            render={({ field }) => <Input {...field} placeholder="Mã quản lý" status={selectedRowId ? "warning" : ""} />}
          />
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: 500 }}>Tên sản phẩm <span style={{ color: 'red' }}>*</span></label>
          <Controller
            name="productName" control={control}
            render={({ field }) => <Input {...field} placeholder="Tên thương mại" />}
          />
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: 500 }}>Mã HS <span style={{ color: 'red' }}>*</span></label>
          <Controller
            name="hsCode" control={control}
            render={({ field }) => <Input {...field} placeholder="Mã HS" />}
          />
        </Col>

        <Col span={8}>
          <label style={{ fontWeight: 500 }}>Đơn vị tính</label>
          <Controller
            name="unit" control={control}
            render={({ field }) => (
              <Select {...field} showSearch style={{ width: "100%" }} placeholder="Chọn ĐVT">
                {UNITS.map((u) => <Option key={u.value} value={u.value}>{u.value} - {u.label}</Option>)}
              </Select>
            )}
          />
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: 500 }}>Đơn giá GC</label>
          <Controller
            name="unitPrice" control={control}
            render={({ field }) => <InputNumber {...field} style={{ width: "100%" }} min={0} precision={4} />}
          />
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: 500 }}>Mã SP đối tác</label>
          <Controller
            name="partnerCode" control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Col>

        <Col span={24}>
          <label style={{ fontWeight: 500 }}>Ghi chú</label>
          <Controller
            name="notes" control={control}
            render={({ field }) => <TextArea {...field} rows={1} placeholder="Ghi chú thêm..." />}
          />
        </Col>
      </Row>
    </Card>
  );

  // 3. Table columns: Đồng bộ Header UPPERCASE + Align
  const columns = [
    { title: "STT", render: (_, __, i) => <span className="text-gray-500">{i + 1}</span>, width: 50, align: "center" },
    { title: "MÃ SẢN PHẨM", dataIndex: "productCode", width: 150, render: (t) => <b style={{ color: "#1890ff" }}>{t}</b> },
    { title: "TÊN SẢN PHẨM", dataIndex: "productName", ellipsis: true },
    { title: "ĐVT", dataIndex: "unit", width: 80, align: "center" },
    { title: "MÃ HS", dataIndex: "hsCode", width: 100, align: "center" },
    { title: "ĐƠN GIÁ", dataIndex: "unitPrice", width: 120, align: "right", render: (v) => v ? v.toFixed(4) : "0" },
    { title: "GHI CHÚ", dataIndex: "notes", ellipsis: true },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {renderToolbar()}
      
      <div style={{ padding: "0 16px 16px" }}>
        {renderForm()}
        
        {/* Table Wrapper: Style giống renderDetailsTabs */}
        <Card size="small" bordered={false} bodyStyle={{ padding: 0 }} className="shadow-sm">
          <Table
            className="custom-table" // Class từ file CSS contract
            columns={columns}
            dataSource={products}
            rowKey="id"
            size="middle"
            pagination={{ pageSize: 10 }}
            rowClassName={(record) => record.id === selectedRowId ? "ant-table-row-selected" : ""}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
              style: { cursor: "pointer" }
            })}
          />
        </Card>
      </div>

      <style jsx global>{`
        /* CSS nội bộ để đảm bảo giống layout UnifiedContractForm */
        .shadow-sm {
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .ant-table-row-selected > td {
          background-color: #e6f7ff !important;
        }
        /* Style lại header table cho giống file mẫu */
        .custom-table .ant-table-thead > tr > th {
          font-weight: 600;
          background: #fafafa;
          text-transform: uppercase;
          font-size: 13px;
        }
        .textSibar {
            color: #595959;
        }
        .textSibar:hover {
            color: #1890ff;
        }
      `}</style>
    </div>
  );
}