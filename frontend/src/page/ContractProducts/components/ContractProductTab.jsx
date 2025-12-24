import React, { useState } from "react";
import { 
  Card, Tabs, Button, Space, Divider, Row, Col, Input, DatePicker, Tag, Table, Select 
} from "antd";
import { 
  FiSave, FiSend, FiPrinter, FiBox, FiPlus, FiTrash2, FiFileText, FiDownload, FiSearch 
} from "react-icons/fi";

export default function ContractProductPage() {
  const [activeTab, setActiveTab] = useState("1");
  
  // 1. STATE QUẢN LÝ DỮ LIỆU SẢN PHẨM
  const [products, setProducts] = useState([
    { id: 1, code: "SP-001", name: "Áo sơ mi nam", hsCode: "620520", unit: "PCE", price: 2.5, currency: "USD" },
    { id: 2, code: "SP-002", name: "Quần âu nữ", hsCode: "620462", unit: "PCE", price: 3.0, currency: "USD" },
  ]);

  // 2. HÀM XỬ LÝ (Actions)
  const handleDelete = (id) => {
    setProducts(products.filter(item => item.id !== id));
  };

  const handleAddRow = () => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newRow = { 
      id: newId, 
      code: `SP-NEW-${newId}`, 
      name: "Sản phẩm mới...", 
      hsCode: "", 
      unit: "PCE", 
      price: 0, 
      currency: "USD" 
    };
    setProducts([...products, newRow]);
  };

  // 3. ĐỊNH NGHĨA CỘT CHO BẢNG SẢN PHẨM
  const productColumns = [
    { 
      title: "STT", 
      key: "stt", 
      width: 50, 
      align: "center",
      render: (_, __, index) => index + 1 
    },
    { 
      title: "Mã sản phẩm", 
      dataIndex: "code", 
      width: 150,
      render: (text) => <span style={{ fontWeight: 500, color: '#1677ff' }}>{text}</span>
    },
    { 
      title: "Tên sản phẩm", 
      dataIndex: "name", 
      width: 250 
    },
    { 
      title: "HS Code", 
      dataIndex: "hsCode", 
      width: 100, 
      align: "center" 
    },
    { 
      title: "ĐVT", 
      dataIndex: "unit", 
      width: 80, 
      align: "center" 
    },
    { 
      title: "Đơn giá GC", 
      dataIndex: "price", 
      width: 120, 
      align: "right",
      render: (val) => val ? val.toFixed(2) : '0.00'
    },
    { 
      title: "Loại tiền", 
      dataIndex: "currency", 
      width: 80, 
      align: "center" 
    },
    {
      title: "Tác vụ",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Space>
           {/* Giả lập nút sửa */}
           {/* <FiEdit3 style={{ color: '#faad14', cursor: 'pointer' }} /> */}
           <FiTrash2 
             style={{ color: '#ff4d4f', cursor: 'pointer' }} 
             onClick={() => handleDelete(record.id)} 
           />
        </Space>
      ),
    },
  ];

  // 4. NỘI DUNG TAB SẢN PHẨM
  const renderProductTabContent = () => (
    <div style={{ padding: 16 }}>
      {/* Thanh công cụ của bảng */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Space>
          <Button type="primary" ghost icon={<FiPlus />} onClick={handleAddRow}>
            Thêm dòng
          </Button>
          <Button icon={<FiFileText />}>Nhập Excel</Button>
          <Button icon={<FiDownload />}>Tải mẫu</Button>
        </Space>
        
        <Space>
            <Input prefix={<FiSearch />} placeholder="Tìm kiếm mã/tên SP..." style={{ width: 200 }} />
        </Space>
      </div>

      {/* Bảng dữ liệu */}
      <Table 
        columns={productColumns} 
        dataSource={products} 
        rowKey="id" 
        size="small" 
        bordered 
        pagination={{ pageSize: 10 }}
        summary={(pageData) => {
            return (
                <Table.Summary fixed>
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={2}>
                            <strong>Tổng cộng:</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={6}>
                            <strong>{pageData.length} dòng hàng</strong>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                </Table.Summary>
            );
        }}
      />
    </div>
  );

  // Định nghĩa Tabs
  const items = [
    {
      key: "1",
      label: (
        <span>
          <FiBox style={{ marginRight: 8 }} /> Danh mục Sản phẩm
        </span>
      ),
      children: renderProductTabContent(),
    },
  ];

  return (
    <div>
      {/* 1. THANH CÔNG CỤ (TOOLBAR) */}
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
          <Button icon={<FiSave />}>Ghi lại</Button>
          <Button type="primary" icon={<FiSend />}>Khai báo</Button>
          <Divider type="vertical" />
          <Button icon={<FiPrinter />}>In danh sách</Button>
        </Space>
        <div>
            <Tag color="processing">Trạng thái: Đang nhập liệu</Tag>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <h2 style={{ textTransform: "uppercase", color: "#0050b3", marginBottom: 16 }}>
          Đăng ký sản phẩm hợp đồng gia công
        </h2>
        
        {/* 2. CARD THÔNG TIN CHUNG */}
        <Card 
            size="small" 
            title="Thông tin chung Hợp đồng" 
            style={{ marginBottom: 16 }}
            headStyle={{ backgroundColor: '#f5f5f5' }}
        >
           <Row gutter={16}>
              <Col span={6}>
                  <label style={{fontWeight: 500, display: 'block', marginBottom: 4}}>Số hợp đồng</label>
                  <Input defaultValue="HD-2023-GC01" readOnly style={{backgroundColor: '#fafafa', fontWeight: 'bold'}} />
              </Col>
              <Col span={8}>
                  <label style={{fontWeight: 500, display: 'block', marginBottom: 4}}>Đối tác thuê gia công</label>
                  <Select defaultValue="SS" style={{width: '100%'}} disabled>
                      <Select.Option value="SS">SAMSUNG ELECTRONICS</Select.Option>
                  </Select>
              </Col>
              <Col span={5}>
                  <label style={{fontWeight: 500, display: 'block', marginBottom: 4}}>Ngày ký kết</label>
                  <DatePicker style={{width: '100%'}} placeholder="01/01/2023" disabled />
              </Col>
              <Col span={5}>
                  <label style={{fontWeight: 500, display: 'block', marginBottom: 4}}>Ngày hết hạn</label>
                  <DatePicker style={{width: '100%'}} disabled />
              </Col>
           </Row>
        </Card>

        {/* 3. CARD CHI TIẾT (TABS CHỨA BẢNG) */}
        <Card bodyStyle={{ padding: 0 }} title="Chi tiết danh mục hàng hóa">
          <Tabs 
            activeKey={activeTab}
            onChange={setActiveTab}
            items={items} 
            type="card" 
            tabBarStyle={{ margin: 0, padding: "10px 10px 0 10px", background: "#fafafa" }}
            style={{ minHeight: 400 }}
          />
        </Card>
      </div>
    </div>
  );
}