import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Row, Col, Input, DatePicker, Button, Divider, Table, Tabs, Select, Space, Card, Tag
} from "antd";
import { 
  FiSave, FiSend, FiPlus, FiTrash2, FiFileText, FiDownload, FiLayers, FiPackage 
} from "react-icons/fi";
import useNotify from "@/components/notification/useNotify";
<<<<<<< HEAD
// import { CONTRACT_APPENDIX_DEFAULT } from "../types"; // Giả định import
=======
import { INVOICE_DEFAULT } from "../types";
import dayjs from "dayjs";
import "../css/invoice.css";
<<<<<<< HEAD
=======
>>>>>>> 9c85ef33442b0295486bafafeb41df96be558f9b
>>>>>>> 4aabc03211034d5d05ec78cb1ad486315c90a84d

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

<<<<<<< HEAD
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
=======
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* 1. THANH TIÊU ĐỀ & CÔNG CỤ (TOP TOOLBAR) */}
      <div style={{ background: "#f0f2f5", padding: "8px 16px", borderBottom: "1px solid #d9d9d9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Space size="small">
            <Typography.Title level={5} style={{ margin: 0, marginRight: 16, color: "#003a8c" }}>
                <FiEdit style={{ marginRight: 8 }}/> CẬP NHẬT HÓA ĐƠN
            </Typography.Title>
            <Button className="textSibar" size="small" icon={<FiPlus />} onClick={() => { /* Logic reset form */ }}>Thêm mới</Button>
            <Button className="textSibar" size="small" icon={<FiEdit />}>Sửa</Button>
            <Button size="small" type="primary" icon={<FiSave />} onClick={handleSubmit(onSave)}>Ghi lại</Button>
            <Button size="small" danger icon={<FiTrash2 />}>Xóa</Button>
            <Divider type="vertical" />
            <Button className="textSibar" size="small" icon={<FiUpload />}>Nhập từ Excel</Button>
        </Space>
        <Button className="textSibar" size="small" icon={<FiX />}>Thoát</Button>
      </div>

      {/* 2. KHUNG THÔNG TIN CHUNG (GENERAL INFORMATION) */}
      <div style={{ padding: 12, background: "#fff", flexShrink: 0 }}>
        <Row gutter={24}>
            {/* Cột trái: Thông tin HĐ & Invoice */}
            <Col span={10}>
                <div style={groupHeaderStyle}>Thông tin Hóa đơn & Hợp đồng</div>
                <Row gutter={[8, 8]}>
                    <Col span={12}>
                        <label style={labelStyle}>Số hợp đồng</label>
                        <Select 
                            size="small" 
                            style={{ width: "100%" }} 
                            placeholder="-- Chọn hợp đồng --"
                            onChange={(v) => setValue("contractNumber", v)}
                            options={[
                                {value: 'HD001', label: 'HD001 - Gia công ABC'},
                                {value: 'HD002', label: 'HD002 - SXXK XYZ'},
                            ]}
                        />
                    </Col>
                    <Col span={12}>
                        <label style={labelStyle}>Số hóa đơn (*)</label>
                        <Input size="small" {...register("invoiceNumber", { required: true })} />
                    </Col>
                    <Col span={12}>
                        <label style={labelStyle}>Ngày hóa đơn</label>
                        <DatePicker size="small" style={{ width: "100%" }} onChange={(d) => setValue("invoiceDate", d)} format="DD/MM/YYYY" />
                    </Col>
                    <Col span={12}>
                        <label style={labelStyle}>Phân loại</label>
                        <Radio.Group size="small" defaultValue="IMPORT" onChange={(e) => setValue("type", e.target.value)}>
                            <Radio value="IMPORT">HĐ Nhập khẩu</Radio>
                            <Radio value="EXPORT">HĐ Xuất khẩu</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
            </Col>

            {/* Cột phải: Thông tin Đối tác & Thanh toán */}
            <Col span={14}>
                <div style={groupHeaderStyle}>Đối tác & Thanh toán</div>
                <Row gutter={[8, 8]}>
                    <Col span={6}>
                        <label style={labelStyle}>Mã đối tác</label>
                        <Input.Search size="small" placeholder="Mã ĐT" onSearch={() => setValue("partnerName", "CÔNG TY SAMSUNG ELECTRONICS")} />
                    </Col>
                    <Col span={18}>
                        <label style={labelStyle}>Tên đối tác</label>
                        <Input size="small" readOnly style={{ background: "#f5f5f5" }} {...register("partnerName")} />
                    </Col>
                    <Col span={6}>
                        <label style={labelStyle}>Điều kiện giá</label>
                        <Select size="small" style={{ width: "100%" }} defaultValue="CIF" onChange={(v) => setValue("incoterm", v)}>
                            <Select.Option value="CIF">CIF</Select.Option>
                            <Select.Option value="FOB">FOB</Select.Option>
                            <Select.Option value="EXW">EXW</Select.Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <label style={labelStyle}>Đồng tiền</label>
                        <Select size="small" style={{ width: "100%" }} defaultValue="USD" onChange={(v) => setValue("currency", v)}>
                            <Select.Option value="USD">USD</Select.Option>
                            <Select.Option value="EUR">EUR</Select.Option>
                            <Select.Option value="JPY">JPY</Select.Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <label style={labelStyle}>Thanh toán</label>
                        <Select size="small" style={{ width: "100%" }} defaultValue="TTR" onChange={(v) => setValue("paymentMethod", v)}>
                            <Select.Option value="TTR">TTR</Select.Option>
                            <Select.Option value="LC">L/C</Select.Option>
                            <Select.Option value="KC">KC</Select.Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <label style={labelStyle}>Tổng trị giá</label>
                        <InputNumber 
                            size="small" 
                            style={{ width: "100%", fontWeight: "bold", color: "blue" }} 
                            readOnly
                            value={watch("totalAmount")}
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
      </div>

      <Divider style={{ margin: "0" }} />

      {/* 3. KHUNG CHI TIẾT HÀNG HÓA (PRODUCT DETAILS - DATA GRID) */}
      <div style={{ flex: 1, padding: 12, background: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 8 }}>
            <Button className="textSibar" type="dashed" size="small" icon={<FiPlus />} onClick={addItem}>Thêm dòng hàng</Button>
            <span style={{ marginLeft: 12, fontStyle: "italic", color: "#888", fontSize: 12 }}>Nhấn 'Thêm dòng hàng' để bắt đầu nhập liệu chi tiết.</span>
>>>>>>> 9c85ef33442b0295486bafafeb41df96be558f9b
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