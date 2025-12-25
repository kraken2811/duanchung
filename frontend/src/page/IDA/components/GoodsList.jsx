import React, { useState } from "react";
import { Row, Col, Input, Button, Table, Select, InputNumber, Space, message, Tag, Typography, Card } from "antd";
import { FiPlus, FiTrash2, FiSave, FiEdit, FiBox } from "react-icons/fi";

const { TextArea } = Input;
const { Text } = Typography;

const COUNTRY_OPTIONS = [
  { value: "VN", label: "Việt Nam (VN)" },
  { value: "CN", label: "Trung Quốc (CN)" },
  { value: "US", label: "Hoa Kỳ (US)" },
  { value: "JP", label: "Nhật Bản (JP)" },
  { value: "KR", label: "Hàn Quốc (KR)" },
  { value: "TW", label: "Đài Loan (TW)" },
  // ... thêm các nước khác
];

// Hàm format tiền tệ tái sử dụng
const formatCurrency = (value) => {
  if (!value) return "0";
  return new Intl.NumberFormat('en-US').format(value);
};

export default function GoodsList({ goods, setGoods }) {
  const [editingItem, setEditingItem] = useState(null);

  // ... (Giữ nguyên các hàm logic: addGoods, removeGoods, handleDetailChange, saveGoodDetail)
   const addGoods = () => {
    const newItem = {
      id: Date.now(),
      index: goods.length + 1,
      description: "",
      hsCode: "",
      origin: "CN",
      quantity: 0,
      unit: "PCE",
      unitPrice: 0,
      totalValue: 0,
      taxRate: 0,
      vatRate: 0,
    };
    setGoods([...goods, newItem]);
    setEditingItem(newItem);
  };

  const removeGoods = (id, e) => {
    e.stopPropagation();
    const newGoods = goods.filter((g) => g.id !== id);
    setGoods(newGoods);
    if (editingItem && editingItem.id === id) {
      setEditingItem(null);
    }
  };

  const onEditGood = (record) => {
    setEditingItem({ ...record });
  };

  const handleDetailChange = (field, value) => {
    setEditingItem((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "quantity" || field === "unitPrice") {
        updated.totalValue = (updated.quantity || 0) * (updated.unitPrice || 0);
      }
      return updated;
    });
  };

  const saveGoodDetail = () => {
    if (!editingItem) return;
    const updatedGoods = goods.map((item) =>
      item.id === editingItem.id ? editingItem : item
    );
    setGoods(updatedGoods);
    message.success("Đã cập nhật chi tiết hàng hóa");
    // Có thể setEditingItem(null) nếu muốn đóng form sau khi lưu
  };


  // --- CẤU HÌNH CỘT CHUẨN MỰC ---
  const goodsColumns = [
    { 
      title: "STT", 
      dataIndex: "index", 
      width: 60, 
      align: "center",
      render: (val) => <span style={{ color: "#9ca3af" }}>{val}</span> 
    },
    { 
      title: "MÔ TẢ HÀNG HÓA", // Uppercase Header
      dataIndex: "description", 
      ellipsis: true,
      render: (text) => (
        <span style={{ fontWeight: 500, color: "#1f2937" }}>
            {text || <i style={{color:'#d1d5db'}}>Chưa nhập tên hàng...</i>}
        </span>
      )
    },
    { 
      title: "HS CODE", 
      dataIndex: "hsCode", 
      width: 120,
      align: "center",
      render: (code) => code ? <Tag color="blue" style={{ fontFamily: 'monospace' }}>{code}</Tag> : "-"
    },
    { 
      title: "XUẤT XỨ", 
      dataIndex: "origin", 
      width: 100, 
      align: "center",
      render: (origin) => origin ? <Tag bordered={false}>{origin}</Tag> : "-"
    },
    { 
      title: "SỐ LƯỢNG", 
      dataIndex: "quantity", 
      width: 120, 
      align: "right", // Số lượng căn phải
      render: (val) => formatCurrency(val)
    },
    { 
      title: "ĐVT", 
      dataIndex: "unit", 
      width: 80, 
      align: "center" 
    },
    { 
      title: "ĐƠN GIÁ", 
      dataIndex: "unitPrice", 
      width: 140, 
      align: "right", 
      render: (val) => <span style={{ color: "#6b7280" }}>{formatCurrency(val)}</span> // Màu nhạt hơn chút
    },
    { 
      title: "TRỊ GIÁ", 
      dataIndex: "totalValue", 
      width: 150, 
      align: "right", 
      render: (val) => <Text strong>{formatCurrency(val)}</Text> // In đậm vì là tổng tiền
    },
    {
      title: "TÁC VỤ",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space size="small">
            {/* Nút sửa icon nhỏ gọn */}
          <Button 
            type="text" 
            size="small" 
            icon={<FiEdit size={16} />} 
            className="text-blue-600"
            onClick={(e) => { e.stopPropagation(); onEditGood(record); }} 
          />
          <Button 
            type="text" 
            size="small" 
            danger 
            icon={<FiTrash2 size={16} />} 
            onClick={(e) => removeGoods(record.id, e)} 
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <Button type="primary" ghost icon={<FiPlus />} onClick={addGoods}>
          Thêm
        </Button>
      </div>

      <Table
        className="custom-table" // Áp dụng CSS
        columns={goodsColumns}
        dataSource={goods}
        rowKey="id"
        pagination={false}
        bordered={false} // Tắt border mặc định
        size="middle"
        // Logic để highlight dòng đang chọn
        rowClassName={(record) => (editingItem?.id === record.id ? "ant-table-row-selected" : "")}
        onRow={(record) => ({
          onClick: () => onEditGood(record),
          style: { cursor: "pointer" }
        })}
      />

      {/* FORM SỬA CHI TIẾT */}
      {editingItem && (
        <Card 
            title={<span><FiEdit style={{ marginRight: 8 }}/> Chi tiết: {editingItem.description || "Hàng mới"}</span>}
            size="small"
            style={{ marginTop: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
            bodyStyle={{ padding: 24 }}
            bordered={false}
        >
          <Row gutter={[24, 16]}> {/* Tăng gutter để thoáng form */}
            <Col span={8}>
              <label style={{display: 'block', marginBottom: 6, fontWeight: 500}}>Mã HS Code <span style={{color:'red'}}>*</span></label>
              <Input value={editingItem.hsCode} onChange={(e) => handleDetailChange("hsCode", e.target.value)} placeholder="Nhập mã HS..." />
            </Col>
            <Col span={8}>
              <label style={{display: 'block', marginBottom: 6, fontWeight: 500}}>Xuất xứ <span style={{color:'red'}}>*</span></label>
              <Select
                style={{ width: "100%" }}
                placeholder="Chọn nước"
                value={editingItem.origin}
                onChange={(value) => handleDetailChange("origin", value)}
                showSearch
                options={COUNTRY_OPTIONS}
              />
            </Col>
            <Col span={8}>
              <label style={{display: 'block', marginBottom: 6, fontWeight: 500}}>Mã quản lý riêng</label>
              <Input placeholder="-- Không có --" />
            </Col>

            <Col span={24}><div style={{borderBottom: '1px dashed #e5e7eb', margin: '8px 0'}}></div></Col>

            <Col span={6}>
              <label style={{display: 'block', marginBottom: 6, fontWeight: 500}}>Số lượng <span style={{color:'red'}}>*</span></label>
              <InputNumber style={{ width: "100%" }} value={editingItem.quantity} onChange={(v) => handleDetailChange("quantity", v)} />
            </Col>
            <Col span={6}>
              <label style={{display: 'block', marginBottom: 6, fontWeight: 500}}>Đơn vị tính</label>
              <Select style={{ width: "100%" }} value={editingItem.unit} onChange={(v) => handleDetailChange("unit", v)}>
                <Select.Option value="PCE">Cái (PCE)</Select.Option>
                <Select.Option value="KGM">Kg (KGM)</Select.Option>
                <Select.Option value="SET">Bộ (SET)</Select.Option>
              </Select>
            </Col>
            <Col span={6}>
              <label style={{display: 'block', marginBottom: 6, fontWeight: 500}}>Đơn giá hóa đơn</label>
              <InputNumber 
                style={{ width: "100%" }} 
                value={editingItem.unitPrice} 
                onChange={(v) => handleDetailChange("unitPrice", v)}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              />
            </Col>
            <Col span={6}>
              <label style={{display: 'block', marginBottom: 6, fontWeight: 500}}>Thành tiền (Auto)</label>
              <InputNumber 
                style={{ width: "100%", background: "#f3f4f6", color: "#111" }} 
                disabled 
                value={editingItem.totalValue} 
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
              />
            </Col>

            <Col span={24}>
              <label style={{display: 'block', marginBottom: 6, fontWeight: 500}}>Mô tả hàng hóa <span style={{color:'red'}}>*</span></label>
              <TextArea rows={3} value={editingItem.description} onChange={(e) => handleDetailChange("description", e.target.value)} placeholder="Mô tả chi tiết..." />
            </Col>
          </Row>

          <Row justify="end" style={{ marginTop: 24, gap: 12 }}>
                <Button onClick={() => setEditingItem(null)}>Đóng</Button>
                <Button type="primary" icon={<FiSave />} onClick={saveGoodDetail}>
                  Lưu thay đổi
                </Button>
          </Row>
        </Card>
      )}
    </div>
  );
}