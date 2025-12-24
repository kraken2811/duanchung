import { useState } from "react";
import { Row, Col, Input, Button, Table, Select, InputNumber, Space, message } from "antd";
import { FiPlus, FiTrash2, FiSave, FiEdit } from "react-icons/fi";
const { TextArea } = Input;

const COUNTRY_OPTIONS = [
  { value: "VN", label: "Việt Nam (VN)" },
  { value: "CN", label: "Trung Quốc (CN)" },
  { value: "US", label: "Hoa Kỳ (US)" },
  { value: "JP", label: "Nhật Bản (JP)" },
  { value: "KR", label: "Hàn Quốc (KR)" },
  { value: "TW", label: "Đài Loan (TW)" },
  { value: "TH", label: "Thái Lan (TH)" },
  { value: "SG", label: "Singapore (SG)" },
  { value: "EU", label: "Châu Âu (EU)" },
  { value: "UN", label: "Không xác định (UN)" },
];

export default function GoodsList({ goods, setGoods }) {
  const [editingItem, setEditingItem] = useState(null);

  // 1. Thêm hàng mới
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

  // 2. Xóa hàng
  const removeGoods = (id, e) => {
    e.stopPropagation();
    const newGoods = goods.filter((g) => g.id !== id);
    setGoods(newGoods);
    if (editingItem && editingItem.id === id) {
      setEditingItem(null);
    }
  };

  // 3. Chọn hàng để sửa
  const onEditGood = (record) => {
    setEditingItem({ ...record });
  };

  // 4. Xử lý thay đổi dữ liệu trong form edit
  const handleDetailChange = (field, value) => {
    setEditingItem((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "quantity" || field === "unitPrice") {
        updated.totalValue = (updated.quantity || 0) * (updated.unitPrice || 0);
      }
      return updated;
    });
  };

  // 5. Lưu lại chi tiết vào danh sách chính
  const saveGoodDetail = () => {
    if (!editingItem) return;
    const updatedGoods = goods.map((item) =>
      item.id === editingItem.id ? editingItem : item
    );
    setGoods(updatedGoods);
    message.success("Đã cập nhật chi tiết hàng hóa");
  };

  const goodsColumns = [
    { title: "STT", dataIndex: "index", width: 50, align: "center" },
    { title: "Tên hàng", dataIndex: "description", width: 250, ellipsis: true },
    { title: "Mã HS", dataIndex: "hsCode", width: 100 },
    { title: "Xuất xứ", dataIndex: "origin", width: 80, align: "center" },
    { title: "Số lượng", dataIndex: "quantity", width: 100, align: "right" },
    { title: "Đơn vị", dataIndex: "unit", width: 80, align: "center" },
    { title: "Đơn giá", dataIndex: "unitPrice", width: 120, align: "right", render: (val) => val ? val.toLocaleString() : 0 },
    { title: "Trị giá", dataIndex: "totalValue", width: 120, align: "right", render: (val) => val ? val.toLocaleString() : 0 },
    {
      title: "Thao tác",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <FiEdit style={{ cursor: "pointer", color: "#1677ff", fontSize: 16 }} onClick={(e) => { e.stopPropagation(); onEditGood(record); }} title="Sửa" />
          <FiTrash2 style={{ cursor: "pointer", color: "red", fontSize: 16 }} onClick={(e) => removeGoods(record.id, e)} title="Xóa" />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button className="textSibar" type="dashed" icon={<FiPlus />} onClick={addGoods}>
          Thêm hàng hóa
        </Button>
      </Space>

      <Table
        columns={goodsColumns}
        dataSource={goods}
        rowKey="id"
        pagination={false}
        bordered
        size="small"
        onRow={(record) => ({
          onClick: () => onEditGood(record),
          style: { cursor: "pointer", background: editingItem?.id === record.id ? "#e6f7ff" : "inherit" }
        })}
      />

      {editingItem && (
        <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: 8, border: "1px solid #d9d9d9", marginTop: 20 }}>
          <Row gutter={16}>
            <Col span={8}>
              <label>Mã số hàng hóa (HS Code) *</label>
              <Input value={editingItem.hsCode} onChange={(e) => handleDetailChange("hsCode", e.target.value)} placeholder="8 hoặc 10 số" />
            </Col>
            <Col span={8}>
              <label>Xuất xứ (Origin) *</label>
              <Select
                style={{ width: "100%" }}
                placeholder="Chọn nước"
                value={editingItem.origin}
                onChange={(value) => handleDetailChange("origin", value)}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={COUNTRY_OPTIONS}
              />
            </Col>
            <Col span={8}>
              <label>Mã quản lý riêng</label>
              <Input placeholder="Nếu có" />
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: 12 }}>
            <Col span={6}>
              <label>Số lượng *</label>
              <InputNumber style={{ width: "100%" }} value={editingItem.quantity} onChange={(v) => handleDetailChange("quantity", v)} />
            </Col>
            <Col span={6}>
              <label>Đơn vị tính</label>
              <Select style={{ width: "100%" }} value={editingItem.unit} onChange={(v) => handleDetailChange("unit", v)}>
                <Select.Option value="PCE">Cái (PCE)</Select.Option>
                <Select.Option value="KGM">Kg (KGM)</Select.Option>
                <Select.Option value="SET">Bộ (SET)</Select.Option>
              </Select>
            </Col>
            <Col span={6}>
              <label>Đơn giá hóa đơn</label>
              <InputNumber style={{ width: "100%" }} value={editingItem.unitPrice} onChange={(v) => handleDetailChange("unitPrice", v)} />
            </Col>
            <Col span={6}>
              <label>Trị giá hóa đơn</label>
              <InputNumber style={{ width: "100%" }} disabled value={editingItem.totalValue} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: 12 }}>
            <Col span={8}>
              <label>Thuế suất NK (%)</label>
              <InputNumber style={{ width: "100%" }} value={editingItem.taxRate} onChange={(v) => handleDetailChange("taxRate", v)} />
            </Col>
            <Col span={8}>
              <label>Thuế suất VAT (%)</label>
              <InputNumber style={{ width: "100%" }} value={editingItem.vatRate} onChange={(v) => handleDetailChange("vatRate", v)} />
            </Col>
            <Col span={8}>
              <label>Mã miễn/giảm thuế</label>
              <Input placeholder="Nếu có" />
            </Col>
          </Row>
          
          <Row gutter={16} style={{ marginTop: 12 }}>
            <Col span={24}>
              <label style={{ fontWeight: 600 }}>Mô tả hàng hóa *</label>
              <TextArea rows={3} value={editingItem.description} onChange={(e) => handleDetailChange("description", e.target.value)} placeholder="Mô tả chi tiết hàng hóa bằng tiếng Việt..." />
            </Col>
          </Row>

          <Row justify="end" style={{ marginTop: 20 }}>
            <Space>
               <Button onClick={() => setEditingItem(null)}>Đóng</Button>
               <Button type="primary" icon={<FiSave />} onClick={saveGoodDetail} style={{ minWidth: 120 }}>
                  Lưu
               </Button>
            </Space>
          </Row>
        </div>
      )}
    </div>
  );
}