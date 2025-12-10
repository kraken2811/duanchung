import { useForm, Controller } from "react-hook-form";
import {
  Row, Col, Input, DatePicker, Button, Table, Tabs, Select, 
  Space, Card, Divider, Modal
} from "antd";
import { 
  FiSave, FiSend, FiPlus, FiTrash2, FiUpload, FiPrinter 
} from "react-icons/fi";
import { useState } from "react";
import useNotify from "@/components/notification/useNotify";
import { CONTRACT_DEFAULT, MATERIAL_DEFAULT, PRODUCT_DEFAULT, EQUIPMENT_DEFAULT } from "../types";
import { CONTRACT_RULES } from "../api/rule.api";
import { formatContractPayload } from "../utils/status"; // <--- Import hàm xử lý dữ liệu

const { Option } = Select;

export default function ContractForm() {
  const notify = useNotify();
  
  // 1. Khởi tạo Form
  const { control, handleSubmit } = useForm({
    defaultValues: CONTRACT_DEFAULT,
  });

  // 2. State quản lý các bảng dữ liệu chi tiết
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  // --- HÀM XỬ LÝ DỮ LIỆU LƯỚI ---
  const addItem = (type) => {
    const timestamp = Date.now();
    if (type === 'material') {
      setMaterials([...materials, { ...MATERIAL_DEFAULT, id: timestamp, index: materials.length + 1 }]);
    } else if (type === 'product') {
      setProducts([...products, { ...PRODUCT_DEFAULT, id: timestamp, index: products.length + 1 }]);
    } else if (type === 'equipment') {
      setEquipments([...equipments, { ...EQUIPMENT_DEFAULT, id: timestamp, index: equipments.length + 1 }]);
    }
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

  // Hàm render input sửa trực tiếp trên lưới
  const commonRenderInput = (text, record, field, listSetter, list) => (
    <Input 
      value={text} 
      size="small" 
      onChange={e => {
        const newData = list.map(item => item.id === record.id ? {...item, [field]: e.target.value} : item);
        listSetter(newData);
      }} 
    />
  );

  // --- HÀM LƯU & GỬI (ACTION) ---
  
  // Nút GHI LẠI
  const onSave = (data) => {
    // Gọi hàm format từ utils để gom dữ liệu từ Form + State các bảng
    const payload = formatContractPayload(data, materials, products, equipments);
    
    console.log(">>> DỮ LIỆU LƯU (Payload):", payload);
    // Tại đây gọi API: contractAPI.create(payload)...
    
    notify.success("Đã ghi lại thông tin hợp đồng thành công!");
  };

  // Nút KHAI BÁO
  const onDeclare = (data) => {
    const payload = formatContractPayload(data, materials, products, equipments);
    console.log(">>> DỮ LIỆU KHAI BÁO:", payload);
    
    notify.info("Đang gửi dữ liệu lên hệ thống VNACCS...");
    setTimeout(() => notify.success("Khai báo thành công! Số tiếp nhận: 10029384"), 1500);
  };

  // --- CẤU HÌNH CỘT CHO TABLE ---
  const materialColumns = [
    { title: "STT", dataIndex: "index", width: 50, align: "center" },
    { title: "Mã NPL", dataIndex: "code", width: 150, render: (t, r) => commonRenderInput(t, r, 'code', setMaterials, materials) },
    { title: "Tên nguyên liệu", dataIndex: "name", width: 250, render: (t, r) => commonRenderInput(t, r, 'name', setMaterials, materials) },
    { title: "Mã HS", dataIndex: "hsCode", width: 100, render: (t, r) => commonRenderInput(t, r, 'hsCode', setMaterials, materials) },
    { title: "ĐVT", dataIndex: "unit", width: 80, render: (t, r) => commonRenderInput(t, r, 'unit', setMaterials, materials) },
    { title: "Xuất xứ", dataIndex: "origin", width: 80, render: (t, r) => commonRenderInput(t, r, 'origin', setMaterials, materials) },
    { 
      title: "", width: 50, 
      render: (_, r) => <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => removeItem(r.id, 'material')} /> 
    }
  ];

  const productColumns = [
    { title: "STT", dataIndex: "index", width: 50, align: "center" },
    { title: "Mã SP", dataIndex: "code", width: 150, render: (t, r) => commonRenderInput(t, r, 'code', setProducts, products) },
    { title: "Tên sản phẩm", dataIndex: "name", width: 250, render: (t, r) => commonRenderInput(t, r, 'name', setProducts, products) },
    { title: "Mã HS", dataIndex: "hsCode", width: 100, render: (t, r) => commonRenderInput(t, r, 'hsCode', setProducts, products) },
    { title: "ĐVT", dataIndex: "unit", width: 80, render: (t, r) => commonRenderInput(t, r, 'unit', setProducts, products) },
    { title: "Đơn giá GC", dataIndex: "unitPrice", width: 120, align: 'right', render: (t) => t },
    { 
      title: "", width: 50, 
      render: (_, r) => <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => removeItem(r.id, 'product')} /> 
    }
  ];

  // --- RENDER GIAO DIỆN ---

  const renderToolbar = () => (
    <div style={{ background: "#f0f2f5", padding: "8px 16px", borderBottom: "1px solid #d9d9d9", display: "flex", justifyContent: "space-between" }}>
      <Space>
        {/* Nút Save gọi handleSubmit(onSave) */}
        <Button type="primary" icon={<FiSave />} onClick={handleSubmit(onSave)}>Ghi lại</Button>
        <Button type="default" style={{ borderColor: "#1890ff", color: "#1890ff" }} icon={<FiPlus />}>Thêm mới</Button>
        <Button danger icon={<FiTrash2 />}>Xóa HĐ</Button>
        <Divider type="vertical" />
        <Button icon={<FiUpload />}>Nhập Excel</Button>
        <Button icon={<FiPrinter />}>In phiếu</Button>
      </Space>
      {/* Nút Declare gọi handleSubmit(onDeclare) */}
      <Button type="primary" danger icon={<FiSend />} onClick={handleSubmit(onDeclare)}>Khai báo HQ</Button>
    </div>
  );

  const renderGeneralInfo = () => (
    <Card 
      size="small" 
      title="Thông tin chung Hợp đồng" 
      headStyle={{ background: "#e6f7ff", color: "#0050b3", fontWeight: "bold", minHeight: "36px" }}
      bodyStyle={{ padding: "12px" }}
      style={{ marginBottom: 12 }}
    >
      <Row gutter={[12, 8]}>
        <Col span={4}>
          <label className="text-xs font-semibold text-gray-600">Số hợp đồng <span className="text-red-500">*</span></label>
          <Controller
            name="contractNumber" control={control} rules={CONTRACT_RULES.contractNumber}
            render={({ field, fieldState }) => (
              <Input {...field} status={fieldState.error ? "error" : ""} placeholder="Số HĐ" size="small" />
            )}
          />
        </Col>
        <Col span={4}>
          <label className="text-xs font-semibold text-gray-600">Ngày ký <span className="text-red-500">*</span></label>
          <Controller
            name="signedDate" control={control} rules={CONTRACT_RULES.signedDate}
            render={({ field }) => <DatePicker {...field} className="w-full" size="small" format="DD/MM/YYYY" />}
          />
        </Col>
        <Col span={4}>
          <label className="text-xs font-semibold text-gray-600">Ngày hết hạn <span className="text-red-500">*</span></label>
          <Controller
            name="expirationDate" control={control} rules={CONTRACT_RULES.expirationDate}
            render={({ field }) => <DatePicker {...field} className="w-full" size="small" format="DD/MM/YYYY" />}
          />
        </Col>
        <Col span={6}>
          <label className="text-xs font-semibold text-gray-600">Đối tác thuê GC <span className="text-red-500">*</span></label>
          <Controller
            name="partner.name" control={control}
            render={({ field }) => <Input {...field} placeholder="Tên đối tác" size="small" />}
          />
        </Col>
        <Col span={6}>
          <label className="text-xs font-semibold text-gray-600">Địa chỉ</label>
          <Controller
            name="partner.address" control={control}
            render={({ field }) => <Input {...field} placeholder="Địa chỉ" size="small" />}
          />
        </Col>
        <Col span={4}>
          <label className="text-xs font-semibold text-gray-600">Mã nước <span className="text-red-500">*</span></label>
          <Controller
            name="partner.countryCode" control={control}
            render={({ field }) => <Input {...field} placeholder="VD: US" size="small" />}
          />
        </Col>
        <Col span={4}>
          <label className="text-xs font-semibold text-gray-600">Tiền tệ</label>
          <Controller
            name="currency" control={control}
            render={({ field }) => (
              <Select {...field} size="small" style={{ width: "100%" }} placeholder="Chọn tiền tệ">
                <Option value="USD">USD - Đô la Mỹ</Option>
                <Option value="EUR">EUR - Euro</Option>
                <Option value="JPY">JPY - Yên Nhật</Option>
                <Option value="VND">VND - Việt Nam Đồng</Option>
              </Select>
            )}
          />
        </Col>
        <Col span={16}>
          <label className="text-xs font-semibold text-gray-600">Ghi chú</label>
          <Controller
            name="notes" control={control}
            render={({ field }) => <Input {...field} placeholder="Ghi chú" size="small" />}
          />
        </Col>
      </Row>
    </Card>
  );

  const renderTabContent = () => {
    const tableProps = { size: "small", bordered: true, pagination: false, scroll: { y: 300 } };
    const items = [
      {
        key: "1", label: "Danh mục Nguyên phụ liệu (NPL)",
        children: (
          <div>
            <div style={{ marginBottom: 8 }}>
              <Button size="small" type="dashed" icon={<FiPlus />} onClick={() => addItem('material')}>Thêm NPL</Button>
            </div>
            <Table columns={materialColumns} dataSource={materials} rowKey="id" {...tableProps} />
          </div>
        )
      },
      {
        key: "2", label: "Danh mục Sản phẩm (SP)",
        children: (
          <div>
             <div style={{ marginBottom: 8 }}>
              <Button size="small" type="dashed" icon={<FiPlus />} onClick={() => addItem('product')}>Thêm SP</Button>
            </div>
            <Table columns={productColumns} dataSource={products} rowKey="id" {...tableProps} />
          </div>
        )
      },
      { key: "3", label: "Thiết bị", children: <div className="p-4">Chưa có dữ liệu</div> }
    ];

    return (
      <Tabs type="card" size="small" activeKey={activeTab} onChange={setActiveTab} items={items} 
        style={{ background: "#fff", border: "1px solid #f0f0f0", padding: "8px" }} />
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {renderToolbar()}
      <div style={{ padding: "12px" }}>
        {renderGeneralInfo()}
        {renderTabContent()}
      </div>
    </div>
  );
}