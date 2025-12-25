import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Row, Col, Input, DatePicker, Button, Table, Tabs, Select,
  Space, Card, Divider, Modal, InputNumber, Checkbox
} from "antd";
import {
  FiSave, FiPlus, FiTrash2, FiUpload, FiPrinter, FiLayers, 
  FiPackage, FiSearch, FiFileText, FiMessageSquare
} from "react-icons/fi";
import dayjs from "dayjs";
import useNotify from "@/components/notification/useNotify";
import { CONTRACT_RULES } from "../api/rule.api";
import "../css/contract.css";

const { Option } = Select;
const { TextArea } = Input;

// --- DỮ LIỆU MÃ LOẠI PHỤ KIỆN (Từ hình 4) ---
const ACCESSORY_TYPES_LIST = [
  { code: "803", content: "Bổ sung nguyên phụ liệu" },
  { code: "802", content: "Bổ sung sản phẩm" },
  { code: "804", content: "Bổ sung thiết bị" },
  { code: "805", content: "Bổ sung hàng mẫu" },
  { code: "503", content: "Sửa nguyên phụ liệu" },
  { code: "502", content: "Sửa sản phẩm" },
  { code: "504", content: "Sửa thiết bị" },
  { code: "102", content: "Hủy sản phẩm" },
  { code: "103", content: "Hủy nguyên phụ liệu" },
  { code: "201", content: "Gia hạn hợp đồng" },
];

// Giá trị mặc định cho form
const DEFAULT_FORM_VALUES = {
  contractNumber: "",
  accessoryNumber: "",
  declarationDate: dayjs(),
  signedDate: null,
  expirationDate: null,
  effectiveDate: null,
  validFrom: null,
  validTo: null,
  customsOfficeCode: "",
  currency: "USD",
  paymentTerms: "",
  processingFee: null,
  totalProductValue: null,
  totalProcessingValue: null,
  notes: "",
  baseContractId: null,
  baseContractSignedDate: new Date("2019-10-11"), // <--- THÊM: Mặc định hoặc null
  accessoryNumber: "",
  // Thông tin bên nhận gia công
  processor: {
    taxCode: "",
    name: "",
    address: "",
  },
  // Thông tin bên thuê gia công
  client: {
    taxCode: "",
    name: "",
    address: "",
  },
  // Checkbox hình thức gia công
  isProcessingAbroad: false,
};

export default function UnifiedContractForm() {
  const notify = useNotify();

  // --- 1. STATE QUẢN LÝ ---
  const [mode, setMode] = useState("contract"); 
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [detailsTab, setDetailsTab] = useState("1"); 
  const [selectedAccessoryTypes, setSelectedAccessoryTypes] = useState([]);
  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [tempSelectedTypes, setTempSelectedTypes] = useState([]);

  // --- 2. KHỞI TẠO FORM ---
  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  // --- 3. CƠ CHẾ CACHE ---
  const dataCache = useRef({
    contract: {
      form: { ...DEFAULT_FORM_VALUES },
      materials: [],
      products: [],
      equipments: []
    },
    accessory: {
      form: { ...DEFAULT_FORM_VALUES },
      materials: [],
      products: [],
      equipments: []
    }
  });

  const handleModeChange = (newMode) => {
    if (newMode === mode) return;

    const currentFormValues = getValues();
    dataCache.current[mode] = {
      form: currentFormValues,
      materials: [...materials],
      products: [...products],
      equipments: [...equipments]
    };

    const nextData = dataCache.current[newMode];
    setMode(newMode);
    reset(nextData.form);
    setMaterials(nextData.materials);
    setProducts(nextData.products);
    setEquipments(nextData.equipments);
  };

  // --- 4. HÀM XỬ LÝ DỮ LIỆU LƯỚI (CRUD) ---
  const addItem = (type) => {
    const newItem = { 
      id: Date.now(), 
      code: "", 
      name: "", 
      hsCode: "", 
      unit: "", 
      quantity: 0,
      origin: "", 
      price: 0,
      totalValue: 0,
      processingPrice: 0
    };
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
      className="table-input"
      value={text}
      size="small"
      placeholder="..."
      style={{ 
        textAlign: textAlign,
        width: "100%",
        fontSize: "14px"
      }}
      onChange={e => {
        const newData = list.map(item => 
          item.id === record.id ? { ...item, [field]: e.target.value } : item
        );
        listSetter(newData);
      }}
    />
  );

  const commonRenderNumber = (value, record, field, listSetter, list) => (
    <InputNumber
      className="table-input"
      value={value}
      size="small"
      min={0}
      style={{ width: "100%", textAlign: "right" }}
      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value.replace(/\$\s?|(,*)/g, '')}
      onChange={val => {
        const newData = list.map(item => 
          item.id === record.id ? { ...item, [field]: val || 0 } : item
        );
        listSetter(newData);
      }}
    />
  );

  // --- 5. ACTION BUTTONS ---
  const onSave = (data) => {
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

  const handleImportExcel = () => {
    notify.info("Chức năng nhập từ Excel đang phát triển");
  };

  const handlePrint = () => {
    notify.info("Chức năng in phiếu đang phát triển");
  };

  const handleGetFeedback = () => {
    notify.info("Chức năng lấy phản hồi từ hải quan");
  };

  const handleDeclare = () => {
    notify.info("Chức năng khai báo hải quan");
  };

  // --- 6. CẤU HÌNH CỘT ---
  const materialColumns = [
    { 
      title: "STT", 
      render: (_, __, i) => <span className="text-gray-500">{i + 1}</span>, 
      width: 50, 
      align: "center" 
    },
    { 
      title: "MÃ NPL", 
      dataIndex: "code", 
      width: 140, 
      render: (t, r) => commonRenderInput(t, r, 'code', setMaterials, materials, 'left') 
    },
    { 
      title: "TÊN NPL", 
      dataIndex: "name", 
      render: (t, r) => commonRenderInput(t, r, 'name', setMaterials, materials, 'left') 
    },
    { 
      title: "ĐƠN VỊ TÍNH", 
      dataIndex: "unit", 
      width: 100, 
      align: 'center', 
      render: (t, r) => commonRenderInput(t, r, 'unit', setMaterials, materials, 'center') 
    },
    { 
      title: "MÃ HS", 
      dataIndex: "hsCode", 
      width: 100, 
      align: 'center', 
      render: (t, r) => commonRenderInput(t, r, 'hsCode', setMaterials, materials, 'center') 
    },
    { 
      title: "SỐ LƯỢNG ĐK", 
      dataIndex: "quantity", 
      width: 120, 
      align: 'right', 
      render: (v, r) => commonRenderNumber(v, r, 'quantity', setMaterials, materials) 
    },
    { 
      title: "NGUỒN NGUYÊN LIỆU", 
      dataIndex: "origin", 
      width: 140, 
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

  const productColumns = [
    { 
      title: "STT", 
      render: (_, __, i) => <span className="text-gray-500">{i + 1}</span>, 
      width: 50, 
      align: "center" 
    },
    { 
      title: "LOẠI SP GIA CÔNG", 
      dataIndex: "name", 
      render: (t, r) => commonRenderInput(t, r, 'name', setProducts, products, 'left') 
    },
    { 
      title: "SỐ LƯỢNG", 
      dataIndex: "quantity", 
      width: 120, 
      align: 'right', 
      render: (v, r) => commonRenderNumber(v, r, 'quantity', setProducts, products) 
    },
    { 
      title: "TRỊ GIÁ SẢN PHẨM", 
      dataIndex: "totalValue", 
      width: 140, 
      align: 'right', 
      render: (v, r) => commonRenderNumber(v, r, 'totalValue', setProducts, products) 
    },
    { 
      title: "TRỊ GIÁ TIỀN CÔNG", 
      dataIndex: "processingPrice", 
      width: 140, 
      align: 'right', 
      render: (v, r) => commonRenderNumber(v, r, 'processingPrice', setProducts, products) 
    },
    { 
      title: "GIÁ GC", 
      dataIndex: "price", 
      width: 120, 
      align: 'right', 
      render: (v, r) => commonRenderNumber(v, r, 'price', setProducts, products) 
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

  const equipmentColumns = [
    { 
      title: "STT", 
      render: (_, __, i) => <span className="text-gray-500">{i + 1}</span>, 
      width: 50, 
      align: "center" 
    },
    { 
      title: "MÃ THIẾT BỊ", 
      dataIndex: "code", 
      width: 140, 
      render: (t, r) => commonRenderInput(t, r, 'code', setEquipments, equipments, 'left') 
    },
    { 
      title: "TÊN THIẾT BỊ", 
      dataIndex: "name", 
      render: (t, r) => commonRenderInput(t, r, 'name', setEquipments, equipments, 'left') 
    },
    { 
      title: "ĐƠN VỊ TÍNH", 
      dataIndex: "unit", 
      width: 100, 
      align: 'center', 
      render: (t, r) => commonRenderInput(t, r, 'unit', setEquipments, equipments, 'center') 
    },
    { 
      title: "SỐ LƯỢNG", 
      dataIndex: "quantity", 
      width: 100, 
      align: 'right', 
      render: (v, r) => commonRenderNumber(v, r, 'quantity', setEquipments, equipments) 
    },
    { 
      title: "TÁC VỤ", 
      width: 70, 
      align: 'center', 
      render: (_, r) => (
        <FiTrash2 
          className="text-red-500 cursor-pointer hover:text-red-700 transition-colors" 
          size={16}
          onClick={() => removeItem(r.id, 'equipment')} 
        />
      ) 
    }
  ];

  // --- 7. RENDER SECTIONS ---
  const renderToolbar = () => (
    <div style={{ background: "#fff", padding: "12px 16px", borderBottom: "1px solid #d9d9d9", marginBottom: 16 }}>
      <Space>
        <Button type="primary" icon={<FiSave />} onClick={handleSubmit(onSave)}>Ghi lại</Button>
        <Button className="textSibar" type="default" style={{ borderColor: "#1890ff", color: "#1890ff" }} icon={<FiPlus />}>
          Thêm mới
        </Button>
        <Button danger icon={<FiTrash2 />}>Xóa</Button>
        <Divider type="vertical" />
        <Button className="textSibar" icon={<FiUpload />} onClick={handleImportExcel}>Nhập Excel</Button>
        <Button className="textSibar" icon={<FiPrinter />} onClick={handlePrint}>In HĐ</Button>
        <Button className="textSibar" icon={<FiSearch />}>Tìm HĐ</Button>
        <Divider type="vertical" />
        <Button className="textSibar" icon={<FiMessageSquare />} onClick={handleGetFeedback}>Lấy phản hồi</Button>
        <Button className="textSibar" icon={<FiFileText />} onClick={handleDeclare}>Khai báo</Button>
      </Space>
    </div>
  );

  const renderDetailsTabs = () => {
    const tableProps = { 
      size: "middle",
      bordered: false,
      pagination: { pageSize: 5 },
      className: "custom-table"
    };
    
    const items = [
      {
        key: "1", 
        label: <span><FiLayers style={{ marginRight: 8 }} />Nguyên phụ liệu</span>,
        children: (
          <div>
            <div style={{ marginBottom: 12 }}>
               <Button type="dashed" icon={<FiPlus />} onClick={() => addItem('material')}>
                 Thêm NPL
               </Button>
            </div>
            <Table columns={materialColumns} dataSource={materials} rowKey="id" {...tableProps} />
          </div>
        )
      },
      {
        key: "2", 
        label: <span><FiPackage style={{ marginRight: 8 }} />Sản phẩm</span>,
        children: (
          <div>
            <div style={{ marginBottom: 12 }}>
               <Button type="dashed" icon={<FiPlus />} onClick={() => addItem('product')}>
                 Thêm sản phẩm
               </Button>
            </div>
            <Table columns={productColumns} dataSource={products} rowKey="id" {...tableProps} />
          </div>
        )
      },
      {
        key: "3", 
        label: <span><FiLayers style={{ marginRight: 8 }} />Thiết bị</span>,
        children: (
          <div>
            <div style={{ marginBottom: 12 }}>
               <Button type="dashed" icon={<FiPlus />} onClick={() => addItem('equipment')}>
                 Thêm thiết bị
               </Button>
            </div>
            <Table columns={equipmentColumns} dataSource={equipments} rowKey="id" {...tableProps} />
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
        {/* Dòng 1 */}
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Chi cục Hải quan ĐT <span style={{ color: 'red' }}>*</span></label>
          <Controller
            name="customsOfficeCode" 
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="VD: 28NU" />
            )}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Chi cục HQ KCN Hóa Khánh - Liên Chiểu</label>
          <Input disabled value="Chi cục HQ KCN Hóa Khánh - Liên Chiểu" />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Trạng thái</label>
          <Select defaultValue="NHAP" style={{ width: "100%" }}>
            <Option value="NHAP">Chưa khai báo</Option>
            <Option value="DA_GUI">Đã gửi</Option>
            <Option value="DA_DUYET">Đã được duyệt</Option>
          </Select>
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Ngày TN</label>
          <Controller 
            name="signedDate" 
            control={control} 
            render={({ field }) => (
              <DatePicker 
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.toDate() : null)}
                style={{ width: '100%' }} 
                format="DD/MM/YYYY" 
              />
            )} 
          />
        </Col>

        {/* Dòng 2 */}
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Nước thuê gia công <span style={{ color: 'red' }}>*</span></label>
          <Controller name="client.countryCode" control={control} render={({ field }) => (
            <Select {...field} style={{ width: "100%" }} placeholder="Chọn quốc gia">
              <Option value="HK">HG KONG</Option>
              <Option value="JP">JAPAN</Option>
              <Option value="KR">KOREA</Option>
              <Option value="US">USA</Option>
            </Select>
          )} />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Số hợp đồng <span style={{ color: 'red' }}>*</span></label>
          <Controller
            name="contractNumber" 
            control={control} 
            rules={CONTRACT_RULES.contractNumber}
            render={({ field, fieldState }) => (
              <Input {...field} status={fieldState.error ? "error" : ""} placeholder="VD: HDGC2019-VNJP" />
            )}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Số TN</label>
          <Controller name="referenceNumber" control={control} render={({ field }) => (
            <Input {...field} placeholder="Số tiếp nhận" />
          )} />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Số tham chiếu</label>
          <Controller name="internalReference" control={control} render={({ field }) => (
            <Input {...field} placeholder="Mã tham chiếu nội bộ" />
          )} />
        </Col>

        {/* Dòng 3 */}
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Ngày ký HĐ <span style={{ color: 'red' }}>*</span></label>
          <Controller 
            name="signedDate" 
            control={control} 
            render={({ field }) => (
              <DatePicker 
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.toDate() : null)}
                style={{ width: '100%' }} 
                format="DD/MM/YYYY" 
              />
            )} 
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Ngày hết hạn HĐ <span style={{ color: 'red' }}>*</span></label>
          <Controller 
            name="expirationDate" 
            control={control} 
            render={({ field }) => (
              <DatePicker 
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.toDate() : null)}
                style={{ width: '100%' }} 
                format="DD/MM/YYYY" 
              />
            )} 
          />
        </Col>
        <Col span={12}>
          <Controller 
            name="isProcessingAbroad" 
            control={control} 
            render={({ field }) => (
              <Checkbox style={{marginTop: 18, marginLeft: 290}} {...field} checked={field.value}>
                Hình thức gia công ngoài nước
              </Checkbox>
            )}
          />
        </Col>

        {/* Dòng 4 */}
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Đồng tiền thanh toán <span style={{ color: 'red' }}>*</span></label>
          <Controller
            name="currency" 
            control={control}
            render={({ field }) => (
              <Select {...field} style={{ width: "100%" }}>
                <Option value="USD">USD - Đô la Mỹ</Option>
                <Option value="VND">VND - Đồng Việt Nam</Option>
                <Option value="EUR">EUR - Euro</Option>
                <Option value="JPY">JPY - Yên Nhật</Option>
              </Select>
            )}
          />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Phương thức thanh toán</label>
          <Controller name="paymentTerms" control={control} render={({ field }) => (
            <Input {...field} placeholder="VD: DA, TT, L/C" />
          )} />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Tổng trị giá sản phẩm</label>
          <Controller name="totalProductValue" control={control} render={({ field }) => (
            <InputNumber 
              {...field} 
              style={{ width: '100%' }} 
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          )} />
        </Col>
        <Col span={6}>
          <label style={{ fontWeight: 500 }}>Tổng trị giá tiền công</label>
          <Controller name="totalProcessingValue" control={control} render={({ field }) => (
            <InputNumber 
              {...field} 
              style={{ width: '100%' }} 
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          )} />
        </Col>
      </Row>

      <Divider orientation="left" style={{ fontSize: 14, fontWeight: 600, marginTop: 24 }}>
        Thông tin bên nhận gia công
      </Divider>
      <Row gutter={[16, 12]}>
        <Col span={8}>
          <label style={{ fontWeight: 500 }}>Mã bên gia công</label>
          <Controller name="processor.taxCode" control={control} render={({ field }) => (
            <Input {...field} placeholder="Mã số thuế" />
          )} />
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: 500 }}>Tên bên gia công</label>
          <Controller name="processor.name" control={control} render={({ field }) => (
            <Input {...field} placeholder="Tên công ty nhận gia công" />
          )} />
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: 500 }}>Địa chỉ bên gia công</label>
          <Controller name="processor.address" control={control} render={({ field }) => (
            <Input {...field} placeholder="Địa chỉ đầy đủ" />
          )} />
        </Col>
      </Row>

      <Divider orientation="left" style={{ fontSize: 14, fontWeight: 600, marginTop: 24 }}>
        Thông tin bên thuê gia công
      </Divider>
      <Row gutter={[16, 12]}>
        <Col span={8}>
          <label style={{ fontWeight: 500 }}>Mã bên thuê GC</label>
          <Controller name="client.taxCode" control={control} render={({ field }) => (
            <Input {...field} placeholder="Mã số thuế" />
          )} />
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: 500 }}>Tên bên thuê GC <span style={{ color: 'red' }}>*</span></label>
          <Controller name="client.name" control={control} render={({ field }) => (
            <Input {...field} placeholder="Tên công ty thuê gia công" />
          )} />
        </Col>
        <Col span={8}>
          <label style={{ fontWeight: 500 }}>Địa chỉ bên thuê GC <span style={{ color: 'red' }}>*</span></label>
          <Controller name="client.address" control={control} render={({ field }) => (
            <Input {...field} placeholder="Địa chỉ đầy đủ" />
          )} />
        </Col>
      </Row>

      <Row gutter={[16, 12]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <label style={{ fontWeight: 500 }}>Đính kèm nội bộ</label>
          <div style={{ marginTop: 8 }}>
            <Space>
              <Button size="small" icon={<FiUpload />}>Thêm file đính kèm</Button>
              <Button size="small" icon={<FiFileText />}>Xem file</Button>
            </Space>
          </div>
        </Col>
        <Col span={24}>
          <label style={{ fontWeight: 500 }}>Ghi chú</label>
          <Controller name="notes" control={control} render={({ field }) => (
            <TextArea {...field} rows={2} placeholder="Ghi chú thêm..." />
          )} />
        </Col>
      </Row>
    </Card>
  );

  // --- LOGIC MỞ MODAL ---
  const handleOpenTypeModal = () => {
    setTempSelectedTypes(selectedAccessoryTypes.map(i => i.code));
    setIsTypeModalVisible(true);
  };

  const handleConfirmTypeSelection = () => {
    const newSelected = tempSelectedTypes.map(code => {
      const found = ACCESSORY_TYPES_LIST.find(t => t.code === code);
      const existing = selectedAccessoryTypes.find(s => s.code === code);
      return { ...found, id: code, note: existing ? existing.note : "Đã có nội dung" };
    });
    setSelectedAccessoryTypes(newSelected);
    setIsTypeModalVisible(false);
  };

  const renderAccessoryFields = () => (
    <div style={{ padding: "0 16px 16px" }}>
      {/* KHỐI 1: THÔNG TIN CHUNG (Tab con bên trong) */}
      <Card size="small" className="shadow-sm" bodyStyle={{padding: 0}}>
         <Tabs type="card" size="small" tabBarStyle={{margin: 0, background: '#fafafa'}}>
            <Tabs.TabPane tab="Thông tin chung hợp đồng" key="info">
                <div style={{padding: 16}}>
                    <Row gutter={[24, 12]}>
                        {/* Cột trái: Form nhập liệu */}
                        <Col span={12}>
                            <Row gutter={[12, 12]}>
                                <Col span={24}>
                                   <label>Số hợp đồng GC:</label>
                                   <Controller name="baseContractId" control={control} render={({ field }) => (
                                      <Select {...field} size="small" style={{width:'100%'}} placeholder="Chọn HĐ gốc">
                                          <Option value="HD001">2019-HD1910</Option>
                                      </Select>
                                   )} />
                                </Col>
                                <Col span={24}>
                                  <label style={{ fontWeight: 500 }}>Ngày ký HĐGC:</label>
                                  <Controller
                                    name="baseContractSignedDate"
                                    control={control}
                                    render={({ field }) => (
                                      <DatePicker 
                                        {...field} 
                                        size="small" 
                                        style={{ width: '100%' }} // Background xám để thể hiện Read-only logic
                                        format="DD/MM/YYYY" 
                                        value={field.value ? dayjs(field.value) : null} 
                                      />
                                    )}
                                  />
                                </Col>
                                <Col span={24}>
                                   <label>Số phụ kiện: <span style={{color:'red'}}>*</span></label>
                                   <Controller name="accessoryNumber" control={control} render={({ field }) => (
                                      <Input {...field} size="small" />
                                   )} />
                                </Col>
                                <Col span={24}>
                                   <label>Ngày khai báo: <span style={{color:'red'}}>*</span></label>
                                   <Controller name="declarationDate" control={control} render={({ field }) => (
                                      <DatePicker {...field} size="small" style={{width:'100%'}} format="DD/MM/YYYY" 
                                        value={field.value ? dayjs(field.value) : null} 
                                        onChange={d => field.onChange(d)}
                                      />
                                   )} />
                                </Col>
                                <Col span={24}>
                                   <label>Ghi chú:</label>
                                   <Controller name="notes" control={control} render={({ field }) => (
                                      <Input {...field} size="small" />
                                   )} />
                                </Col>
                            </Row>
                        </Col>
                        {/* Cột phải: Thông tin trạng thái (Read-only) */}
                        <Col span={12} style={{borderLeft: '1px solid #f0f0f0'}}>
                            <div style={{textAlign: 'right'}}>
                                <span style={{color: '#1890ff', fontWeight: 'bold', fontSize: 16}}>Đang nhập mới phụ kiện</span>
                                <Divider style={{margin: '12px 0'}} />
                                <Space direction="vertical" align="end" style={{width: '100%'}}>
                                    <Space><span>Số TN:</span> <Input size="small" disabled style={{width: 120}} /></Space>
                                    <Space><span>Ngày TN:</span> <Input size="small" disabled style={{width: 120}} value="11/10/2019" /></Space>
                                    <Space><span>Số tham chiếu:</span> <Input size="small" disabled style={{width: 200}} /></Space>
                                </Space>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Kết quả giao dịch" key="result">
                <div style={{padding: 20, textAlign: 'center', color: '#999'}}>Chưa có thông tin</div>
            </Tabs.TabPane>
         </Tabs>
      </Card>

      {/* KHỐI 2: BẢNG DANH SÁCH LOẠI PHỤ KIỆN (Hình 2 & 3) */}
      <div style={{ marginTop: 16 }}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8}}>
             <span style={{fontWeight: 600, color: '#1890ff'}}>Loại phụ kiện hợp đồng</span>
             <Space>
                 <Button type="primary" ghost size="small" icon={<FiPlus />} onClick={handleOpenTypeModal}>Thêm mới Phụ kiện</Button>
                 <Button danger size="small" icon={<FiTrash2 />} onClick={() => setSelectedAccessoryTypes([])}>Xóa tất cả</Button>
             </Space>
          </div>
          
          <Table 
            bordered 
            size="small" 
            dataSource={selectedAccessoryTypes} 
            rowKey="code" 
            pagination={false}
            columns={[
                { title: 'STT', render: (_,__,i) => i+1, width: 50, align: 'center' },
                { title: 'Mã', dataIndex: 'code', width: 80, align: 'center' },
                { title: 'Nội dung', dataIndex: 'content' },
                { title: 'Ghi chú', dataIndex: 'note', render: (t) => <Input size="small" defaultValue={t} bordered={false} /> }
            ]}
          />

          {/* Nút mở chi tiết */}
          <div style={{marginTop: 16, textAlign: 'right'}}>
             <Button type="primary" icon={<FiLayers />} onClick={() => setIsDetailModalVisible(true)}>
                Chi tiết Phụ kiện...
             </Button>
          </div>
      </div>
    </div>
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
      key: "accessory",
      label: "Phụ kiện hợp đồng",
      children: renderAccessoryFields(), // Chỉ render giao diện Master, chi tiết ẩn trong Modal
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {renderToolbar()}
      
      <Tabs 
        activeKey={mode} 
        onChange={handleModeChange} 
        items={mainTabItems}
        type="line"
        style={{ background: "#f5f5f5" }}
        tabBarStyle={{ paddingLeft: 16, background: "#fff", marginBottom: 0 }}
      />

      {/* --- MODAL 1: CHỌN LOẠI PHỤ KIỆN (Hình 4) --- */}
      <Modal
        title="Chọn loại phụ kiện"
        open={isTypeModalVisible}
        onOk={handleConfirmTypeSelection}
        onCancel={() => setIsTypeModalVisible(false)}
        width={600}
      >
        <Table
            dataSource={ACCESSORY_TYPES_LIST}
            rowKey="code"
            size="small"
            pagination={false}
            scroll={{ y: 300 }}
            columns={[
                { 
                    title: "Chọn", width: 50, align: 'center',
                    render: (_, r) => (
                        <Checkbox 
                            checked={tempSelectedTypes.includes(r.code)}
                            onChange={(e) => {
                                if(e.target.checked) setTempSelectedTypes([...tempSelectedTypes, r.code]);
                                else setTempSelectedTypes(tempSelectedTypes.filter(c => c !== r.code));
                            }}
                        />
                    )
                },
                { title: "Mã", dataIndex: "code", width: 80 },
                { title: "Nội dung", dataIndex: "content" },
            ]}
        />
      </Modal>

      {/* --- MODAL 2: CHI TIẾT NPL/SP (Hình 1) --- */}
      <Modal
        title="Danh mục NPL/SP bổ sung"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        width={1000} // Rộng hơn để chứa bảng
        footer={null} // Tự custom footer nếu cần
        style={{top: 20}}
      >
         {/* Tái sử dụng hàm render bảng của bạn, nhưng bọc trong Modal */}
         <div className="custom-modal-detail">
            {renderDetailsTabs()}
         </div>
      </Modal>
    </div>
  );
}