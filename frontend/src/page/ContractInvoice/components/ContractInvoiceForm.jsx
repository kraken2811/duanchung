import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Row, Col, Input, DatePicker, Button, Divider, Table, Tabs, Select, Space, Card, Tag
} from "antd";
import { 
  FiSave, FiSend, FiPlus, FiTrash2, FiFileText, FiDownload, FiLayers, FiPackage 
} from "react-icons/fi";
import useNotify from "@/components/notification/useNotify";
// import { CONTRACT_APPENDIX_DEFAULT } from "../types"; // Giả định import

// Mock data default để code chạy được
const CONTRACT_APPENDIX_DEFAULT = {};

export default function ContractAppendixPage() {
  const notify = useNotify();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: CONTRACT_APPENDIX_DEFAULT,
  });

  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  // --- ACTIONS ---
  const removeMaterial = (id) => setMaterials(materials.filter((i) => i.id !== id));
  const removeProduct = (id) => setProducts(products.filter((i) => i.id !== id));

  const onSave = (data) => {
    console.log("Saving...", { ...data, materials, products });
    notify.success("Đã lưu Phụ lục hợp đồng");
  };

  const onDeclare = () => {
    notify.success("Đã gửi dữ liệu lên hệ thống VNACCS");
  };

  // --- COLUMNS ---
  const materialColumns = [
    { title: "STT", render: (_, __, index) => index + 1, width: 50, align: 'center' },
    { title: "Mã NPL", dataIndex: "code", width: 150 },
    { title: "Tên nguyên liệu", dataIndex: "name", width: 250 },
    { title: "HS Code", dataIndex: "hsCode", width: 100 },
    { title: "ĐVT", dataIndex: "unit", width: 80, align: 'center' },
    { title: "Xuất xứ", dataIndex: "origin", width: 100 },
    {
      title: "Tác vụ",
      width: 60,
      align: 'center',
      render: (_, record) => (
        <FiTrash2 style={{color: 'red', cursor: 'pointer'}} onClick={() => removeMaterial(record.id)} />
      ),
    },
  ];

  const productColumns = [
    { title: "STT", render: (_, __, index) => index + 1, width: 50, align: 'center' },
    { title: "Mã SP", dataIndex: "code", width: 150 },
    { title: "Tên sản phẩm", dataIndex: "name", width: 250 },
    { title: "Đơn giá GC", dataIndex: "processingPrice", width: 120, align: 'right' },
    {
      title: "Tác vụ",
      width: 60,
      align: 'center',
      render: (_, record) => (
        <FiTrash2 style={{color: 'red', cursor: 'pointer'}} onClick={() => removeProduct(record.id)} />
      ),
    },
  ];

  // --- TAB ITEMS ---
  const tabItems = [
    {
      key: "1",
      label: <span><FiLayers style={{marginRight: 8}}/>Nguyên phụ liệu (NPL)</span>,
      children: (
        <div style={{ padding: 16 }}>
          <Space style={{ marginBottom: 12 }}>
            <Button type="primary" ghost icon={<FiPlus />} onClick={() => {
                setMaterials([...materials, { id: Date.now(), code: 'NPL-NEW', name: 'Nguyên liệu mới' }]);
            }}>Thêm dòng</Button>
            <Button icon={<FiFileText />}>Nhập Excel</Button>
            <Button icon={<FiDownload />}>Tải mẫu</Button>
          </Space>
          <Table 
            columns={materialColumns} 
            dataSource={materials} 
            rowKey="id" 
            size="small" 
            bordered 
            pagination={{ pageSize: 5 }}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: <span><FiPackage style={{marginRight: 8}}/>Sản phẩm (SP)</span>,
      children: (
        <div style={{ padding: 16 }}>
            <Space style={{ marginBottom: 12 }}>
                <Button type="primary" ghost icon={<FiPlus />} onClick={() => {
                    setProducts([...products, { id: Date.now(), code: 'SP-NEW', name: 'Sản phẩm mới' }]);
                }}>Thêm dòng</Button>
                <Button icon={<FiFileText />}>Nhập Excel</Button>
            </Space>
            <Table 
                columns={productColumns} 
                dataSource={products} 
                rowKey="id" 
                size="small" 
                bordered 
            />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* 1. THANH CÔNG CỤ (TOOLBAR) - Giống hệt trang Sản phẩm */}
      <div
        style={{
          background: "#fff",
          padding: "12px 16px",
          borderBottom: "1px solid #d9d9d9",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Space>
          <Button icon={<FiSave />} onClick={handleSubmit(onSave)}>Ghi tạm</Button>
          <Button type="primary" icon={<FiSend />} onClick={handleSubmit(onDeclare)}>Khai báo (VNACCS)</Button>
          <Divider type="vertical" />
          <Button>Lấy từ Excel tổng hợp</Button>
        </Space>
        <div>
            <Button danger type="text">Xóa phụ lục này</Button>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <h2 style={{ textTransform: "uppercase", color: "#0050b3", marginBottom: 16 }}>
            Khai báo Phụ lục Hợp đồng
        </h2>

        {/* 2. CARD THÔNG TIN CHUNG - Cấu trúc giống trang Sản phẩm */}
        <Card 
            size="small" 
            title="Thông tin chung Phụ lục" 
            style={{ marginBottom: 16 }}
            headStyle={{ backgroundColor: '#f5f5f5' }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <label style={{fontWeight: 500, display: 'block', marginBottom: 4}}>Số hợp đồng gốc *</label>
              <Select 
                 showSearch
                 style={{ width: "100%" }} 
                 placeholder="Chọn hợp đồng..."
                 onChange={(v) => setValue("contractNumber", v)}
              >
                 <Select.Option value="HD001/2023">HD001/2023 - Cty ABC</Select.Option>
              </Select>
            </Col>
            <Col span={6}>
              <label style={{fontWeight: 500, display: 'block', marginBottom: 4}}>Số phụ lục *</label>
              <Input placeholder="Nhập số phụ lục" {...register("appendixNumber")} />
            </Col>
            <Col span={6}>
              <label style={{fontWeight: 500, display: 'block', marginBottom: 4}}>Ngày ký *</label>
              <DatePicker style={{ width: "100%" }} onChange={(d) => setValue("signedDate", d)} />
            </Col>
            <Col span={6}>
              <label style={{fontWeight: 500, display: 'block', marginBottom: 4}}>Ngày hiệu lực *</label>
              <DatePicker style={{ width: "100%" }} onChange={(d) => setValue("effectiveDate", d)} />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 12 }}>
             <Col span={6}>
                <label style={{fontWeight: 500, display: 'block', marginBottom: 4}}>Ngày hết hạn (Gia hạn)</label>
                <DatePicker style={{ width: "100%" }} onChange={(d) => setValue("expirationDate", d)} />
             </Col>
             <Col span={18}>
                <label style={{fontWeight: 500, display: 'block', marginBottom: 4}}>Ghi chú</label>
                <Input placeholder="Nội dung điều chỉnh..." {...register("notes")} />
             </Col>
          </Row>
        </Card>
        
        {/* 3. CARD CHI TIẾT (TABS) - Cấu trúc giống trang Sản phẩm */}
        <Card bodyStyle={{ padding: 0 }} title="Chi tiết danh mục hàng hóa">
            <Tabs 
                activeKey={activeTab} 
                items={tabItems} 
                onChange={setActiveTab} 
                type="card"
                tabBarStyle={{ margin: 0, padding: "10px 10px 0 10px", background: "#fafafa" }}
                style={{ minHeight: 400 }}
            />
        </Card>
      </div>
    </div>
  );
}