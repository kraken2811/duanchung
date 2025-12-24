import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Row, Col, Input, DatePicker, Button, Table, Tabs, Select,
  Space, Card, Divider, Modal
} from "antd";
import {
  FiSave, FiPlus, FiTrash2, FiUpload, FiPrinter, FiLayers, FiPackage
} from "react-icons/fi";
import useNotify from "@/components/notification/useNotify";
import { CONTRACT_RULES } from "../api/rule.api";
import "../css/contract.css";

const { Option } = Select;

// Giá trị mặc định cho form
const DEFAULT_FORM_VALUES = {
  contractNumber: "",
  appendixNumber: "",
  signedDate: null,
  expirationDate: null,
  effectiveDate: null,
  partner: { name: "", address: "", countryCode: "" },
  currency: "USD",
  notes: "",
  baseContractId: null
};

export default function UnifiedContractForm() {
  const notify = useNotify();

  // --- 1. STATE QUẢN LÝ ---
  const [mode, setMode] = useState("contract"); 
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [detailsTab, setDetailsTab] = useState("1"); 

  // --- 2. KHỞI TẠO FORM ---
  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  // --- 3. CƠ CHẾ CACHE (LƯU TRỮ TẠM THỜI) ---
  // Dùng useRef để lưu dữ liệu của từng tab mà không gây re-render
  const dataCache = useRef({
    contract: {
      form: { ...DEFAULT_FORM_VALUES },
      materials: [],
      products: [],
      equipments: []
    },
    appendix: {
      form: { ...DEFAULT_FORM_VALUES },
      materials: [],
      products: [],
      equipments: []
    }
  });

  // Hàm xử lý khi chuyển Tab (Quan trọng: Lưu dữ liệu cũ -> Load dữ liệu mới)
  const handleModeChange = (newMode) => {
    if (newMode === mode) return;

    // BƯỚC 1: Lưu dữ liệu hiện tại vào Cache của mode cũ
    const currentFormValues = getValues();
    dataCache.current[mode] = {
      form: currentFormValues,
      materials: [...materials],
      products: [...products],
      equipments: [...equipments]
    };

    // BƯỚC 2: Lấy dữ liệu từ Cache của mode mới ra
    const nextData = dataCache.current[newMode];

    // BƯỚC 3: Cập nhật UI
    setMode(newMode); // Đổi tab
    reset(nextData.form); // Fill lại form
    setMaterials(nextData.materials); // Fill lại bảng
    setProducts(nextData.products);
    setEquipments(nextData.equipments);
  };

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

  const commonRenderInput = (text, record, field, listSetter, list, textAlign = "left") => (
    <Input
      className="table-input" // Class CSS mới
      value={text}
      size="small"
      placeholder="..." // Placeholder nhẹ
      style={{ 
        textAlign: textAlign, // Căn chỉnh text bên trong input (quan trọng cho số tiền)
        width: "100%",
        fontSize: "14px"
      }}
      onChange={e => {
        const newData = list.map(item => item.id === record.id ? { ...item, [field]: e.target.value } : item);
        listSetter(newData);
      }}
    />
  );

  // --- 5. ACTION BUTTONS ---
  const onSave = (data) => {
    // Lưu ý: Cập nhật lại cache hiện tại để đảm bảo dữ liệu mới nhất nếu user tiếp tục switch
    dataCache.current[mode] = {
        form: data,
        materials, products, equipments
    };

    const payload = {
      type: mode,
      info: data,
      details: { materials, products, equipments }
    };
    console.log(">>> SAVING PAYLOAD:", payload);
    notify.success(`Đã lưu ${mode === 'contract' ? 'Hợp đồng' : 'Phụ lục'} thành công!`);
  };

  // --- 6. CẤU HÌNH CỘT ---
  const sharedColumns = (listSetter, list) => [
    { 
      title: "STT", 
      render: (_, __, i) => <span className="text-gray-500">{i + 1}</span>, 
      width: 50, 
      align: "center" 
    },
    { 
      title: "MÃ HÀNG", // Uppercase header
      dataIndex: "code", 
      width: 140, 
      align: 'left', 
      render: (t, r) => commonRenderInput(t, r, 'code', listSetter, list, 'left') 
    },
    { 
      title: "TÊN HÀNG HÓA", 
      dataIndex: "name", 
      // width: để auto hoặc set lớn để chiếm phần còn lại
      align: 'left', 
      render: (t, r) => commonRenderInput(t, r, 'name', listSetter, list, 'left') 
    },
    { 
      title: "HS CODE", 
      dataIndex: "hsCode", 
      width: 100, 
      align: 'center', // HS Code nên căn giữa
      render: (t, r) => commonRenderInput(t, r, 'hsCode', listSetter, list, 'center') 
    },
    { 
      title: "ĐVT", 
      dataIndex: "unit", 
      width: 80, 
      align: 'center', 
      render: (t, r) => commonRenderInput(t, r, 'unit', listSetter, list, 'center') 
    },
  ];

  // Cột Nguyên phụ liệu
  const materialColumns = [
    ...sharedColumns(setMaterials, materials),
    { 
      title: "XUẤT XỨ", 
      dataIndex: "origin", 
      width: 100, 
      align: 'left', 
      render: (t, r) => commonRenderInput(t, r, 'origin', setMaterials, materials, 'left') 
    },
    { 
      title: "TÁC VỤ", 
      width: 70, 
      align: 'center', 
      render: (_, r) => (
        <FiTrash2 
          className="text-red-500 cursor-pointer hover:text-red-700 transition-colors" 
          size={16}
          onClick={() => removeItem(r.id, 'material')} 
        />
      ) 
    }
  ];

  // Cột Sản phẩm (Có giá tiền)
  const productColumns = [
    ...sharedColumns(setProducts, products),
    { 
      title: "ĐƠN GIÁ GC", 
      dataIndex: "price", 
      width: 140, 
      align: 'right', // Header căn phải
      render: (t, r) => commonRenderInput(t, r, 'price', setProducts, products, 'right') // Text trong input căn phải
    },
    { 
      title: "TÁC VỤ", 
      width: 70, 
      align: 'center', 
      render: (_, r) => (
        <FiTrash2 
          className="text-red-500 cursor-pointer hover:text-red-700 transition-colors" 
          size={16}
          onClick={() => removeItem(r.id, 'product')} 
        />
      ) 
    }
  ];

  // --- 7. RENDER SECTIONS ---

  const renderToolbar = () => (
    <div style={{ background: "#fff", padding: "12px 16px", borderBottom: "1px solid #d9d9d9", marginBottom: 16 }}>
      <Space>
        <Button type="primary" icon={<FiSave />} onClick={handleSubmit(onSave)}>Ghi lại</Button>
        <Button className="textSibar" type="default" style={{ borderColor: "#1890ff", color: "#1890ff" }} icon={<FiPlus />}>Thêm mới</Button>
        <Button danger icon={<FiTrash2 />}>Xóa HĐ</Button>
        <Divider type="vertical" />
        <Button className="textSibar" icon={<FiUpload />}>Nhập Excel</Button>
        <Button className="textSibar" icon={<FiPrinter />}>In phiếu</Button>
      </Space>
    </div>
  );

  const renderDetailsTabs = () => {
    const tableProps = { 
      size: "middle", // Đổi size small -> middle cho thoáng hơn chút (hoặc giữ small nếu dữ liệu quá nhiều)
      bordered: false, // TẮT border mặc định
      pagination: { pageSize: 5 },
      className: "custom-table" // ÁP DỤNG CSS MỚI
    };
    
    const items = [
      {
        key: "1", label: <span><FiLayers style={{ marginRight: 8 }} />Nguyên phụ liệu</span>,
        children: (
          <div>
            <div style={{ marginBottom: 12, display: 'flex' }}>
               {/* Nút thêm mới nên để bên phải hoặc đầu bảng, ở đây để phải cho gọn header */}
               <Button type="dashed" icon={<FiPlus />} onClick={() => addItem('material')}>Thêm</Button>
            </div>
            <Table columns={materialColumns} dataSource={materials} rowKey="id" {...tableProps} />
          </div>
        )
      },
      {
        key: "2", label: <span><FiPackage style={{ marginRight: 8 }} />Sản phẩm</span>,
        children: (
          <div>
              <div style={{ marginBottom: 12, display: 'flex' }}>
               <Button type="dashed" icon={<FiPlus />} onClick={() => addItem('product')}>Thêm</Button>
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
          <Controller name="expirationDate" control={control} render={({ field }) => <DatePicker {...field} style={{ width: '100%' }} format="DD/MM/YYYY" />} />
        </Col>
        <Col span={18}>
          <label style={{ fontWeight: 500 }}>Nội dung điều chỉnh</label>
          <Controller name="notes" control={control} render={({ field }) => <Input.TextArea rows={1} {...field} placeholder="Nội dung thay đổi của phụ lục..." />} />
        </Col>
      </Row>
    </Card>
  );

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
      {renderToolbar()}
      
      {/* Sửa onChange để dùng hàm handleModeChange */}
      <Tabs 
        activeKey={mode} 
        onChange={handleModeChange} 
        items={mainTabItems}
        type="line"
        style={{ background: "#f5f5f5" }}
        tabBarStyle={{ paddingLeft: 16, background: "#fff", marginBottom: 0 }}
      />
    </div>
  );
}