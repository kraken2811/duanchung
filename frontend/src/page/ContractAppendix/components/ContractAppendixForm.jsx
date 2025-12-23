import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Divider,
  Table,
  Tabs,
  Select,
  InputNumber,
  Space,
  Upload,
  message
} from "antd";
import { 
  FiSave, 
  FiSend, 
  FiPlus, 
  FiTrash2, 
  FiFileText, 
  FiDownload 
} from "react-icons/fi";
import { useState } from "react";
import useNotify from "@/components/notification/useNotify";
import { CONTRACT_APPENDIX_DEFAULT } from "../types";
import "../css/Appendix.css";

const { TextArea } = Input;

export default function ContractAppendixForm() {
  const notify = useNotify();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: CONTRACT_APPENDIX_DEFAULT,
  });

  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  // --- 1. Columns Definition (BA Requirement: Data Fields for Lists) ---

  // Tab 1: Nguyên phụ liệu
  const materialColumns = [
    { title: "STT", render: (_, __, index) => index + 1, width: 50 },
    { title: "Mã NPL", dataIndex: "code", width: 150 },
    { title: "Tên nguyên liệu", dataIndex: "name", width: 250 },
    { title: "HS Code", dataIndex: "hsCode", width: 100 },
    { title: "ĐVT", dataIndex: "unit", width: 80 },
    { title: "Xuất xứ", dataIndex: "origin", width: 100 },
    {
      title: "",
      width: 50,
      render: (_, record) => (
        <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => removeMaterial(record.id)} />
      ),
    },
  ];

  // Tab 2: Sản phẩm
  const productColumns = [
    { title: "STT", render: (_, __, index) => index + 1, width: 50 },
    { title: "Mã SP", dataIndex: "code", width: 150 },
    { title: "Tên sản phẩm", dataIndex: "name", width: 250 },
    { title: "HS Code", dataIndex: "hsCode", width: 100 },
    { title: "ĐVT", dataIndex: "unit", width: 80 },
    { title: "Đơn giá GC", dataIndex: "processingPrice", width: 120, align: 'right' },
    { title: "Loại tiền", dataIndex: "currency", width: 80 },
    {
      title: "",
      width: 50,
      render: (_, record) => (
        <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => removeProduct(record.id)} />
      ),
    },
  ];

  // Tab 3: Thiết bị
  const equipmentColumns = [
    { title: "STT", render: (_, __, index) => index + 1, width: 50 },
    { title: "Mã TB", dataIndex: "code", width: 150 },
    { title: "Tên thiết bị", dataIndex: "name", width: 250 },
    { title: "HS Code", dataIndex: "hsCode", width: 100 },
    { title: "Xuất xứ", dataIndex: "origin", width: 100 },
    { title: "Tình trạng", dataIndex: "status", width: 100 },
    {
      title: "",
      width: 50,
      render: (_, record) => (
        <FiTrash2 className="text-red-500 cursor-pointer" onClick={() => removeEquipment(record.id)} />
      ),
    },
  ];

  // --- Actions ---
  const removeMaterial = (id) => setMaterials(materials.filter((i) => i.id !== id));
  const removeProduct = (id) => setProducts(products.filter((i) => i.id !== id));
  const removeEquipment = (id) => setEquipments(equipments.filter((i) => i.id !== id));

  const onSave = (data) => {
    const payload = { ...data, materials, products, equipments };
    console.log("Saving Appendix:", payload);
    notify.success("Đã lưu Phụ lục hợp đồng");
  };

  const onDeclare = (data) => {
    // BA Logic: Kiểm tra tính hợp lệ trước khi gửi VNACCS
    if(materials.length === 0 && products.length === 0 && equipments.length === 0) {
        notify.error("Phải nhập ít nhất một danh mục (NPL, SP hoặc TB)");
        return;
    }
    notify.success("Đã gửi dữ liệu lên hệ thống VNACCS");
  };

  // --- Render Sections ---

  // 2. Nhóm Thông tin chung (General Information Header)
  const renderGeneralInfo = () => (
    <div style={{ marginBottom: 20 }}>
      <h3>Thông tin chung Phụ lục</h3>
      <Row gutter={16}>
        <Col span={6}>
          <label>Số hợp đồng gốc *</label>
          <Select 
             showSearch
             style={{ width: "100%" }} 
             placeholder="Chọn hợp đồng..."
             onChange={(v) => setValue("contractNumber", v)}
          >
             <Select.Option value="HD001/2023">HD001/2023 - Cty ABC</Select.Option>
             <Select.Option value="HD002/2023">HD002/2023 - Cty XYZ</Select.Option>
          </Select>
        </Col>
        <Col span={6}>
          <label>Số phụ lục *</label>
          <Input placeholder="Nhập số phụ lục" {...register("appendixNumber", { required: true })} />
        </Col>
        <Col span={6}>
          <label>Ngày ký *</label>
          <DatePicker style={{ width: "100%" }} onChange={(d) => setValue("signedDate", d)} />
        </Col>
        <Col span={6}>
          <label>Ngày hiệu lực *</label>
          <DatePicker style={{ width: "100%" }} onChange={(d) => setValue("effectiveDate", d)} />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
         <Col span={6}>
            <label>Ngày hết hạn (Gia hạn)</label>
            <DatePicker style={{ width: "100%" }} onChange={(d) => setValue("expirationDate", d)} />
         </Col>
         <Col span={18}>
            <label>Ghi chú</label>
            <Input placeholder="Nội dung điều chỉnh..." {...register("notes")} />
         </Col>
      </Row>
    </div>
  );

  // 3. Khu vực Chi tiết hàng hóa (Detail Tabs)
  const tabItems = [
    {
      key: "1",
      label: "Danh sách Nguyên phụ liệu (NPL)",
      children: (
        <div>
          <Space style={{ marginBottom: 10 }}>
            <Button className="textSibar" type="dashed" icon={<FiPlus />} onClick={() => {
                setMaterials([...materials, { id: Date.now(), code: '', name: '' }]);
            }}>Thêm dòng</Button>
            <Button className="textSibar" icon={<FiFileText />}>Nhập Excel NPL</Button>
            <Button className="textSibar" icon={<FiDownload />}>Tải mẫu Excel</Button>
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
      label: "Danh sách Sản phẩm (SP)",
      children: (
        <div>
            <Space style={{ marginBottom: 10 }}>
                <Button className="textSibar" type="dashed" icon={<FiPlus />} onClick={() => {
                    setProducts([...products, { id: Date.now(), code: '', name: '' }]);
                }}>Thêm dòng</Button>
                <Button className="textSibar" icon={<FiFileText />}>Nhập Excel SP</Button>
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
    {
      key: "3",
      label: "Danh sách Thiết bị (TB)",
      children: (
        <div>
             <Space style={{ marginBottom: 10 }}>
                <Button className="textSibar" type="dashed" icon={<FiPlus />} onClick={() => {
                    setEquipments([...equipments, { id: Date.now(), code: '', name: '' }]);
                }}>Thêm dòng</Button>
                 <Button className="textSibar" icon={<FiFileText />}>Nhập Excel TB</Button>
            </Space>
            <Table 
                columns={equipmentColumns} 
                dataSource={equipments} 
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
      {/* 1. Thanh Menu chức năng (Toolbar) */}
      <div
        style={{
          background: "#fff",
          padding: "12px 16px",
          borderBottom: "1px solid #d9d9d9",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Space>
          <Button className="textSibar" icon={<FiSave />} onClick={handleSubmit(onSave)}>
            Ghi tạm
          </Button>
          <Button type="primary" icon={<FiSend />} onClick={handleSubmit(onDeclare)}>
            Khai báo (VNACCS)
          </Button>
          <Divider type="vertical" />
          <Button className="textSibar">Lấy từ Excel tổng hợp</Button>
        </Space>
        <Space>
            <Button danger>Xóa phụ lục</Button>
        </Space>
      </div>

      {/* Render thông tin chung */}
      <div style={{ padding: "0 16px" }}>
        {renderGeneralInfo()}
        <Divider />
        
        {/* Render Tabs chi tiết */}
        <Tabs activeKey={activeTab} items={tabItems} onChange={setActiveTab} type="card" />
      </div>
    </div>
  );
}