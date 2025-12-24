import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Table,
  Select,
  InputNumber,
  Radio,
  Space,
  Card,
  Divider,
  Typography
} from "antd";
import {
  FiSave,
  FiEdit,
  FiPlus,
  FiTrash2,
  FiUpload,
  FiX,
  FiCheckCircle
} from "react-icons/fi";
import { useState, useEffect } from "react";
import useNotify from "@/components/notification/useNotify";
import { INVOICE_DEFAULT } from "../types";
import dayjs from "dayjs";
import "../css/invoice.css";

const { Text } = Typography;

export default function ContractInvoiceForm() {
  const notify = useNotify();
  const { register, handleSubmit, setValue, watch, control } = useForm({
    defaultValues: INVOICE_DEFAULT,
  });

  const [items, setItems] = useState([]);
  
  // Watch values để tính toán real-time
  const watchCurrency = watch("currency");

  // --- LOGIC TÍNH TOÁN ---
  const calculateTotal = (currentItems) => {
    const total = currentItems.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
    setValue("totalAmount", total);
    return total;
  };

  const handleLineChange = (id, field, value) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Tự động tính Thành tiền = SL * ĐG
        if (field === "quantity" || field === "unitPrice") {
          updatedItem.totalAmount = (updatedItem.quantity || 0) * (updatedItem.unitPrice || 0);
        }
        return updatedItem;
      }
      return item;
    });
    setItems(newItems);
    calculateTotal(newItems);
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      stt: items.length + 1,
      code: "",
      name: "",
      unit: "PCE",
      currency: watchCurrency || "USD",
      quantity: 0,
      unitPrice: 0,
      totalAmount: 0,
      origin: ""
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    const newItems = items.filter(i => i.id !== id);
    setItems(newItems);
    calculateTotal(newItems);
  };

  const onSave = (data) => {
    const payload = { ...data, items };
    console.log("Lưu Hóa đơn:", payload);
    notify.success("Đã ghi lại thông tin hóa đơn thành công!");
  };

  // --- COLUMNS CHO GRID (Mật độ cao) ---
  const columns = [
    { title: "STT", dataIndex: "stt", width: 50, align: "center", render: (t, r, i) => i + 1 },
    { 
      title: "Mã hàng", 
      dataIndex: "code", 
      width: 120,
      render: (text, record) => (
        <Input 
          size="small" 
          value={text} 
          placeholder="Chọn mã"
          onChange={(e) => handleLineChange(record.id, "code", e.target.value)} 
        />
      )
    },
    { 
      title: "Tên hàng hóa", 
      dataIndex: "name", 
      width: 250,
      render: (text, record) => (
        <Input 
          size="small" 
          value={text} 
          onChange={(e) => handleLineChange(record.id, "name", e.target.value)} 
        />
      )
    },
    { 
      title: "ĐVT", 
      dataIndex: "unit", 
      width: 70,
      render: (text, record) => (
        <Select 
            size="small" 
            value={text} 
            style={{ width: "100%" }}
            onChange={(v) => handleLineChange(record.id, "unit", v)}
            options={[{value:'PCE', label:'Cái'}, {value:'KGM', label:'Kg'}]}
        />
      )
    },
    { 
      title: "Nguyên tệ", 
      dataIndex: "currency", 
      width: 80,
      render: (text) => <Text strong style={{ fontSize: 12 }}>{text}</Text>
    },
    { 
      title: "Số lượng", 
      dataIndex: "quantity", 
      width: 100,
      render: (val, record) => (
        <InputNumber 
          size="small" 
          min={0}
          style={{ width: "100%" }}
          value={val}
          onChange={(v) => handleLineChange(record.id, "quantity", v)}
        />
      )
    },
    { 
      title: "Đơn giá", 
      dataIndex: "unitPrice", 
      width: 120,
      render: (val, record) => (
        <InputNumber 
          size="small" 
          min={0}
          style={{ width: "100%" }}
          value={val}
          onChange={(v) => handleLineChange(record.id, "unitPrice", v)}
        />
      )
    },
    { 
      title: "Trị giá", 
      dataIndex: "totalAmount", 
      width: 120,
      render: (val) => (
        <InputNumber 
            size="small" 
            readOnly 
            value={val} 
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            style={{ width: "100%", background: "#f5f5f5", color: "#000" }} 
        />
      )
    },
    { 
      title: "Xuất xứ", 
      dataIndex: "origin", 
      width: 80,
      render: (text, record) => (
        <Input 
          size="small" 
          value={text} 
          onChange={(e) => handleLineChange(record.id, "origin", e.target.value)} 
        />
      )
    },
    {
        title: "",
        width: 40,
        render: (_, record) => (
            <FiTrash2 
                className="text-red-500 cursor-pointer" 
                onClick={() => removeItem(record.id)} 
            />
        )
    }
  ];

  // --- STYLES ---
  const labelStyle = { fontWeight: 600, fontSize: "13px", marginBottom: 2, display: "block", color: "#444" };
  const groupHeaderStyle = { background: "#e6f7ff", padding: "4px 8px", fontWeight: "bold", borderBottom: "1px solid #1890ff", color: "#0050b3", marginBottom: 8 };

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
        </div>
        
        <div style={{ flex: 1, overflow: "auto", border: "1px solid #f0f0f0" }}>
            <Table
                columns={columns}
                dataSource={items}
                rowKey="id"
                size="small"
                pagination={false}
                bordered
                scroll={{ y: 350 }} // Cố định chiều cao scroll
                summary={(pageData) => {
                    let total = 0;
                    pageData.forEach(({ totalAmount }) => { total += totalAmount; });
                    return (
                        <Table.Summary.Row style={{ background: "#fafafa" }}>
                            <Table.Summary.Cell index={0} colSpan={7} align="right">
                                <Text strong>TỔNG CỘNG:</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}>
                                <Text strong type="danger">{total.toLocaleString()} {watch("currency")}</Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={2} colSpan={2} />
                        </Table.Summary.Row>
                    );
                }}
            />
        </div>
      </div>

      {/* 4. THANH TRẠNG THÁI (STATUS BAR) */}
      <div style={{ background: "#001529", color: "white", padding: "4px 12px", fontSize: "12px", display: "flex", justifyContent: "space-between" }}>
         <Space>
            <FiCheckCircle style={{ color: "#52c41a" }} /> 
            <span>Sẵn sàng.</span>
            <Divider type="vertical" style={{ borderColor: "#fff", opacity: 0.3 }} />
            <span>Chế độ: Thêm mới</span>
         </Space>
         <Space size="large">
            <span>Tổng số dòng: <strong>{items.length}</strong></span>
            <span>Tổng tiền: <strong>{watch("totalAmount")?.toLocaleString()} {watch("currency")}</strong></span>
         </Space>
      </div>
    </div>
  );
}