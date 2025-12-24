import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Row, Col, Input, DatePicker, Button, Table, Tabs, Select,
  Space, Card, Divider, Modal, Tag
} from "antd";
import {
  FiSave, FiSend, FiPlus, FiTrash2, FiUpload, FiPrinter, FiDownload, FiLayers, FiPackage
} from "react-icons/fi";
import useNotify from "@/components/notification/useNotify";
import { CONTRACT_DEFAULT, MATERIAL_DEFAULT, PRODUCT_DEFAULT, EQUIPMENT_DEFAULT } from "../types";
import { CONTRACT_RULES } from "../api/rule.api";
import { formatContractPayload } from "../utils/status"; // <--- Import hàm xử lý dữ liệu
import "../css/contract.css";

const { Option } = Select;

export default function UnifiedContractForm() {
  const notify = useNotify();

  // --- 1. STATE QUẢN LÝ ---
  // mode tương ứng với key của Tab: 'contract' hoặc 'appendix'
  const [mode, setMode] = useState("contract"); 

  // --- 2. KHỞI TẠO FORM ---
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      contractNumber: "",
      appendixNumber: "",
      signedDate: null,
      expirationDate: null,
      effectiveDate: null,
      partner: { name: "", address: "", countryCode: "" },
      currency: "USD",
      notes: "",
      baseContractId: null
    },
  });

  // Reset form khi chuyển Tab (chuyển chế độ)
  useEffect(() => {
    reset();
    setMaterials([]);
    setProducts([]);
    setEquipments([]);
  }, [mode, reset]);

  // --- 3. STATE DỮ LIỆU BẢNG ---
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [equipments, setEquipments] = useState([]);
  
  // State cho Tab con (Chi tiết hàng hóa)
  const [detailsTab, setDetailsTab] = useState("1"); 

  // --- 4. HÀM XỬ LÝ DỮ LIỆU LƯỚI (CRUD) ---
  const addItem = (type) => {
    const newItem = { id: Date.now(), code: "", name: "", hsCode: "", unit: "", origin: "", price: 0 };
    if (type === 'material') setMaterials([...materials, newItem]);
    if (type === 'product') setProducts([...products, newItem]);
    if (type === 'equipment') setEquipments([...equipments, newItem]);
  };

  const removeItem = (id, type) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa dòng này không?",
      onOk: () => {
        if (type === 'material') setMaterials(materials.filter(i => i.id !== id));
        if (type === 'product') setProducts(products.filter(i => i.id !== id));
        if (type === 'equipment') setEquipments(equipments.filter(i => i.id !== id));
      }
    });
  };

  // Render Input Inline
  const commonRenderInput = (text, record, field, listSetter, list) => (
    <Input
      value={text}
      size="small"
      bordered={false}
      style={{ borderBottom: "1px solid #d9d9d9", borderRadius: 0 }}
      onChange={e => {
        const newData = list.map(item => item.id === record.id ? { ...item, [field]: e.target.value } : item);
        listSetter(newData);
      }}
    />
  );

  // --- 5. ACTION BUTTONS ---
  const onSave = (data) => {
    const payload = {
      type: mode,
      info: data,
      details: { materials, products, equipments }
    };
    console.log(">>> SAVING PAYLOAD:", payload);
    notify.success(`Đã lưu ${mode === 'contract' ? 'Hợp đồng' : 'Phụ lục'} thành công!`);
  };

  const onDeclare = () => {
    if (materials.length === 0 && products.length === 0 && equipments.length === 0) {
      notify.error("Vui lòng nhập ít nhất một dòng hàng hóa");
      return;
    }
    notify.info("Đang gửi dữ liệu lên VNACCS...");
    setTimeout(() => notify.success("Khai báo thành công!"), 1000);
  };

  // --- 6. CẤU HÌNH CỘT ---
  const sharedColumns = (listSetter, list) => [
    { title: "STT", render: (_, __, i) => i + 1, width: 50, align: "center" },
    { title: "Mã hàng", dataIndex: "code", width: 150, render: (t, r) => commonRenderInput(t, r, 'code', listSetter, list) },
    { title: "Tên hàng hóa", dataIndex: "name", width: 250, render: (t, r) => commonRenderInput(t, r, 'name', listSetter, list) },
    { title: "HS Code", dataIndex: "hsCode", width: 100, render: (t, r) => commonRenderInput(t, r, 'hsCode', listSetter, list) },
    { title: "ĐVT", dataIndex: "unit", width: 80, render: (t, r) => commonRenderInput(t, r, 'unit', listSetter, list) },
  ];

  const materialColumns = [
    ...sharedColumns(setMaterials, materials),
    { title: "Xuất xứ", dataIndex: "origin", width: 100, render: (t, r) => commonRenderInput(t, r, 'origin', setMaterials, materials) },
    { title: "", width: 50, render: (_, r) => <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => removeItem(r.id, 'material')} /> }
  ];

  const productColumns = [
    ...sharedColumns(setProducts, products),
    { title: "Đơn giá GC", dataIndex: "price", width: 120, align: 'right', render: (t, r) => commonRenderInput(t, r, 'price', setProducts, products) },
    { title: "", width: 50, render: (_, r) => <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => removeItem(r.id, 'product')} /> }
  ];

  // --- 7. RENDER SECTIONS ---

  // 7.1. Phần Toolbar (Giống IDA Form)
  const renderToolbar = () => (
    <div style={{ background: "#fff", padding: "12px 16px", borderBottom: "1px solid #d9d9d9", marginBottom: 16 }}>
      <Space>
        {/* Nút Save gọi handleSubmit(onSave) */}
        <Button type="primary" icon={<FiSave />} onClick={handleSubmit(onSave)}>Ghi lại</Button>
        <Button className="textSibar" type="default" style={{ borderColor: "#1890ff", color: "#1890ff" }} icon={<FiPlus />}>Thêm mới</Button>
        <Button danger icon={<FiTrash2 />}>Xóa HĐ</Button>
        <Divider type="vertical" />
        <Button className="textSibar" icon={<FiUpload />}>Nhập Excel</Button>
        <Button className="textSibar" icon={<FiPrinter />}>In phiếu</Button>
      </Space>
    </div>
  );

  // 7.2. Tabs con hiển thị bảng chi tiết (Nguyên liệu / Sản phẩm)
  // Phần này được gọi lại ở cả 2 Tab cha
  const renderDetailsTabs = () => {
    const tableProps = { size: "small", bordered: true, pagination: { pageSize: 5 } };
    
    const items = [
      {
        key: "1", label: <span><FiLayers style={{ marginRight: 8 }} />Nguyên phụ liệu</span>,
        children: (
          <div>
            <div style={{ marginBottom: 8 }}>
              <Button className="textSibar" size="small" type="dashed" icon={<FiPlus />} onClick={() => addItem('material')}>Thêm NPL</Button>
            </div>
            <Table columns={materialColumns} dataSource={materials} rowKey="id" {...tableProps} />
          </div>
        )
      },
      {
        key: "2", label: <span><FiPackage style={{ marginRight: 8 }} />Sản phẩm</span>,
        children: (
          <div>
             <div style={{ marginBottom: 8 }}>
              <Button className="textSibar"  size="small" type="dashed" icon={<FiPlus />} onClick={() => addItem('product')}>Thêm SP</Button>
            </div>
            <Table columns={productColumns} dataSource={products} rowKey="id" {...tableProps} />
          </div>
        )
      },
    ];

    return (
      <Card size="small" style={{ marginTop: 16 }} bodyStyle={{padding: 0}}>
         <Tabs 
            type="card"
            activeKey={detailsTab} 
            onChange={setDetailsTab} 
            items={items} 
            style={{ padding: "16px 16px 0 16px" }}
          />
      </Card>
    );
  };

  // 7.3. Form Fields cho Hợp đồng gốc
  const renderContractFields = () => (
    <Card title="Thông tin chung Hợp đồng" size="small" bordered={false} className="shadow-sm">
      <Row gutter={[16, 12]}>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Số hợp đồng <span style={{ color: 'red' }}>*</span></label>
          <Controller
            name="contractNumber" control={control} rules={CONTRACT_RULES.contractNumber}
            render={({ field, fieldState }) => (
              <Input {...field} status={fieldState.error ? "error" : ""} placeholder="VD: HD-2023-001" />
            )}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Đối tác thuê GC</label>
          <Controller name="partner.name" control={control} render={({ field }) => <Input {...field} placeholder="Tên đối tác" />} />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Mã nước</label>
          <Controller name="partner.countryCode" control={control} render={({ field }) => <Input {...field} placeholder="VD: KR" />} />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Tiền tệ</label>
          <Controller
            name="currency" control={control}
            render={({ field }) => (
              <Select {...field} style={{ width: "100%" }}>
                <Option value="USD">USD</Option>
                <Option value="VND">VND</Option>
              </Select>
            )}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Ngày ký <span style={{ color: 'red' }}>*</span></label>
          <Controller name="signedDate" control={control} render={({ field }) => <DatePicker {...field} style={{ width: '100%' }} format="DD/MM/YYYY" />} />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Ngày hết hạn</label>
          <Controller name="expirationDate" control={control} render={({ field }) => <DatePicker {...field} style={{ width: '100%' }} format="DD/MM/YYYY" />} />
        </Col>
        <Col span={12}>
          <label style={{ fontWeight: 500 }}>Ghi chú</label>
          <Controller name="notes" control={control} render={({ field }) => <Input {...field} placeholder="Ghi chú thêm..." />} />
        </Col>
      </Row>
    </Card>
  );

  // 7.4. Form Fields cho Phụ lục
  const renderAppendixFields = () => (
    <Card title="Thông tin chung Phụ lục" size="small" bordered={false} className="shadow-sm">
      <Row gutter={[16, 12]}>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Chọn Hợp đồng gốc <span style={{ color: 'red' }}>*</span></label>
          <Controller
            name="baseContractId" control={control}
            render={({ field }) => (
              <Select {...field} style={{ width: "100%" }} placeholder="Tìm HĐ gốc...">
                <Option value="HD001">HD-2023-001 (Samsung)</Option>
                <Option value="HD002">HD-2023-002 (LG)</Option>
              </Select>
            )}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Số phụ lục <span style={{ color: 'red' }}>*</span></label>
          <Controller name="appendixNumber" control={control} render={({ field }) => <Input {...field} placeholder="VD: PL-01" />} />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Ngày hiệu lực</label>
          <Controller name="effectiveDate" control={control} render={({ field }) => <DatePicker {...field} style={{ width: '100%' }} />} />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Ngày ký <span style={{ color: 'red' }}>*</span></label>
          <Controller name="signedDate" control={control} render={({ field }) => <DatePicker {...field} style={{ width: '100%' }} format="DD/MM/YYYY" />} />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Ngày hết hạn <span style={{ color: 'red' }}>*</span></label>
          <Controller name="signedDate" control={control} render={({ field }) => <DatePicker {...field} style={{ width: '100%' }} format="DD/MM/YYYY" />} />
        </Col>
        <Col span={18}>
          <label style={{ fontWeight: 500 }}>Nội dung điều chỉnh</label>
          <Controller name="notes" control={control} render={({ field }) => <Input.TextArea rows={1} {...field} placeholder="Nội dung thay đổi của phụ lục..." />} />
        </Col>
      </Row>
    </Card>
  );

  // --- 8. CẤU HÌNH TAB CHÍNH (MAIN TABS) ---
  const mainTabItems = [
    {
      key: "contract",
      label: "Hợp đồng gia công",
      children: (
        <div style={{ padding: "0 16px 16px" }}>
          {renderContractFields()}
          {renderDetailsTabs()}
        </div>
      ),
    },
    {
      key: "appendix",
      label: "Phụ lục hợp đồng",
      children: (
        <div style={{ padding: "0 16px 16px" }}>
          {renderAppendixFields()}
          {renderDetailsTabs()}
        </div>
      ),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* Toolbar nằm trên cùng */}
      {renderToolbar()}
      
      {/* Tabs chính điều khiển Mode */}
      <Tabs 
        activeKey={mode} 
        onChange={(key) => setMode(key)} 
        items={mainTabItems}
        type="line"
        style={{ background: "#f5f5f5" }}
        tabBarStyle={{ paddingLeft: 16, background: "#fff", marginBottom: 0 }}
      />
    </div>
  );
}