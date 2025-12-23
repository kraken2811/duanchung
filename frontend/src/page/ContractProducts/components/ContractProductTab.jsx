import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Table,
  Input,
  Button,
  Row,
  Col,
  Space,
  Select,
  InputNumber,
  Card,
  Modal,
  message,
  Popconfirm
} from "antd";
import {
  FiPlus,
  FiSave,
  FiTrash2,
  FiUpload,
  FiDownload,
  FiFileText
} from "react-icons/fi";
import { UNITS } from "@/page/IDA/api/rule.api"; // Tận dụng lại danh sách ĐVT từ module IDA
import "../css/product.css";

const { TextArea } = Input;
const { Option } = Select;

// Dữ liệu mẫu ban đầu để hiển thị
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

  // React Hook Form
  const { control, handleSubmit, reset, setValue, getValues } = useForm({
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

  // --- ACTION HANDLERS ---

  // 1. Thêm mới (Reset form để nhập liệu mới)
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
    document.getElementById("input-product-code")?.focus(); // Focus vào ô đầu tiên
  };

  // 2. Ghi / Lưu (Xử lý Thêm mới hoặc Cập nhật)
  const onSave = (data) => {
    // Validate cơ bản (giả lập)
    if (!data.productCode || !data.productName || !data.hsCode) {
      message.error("Vui lòng nhập đầy đủ các trường bắt buộc (*)");
      return;
    }

    if (selectedRowId) {
      // Cập nhật dòng hiện tại
      const updatedProducts = products.map((item) =>
        item.id === selectedRowId ? { ...data, id: selectedRowId } : item
      );
      setProducts(updatedProducts);
      message.success("Cập nhật sản phẩm thành công!");
    } else {
      // Thêm mới vào danh sách
      // Kiểm tra trùng mã
      const isExist = products.some((p) => p.productCode === data.productCode);
      if (isExist) {
        message.warning("Mã sản phẩm đã tồn tại!");
        return;
      }
      const newProduct = { ...data, id: Date.now() };
      setProducts([...products, newProduct]);
      message.success("Thêm mới sản phẩm thành công!");
      handleAddNew(); // Reset form sau khi thêm
    }
  };

  // 3. Xóa dòng
  const handleDelete = () => {
    if (!selectedRowId) {
      message.warning("Vui lòng chọn một dòng để xóa");
      return;
    }
    setProducts(products.filter((item) => item.id !== selectedRowId));
    handleAddNew();
    message.success("Đã xóa sản phẩm");
  };

  // 4. Click vào dòng trong Grid -> Fill dữ liệu lên Form
  const handleRowClick = (record) => {
    setSelectedRowId(record.id);
    // Set value cho từng field
    Object.keys(record).forEach((key) => {
      setValue(key, record[key]);
    });
  };

  // 5. Excel Import/Export (Giả lập)
  const handleImportExcel = () => message.info("Chức năng Import Excel đang phát triển");
  const handleExportExcel = () => message.info("Đã xuất file Excel xuống máy");

  // --- DEFINITIONS ---

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 50,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Mã Sản Phẩm",
      dataIndex: "productCode",
      key: "productCode",
      width: 150,
      render: (text) => <b style={{ color: "#1890ff" }}>{text}</b>,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "productName",
      key: "productName",
      width: 250,
      ellipsis: true,
    },
    {
      title: "ĐVT",
      dataIndex: "unit",
      key: "unit",
      width: 80,
      align: "center",
    },
    {
      title: "Mã HS",
      dataIndex: "hsCode",
      key: "hsCode",
      width: 100,
      align: "center",
    },
    {
      title: "Đơn giá GC",
      dataIndex: "unitPrice",
      key: "unitPrice",
      width: 100,
      align: "right",
      render: (val) => val ? val.toFixed(4) : "0",
    },
    {
      title: "Ghi chú",
      dataIndex: "notes",
      key: "notes",
      ellipsis: true,
    },
  ];

  const paginationConfig = {
    total: products.length,
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    
    // Custom hiển thị tổng số bản ghi giống ảnh
    showTotal: (total, range) => (
      <span style={{ fontWeight: 600, color: '#333' }}>
        Tổng {total} bản ghi
      </span>
    ),
  };

  return (
    <div className="ecus-layout">
      {/* --- 1. ACTION TOOLBAR --- */}
      <div
        style={{
          backgroundColor: "#f0f2f5",
          padding: "8px 12px",
          borderBottom: "1px solid #d9d9d9",
          marginBottom: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <Button className="textSibar" icon={<FiPlus />} onClick={handleAddNew}>
          Thêm mới (F2)
        </Button>
        <Button
          type="primary"
          icon={<FiSave />}
          onClick={handleSubmit(onSave)}
          style={{ background: "#0050b3", borderColor: "#0050b3" }} // Màu xanh đậm kiểu ECUS
        >
          Ghi lại (Ctrl+S)
        </Button>
        
        <Popconfirm
          title="Bạn có chắc muốn xóa dòng này?"
          onConfirm={handleDelete}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button className="textSibar" danger icon={<FiTrash2 />} disabled={!selectedRowId}>
            Xóa
          </Button>
        </Popconfirm>

        <div style={{ width: 1, background: "#ccc", margin: "0 4px" }}></div>

        <Button className="textSibar" icon={<FiUpload />} onClick={handleImportExcel}>
          Nhập Excel
        </Button>
        <Button className="textSibar" icon={<FiDownload />} onClick={handleExportExcel}>
          Xuất Excel
        </Button>
      </div>

      {/* --- 2. DETAIL INPUT AREA (FORM) --- */}
      <Card
        size="small"
        title="Thông tin chi tiết sản phẩm"
        style={{ marginBottom: 10, borderColor: "#d9d9d9" }}
        headStyle={{ backgroundColor: "#e6f7ff", fontSize: 14, fontWeight: "bold", borderBottom: "1px solid #bae7ff" }}
      >
        <form onSubmit={handleSubmit(onSave)}>
          <Row gutter={[16, 8]}>
            {/* Hàng 1 */}
            <Col span={6}>
              <label className="ecus-label">Mã sản phẩm <span style={{color: 'red'}}>*</span></label>
              <Controller
                name="productCode"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field} 
                    id="input-product-code"
                    placeholder="Nhập mã quản lý" 
                    style={{ fontWeight: "bold" }}
                  />
                )}
              />
            </Col>
            <Col span={12}>
              <label className="ecus-label">Tên sản phẩm <span style={{color: 'red'}}>*</span></label>
              <Controller
                name="productName"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Tên thương mại" />}
              />
            </Col>
            <Col span={6}>
              <label className="ecus-label">Mã HS <span style={{color: 'red'}}>*</span></label>
              <Controller
                name="hsCode"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Tra cứu biểu thuế" />}
              />
            </Col>

            {/* Hàng 2 */}
            <Col span={6}>
              <label className="ecus-label">Đơn vị tính <span style={{color: 'red'}}>*</span></label>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Chọn ĐVT"
                    optionFilterProp="children"
                  >
                    {UNITS.map((u) => (
                      <Option key={u.value} value={u.value}>
                        {u.value} - {u.label}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </Col>
            <Col span={6}>
              <label className="ecus-label">Đơn giá gia công</label>
              <Controller
                name="unitPrice"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    style={{ width: "100%" }}
                    min={0}
                    precision={4}
                  />
                )}
              />
            </Col>
            <Col span={6}>
              <label className="ecus-label">Mã SP đối tác</label>
              <Controller
                name="partnerCode"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Tham chiếu bên nước ngoài" />}
              />
            </Col>
            
            {/* Hàng 3 - Ghi chú (Full width) */}
            <Col span={24}>
              <label className="ecus-label">Ghi chú</label>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => <TextArea {...field} rows={2} />}
              />
            </Col>
          </Row>
        </form>
      </Card>

      {/* --- 3. DATA GRID VIEW --- */}
      <div className="grid-container">
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          size="small"
          bordered
          
          pagination={paginationConfig} 

          scroll={{ y: 300 }}
          rowClassName={(record) =>
            record.id === selectedRowId ? "ant-table-row-selected" : ""
          }
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>

      <style>{`
        .ecus-label {
          display: block;
          font-weight: 600;
          font-size: 13px;
          margin-bottom: 4px;
          color: #333;
        }
        .ant-table-row-selected {
          background-color: #e6f7ff !important;
        }
        .ant-table-small .ant-table-thead > tr > th {
          background-color: #fafafa;
          font-weight: bold;
        }
        .ant-card-small > .ant-card-body {
          padding: 12px;
        }
        .ant-pagination-total-text {
          margin-right: 12px !important; /* Khoảng cách giữa text tổng và nút trang */
        }
        .ant-pagination-item, .ant-pagination-prev, .ant-pagination-next {
          border-radius: 2px !important; /* Bo góc vuông hơn */
        }
      `}</style>
    </div>
  );
}