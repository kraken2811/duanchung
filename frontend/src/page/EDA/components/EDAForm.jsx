

import { useForm, Controller } from "react-hook-form";
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
  Card,
  Alert,
  Popconfirm,
  Tag
} from "antd";
import {
  FiSave,
  FiSend,
  FiPrinter,
  FiPlus,
  FiTrash2,
  FiRefreshCw,
  FiX,
  FiUpload,
  FiEdit,
  FiBox
} from "react-icons/fi";
import { useState } from "react";
import useNotify from "@/components/notification/useNotify";
import { EDA_DEFAULT, GOOD_ITEM_DEFAULT, CONTAINER_DEFAULT, EXPORT_TYPES, INCOTERMS, TRANSPORT_METHODS, CURRENCIES } from "../types/eda.types";

const { TextArea } = Input;
const { Option } = Select;

export default function EDAForm() {
  const notify = useNotify();
  const { register, handleSubmit, setValue, watch, control, reset } = useForm({
    defaultValues: EDA_DEFAULT,
  });

  const [activeTab, setActiveTab] = useState("1");
  const [goods, setGoods] = useState([]);
  const [containers, setContainers] = useState([]);
  const [selectedGood, setSelectedGood] = useState(null);
  const [processingResult, setProcessingResult] = useState(null);

  // ==================== COLUMNS: GOODS (Chi tiết tờ khai) ====================
  const goodsColumns = [
    { title: "STT", dataIndex: "itemNo", width: 50, fixed: "left" },
    { title: "Mã HS", dataIndex: "hsCode", width: 120 },
    { title: "Mô tả hàng hóa", dataIndex: "description", width: 250, ellipsis: true },
    { title: "Xuất xứ", dataIndex: "originCountry", width: 80, align: "center" },
    { title: "Số lượng", dataIndex: "quantity", width: 100, align: "right" },
    { title: "ĐVT", dataIndex: "unit", width: 80, align: "center" },
    { title: "Đơn giá", dataIndex: "unitPrice", width: 120, align: "right", render: (val) => val?.toLocaleString() },
    { title: "Trị giá", dataIndex: "totalValue", width: 150, align: "right", render: (val) => val?.toLocaleString() },
    { title: "Thuế XK (%)", dataIndex: "exportTaxRate", width: 100, align: "right" },
    { title: "Tiền thuế", dataIndex: "exportTaxAmount", width: 120, align: "right", render: (val) => val?.toLocaleString() },
    {
      title: "",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<FiEdit />} onClick={() => setSelectedGood(record)} />
          <Button size="small" danger icon={<FiTrash2 />} onClick={() => handleDeleteGood(record.id)} />
        </Space>
      ),
    },
  ];

  // ==================== COLUMNS: CONTAINERS ====================
  const containerColumns = [
    { title: "STT", render: (_, __, index) => index + 1, width: 50 },
    { title: "Số Container", dataIndex: "containerNo", width: 150 },
    { title: "Số Seal", dataIndex: "sealNo", width: 150 },
    { title: "Loại Container", dataIndex: "containerType", width: 120 },
    { title: "Trọng lượng (KGM)", dataIndex: "grossWeight", width: 120, align: "right" },
    {
      title: "",
      width: 80,
      render: (_, record) => (
        <Button size="small" danger icon={<FiTrash2 />} onClick={() => handleDeleteContainer(record.id)} />
      ),
    },
  ];

  // ==================== HANDLERS: GOODS ====================
  const handleAddGood = () => {
    const newGood = { ...GOOD_ITEM_DEFAULT, id: Date.now(), itemNo: goods.length + 1 };
    setGoods([...goods, newGood]);
    setSelectedGood(newGood);
  };

  const handleSaveGood = () => {
    if (!selectedGood) return;
    const updatedGoods = goods.map((g) => (g.id === selectedGood.id ? selectedGood : g));
    setGoods(updatedGoods);
    notify.success("Đã cập nhật dòng hàng");
  };

  const handleDeleteGood = (id) => {
    setGoods(goods.filter((g) => g.id !== id));
    if (selectedGood?.id === id) setSelectedGood(null);
  };

  // ==================== HANDLERS: CONTAINERS ====================
  const handleAddContainer = () => {
    const newCont = { ...CONTAINER_DEFAULT, id: Date.now() };
    setContainers([...containers, newCont]);
  };

  const handleUpdateContainer = (id, field, value) => {
    const updated = containers.map(c => c.id === id ? { ...c, [field]: value } : c);
    setContainers(updated);
  };

  const handleDeleteContainer = (id) => {
    setContainers(containers.filter((c) => c.id !== id));
  };

  // ==================== ACTIONS ====================
  const onSave = (data) => {
    // Map data to DB Schema structure before sending
    const payload = {
      header: data, // Maps to to_khai_hai_quan
      shipment: { ...data, containers }, // Maps to lo_hang, container, van_don
      contract: { // Maps to hop_dong
        contractNumber: data.contractNumber,
        contractDate: data.contractDate,
        expiryDate: data.contractExpiryDate
      },
      invoice: { // Maps to hoa_don
        invoiceNumber: data.invoiceNumber,
        invoiceDate: data.invoiceDate,
        totalAmount: data.totalInvoiceValue
      },
      details: goods // Maps to chi_tiet_to_khai
    };
    console.log("SAVING TO DB:", payload);
    notify.success("Đã ghi tạm tờ khai (Trạng thái: NHAP)");
  };

  const onDeclare = (data) => {
    console.log("SUBMITTING TO VNACCS:", data);
    notify.success("Đã gửi thông điệp đăng ký mới tờ khai xuất khẩu");
    // Mock result
    setTimeout(() => {
      setProcessingResult({
        declarationNumber: "305512345678",
        registrationDate: new Date().toLocaleDateString("vi-VN"),
        channel: "VANG",
        message: "Chấp nhận thông quan có điều kiện. Yêu cầu xuất trình chứng từ.",
        status: "DA_TIEP_NHAN"
      });
      setActiveTab("4");
    }, 1000);
  };

  // ==================== TAB 1: THÔNG TIN CHUNG ====================
  const renderGeneralInfo = () => (
    <div style={{ height: '65vh', overflowY: 'auto', paddingRight: 8 }}>
      {/* 1. Header Information */}
      <Card title="1. Thông tin đăng ký & Hải quan" size="small" className="mb-4">
        <Row gutter={12}>
          <Col span={6}>
            <label>Số tờ khai</label>
            <Input disabled placeholder="Hệ thống tự cấp" {...register("declarationNumber")} />
          </Col>
          <Col span={6}>
            <label>Mã loại hình *</label>
            <Select 
              className="w-full"
              placeholder="Chọn loại hình" 
              options={EXPORT_TYPES}
              defaultValue="B11"
              onChange={(v) => setValue("declarationType", v)} 
            />
          </Col>
          <Col span={6}>
            <label>Cơ quan Hải quan *</label>
            <Input placeholder="VD: 03CC - HQ Nội Bài" {...register("customsOfficeCode")} />
          </Col>
          <Col span={6}>
            <label>Ngày khai báo (Dự kiến)</label>
            <Controller
              name="registrationDate"
              control={control}
              render={({ field }) => <DatePicker {...field} className="w-full" format="DD/MM/YYYY" />}
            />
          </Col>
        </Row>
      </Card>

      {/* 2. Partners */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="2. Người xuất khẩu (Local)" size="small" className="mb-4">
            <Row gutter={[8, 8]}>
              <Col span={8}><label>Mã số thuế *</label><Input {...register("exporterTaxCode")} /></Col>
              <Col span={16}><label>Tên doanh nghiệp *</label><Input {...register("exporterName")} /></Col>
              <Col span={24}><label>Địa chỉ</label><Input {...register("exporterAddress")} /></Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="3. Người nhập khẩu (Foreign Partner)" size="small" className="mb-4">
            <Row gutter={[8, 8]}>
              <Col span={6}><label>Mã (ID)</label><Input placeholder="ID Đối tác" {...register("importerCode")} /></Col>
              <Col span={12}><label>Tên đối tác *</label><Input {...register("importerName")} /></Col>
              <Col span={6}><label>Mã nước *</label><Input placeholder="VD: US" {...register("importerCountryCode")} /></Col>
              <Col span={24}><label>Địa chỉ</label><Input {...register("importerAddress")} /></Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 3. Logistics & Transport */}
      <Card title="4. Vận đơn & Vận chuyển (Bill & Logistics)" size="small" className="mb-4">
        <Row gutter={[12, 12]}>
          <Col span={6}>
            <label>Số Booking / Vận đơn</label>
            <Input placeholder="Số B/L" {...register("blNumber")} />
          </Col>
          <Col span={6}>
            <label>Số lượng kiện</label>
            <InputNumber className="w-full" min={0} onChange={(v) => setValue("totalPackages", v)} />
          </Col>
          <Col span={6}>
            <label>Tổng trọng lượng (GW)</label>
            <Input.Group compact>
              <InputNumber style={{ width: '70%' }} min={0} onChange={(v) => setValue("totalGrossWeight", v)} />
              <Select style={{ width: '30%' }} defaultValue="KGM" onChange={(v) => setValue("weightUnit", v)}>
                <Option value="KGM">KGM</Option>
                <Option value="TON">TON</Option>
              </Select>
            </Input.Group>
          </Col>
          <Col span={6}>
            <label>Địa điểm lưu kho (Chờ thông quan)</label>
            <Input placeholder="Mã kho" {...register("warehouseCode")} />
          </Col>
          
          <Col span={6}>
            <label>Phương tiện vận chuyển</label>
            <Select className="w-full" options={TRANSPORT_METHODS} onChange={(v) => setValue("transportMethod", v)} />
          </Col>
          <Col span={6}>
            <label>Tên tàu / Số chuyến</label>
            <Input placeholder="Tên phương tiện" {...register("vehicleName")} />
          </Col>
          <Col span={6}>
            <label>Địa điểm xếp hàng (VN)</label>
            <Input placeholder="Mã cảng đi" {...register("loadingPort")} />
          </Col>
          <Col span={6}>
            <label>Địa điểm dỡ hàng (Nước ngoài)</label>
            <Input placeholder="Mã cảng đến" {...register("dischargePort")} />
          </Col>
        </Row>
      </Card>

      {/* 4. Commercial Info */}
      <Card title="5. Hóa đơn & Hợp đồng (Invoice & Contract)" size="small">
        <Row gutter={[12, 12]}>
          <Col span={6}>
            <label>Số Hợp đồng</label>
            <Input {...register("contractNumber")} />
          </Col>
          <Col span={6}>
            <label>Ngày Hợp đồng</label>
            <Controller name="contractDate" control={control} render={({field}) => <DatePicker {...field} className="w-full" format="DD/MM/YYYY" />} />
          </Col>
          <Col span={6}>
            <label>Thời hạn HĐ</label>
            <Controller name="contractExpiryDate" control={control} render={({field}) => <DatePicker {...field} className="w-full" format="DD/MM/YYYY" />} />
          </Col>
          <Col span={6}><Divider type="vertical" /></Col>

          <Col span={6}>
            <label>Số Hóa đơn *</label>
            <Input {...register("invoiceNumber")} />
          </Col>
          <Col span={6}>
            <label>Ngày Hóa đơn</label>
            <Controller name="invoiceDate" control={control} render={({field}) => <DatePicker {...field} className="w-full" format="DD/MM/YYYY" />} />
          </Col>
          <Col span={6}>
            <label>Tổng trị giá hóa đơn</label>
            <Input.Group compact>
              <InputNumber style={{ width: '70%' }} formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} onChange={(v) => setValue("totalInvoiceValue", v)} />
              <Select style={{ width: '30%' }} options={CURRENCIES} defaultValue="USD" onChange={(v) => setValue("currency", v)} />
            </Input.Group>
          </Col>
          <Col span={6}>
            <label>Điều kiện giá (Incoterms)</label>
            <Select className="w-full" options={INCOTERMS} onChange={(v) => setValue("incoterms", v)} />
          </Col>
        </Row>
      </Card>
    </div>
  );

  // ==================== TAB 2: CONTAINER ====================
  const renderContainerInfo = () => (
    <div style={{ height: '65vh' }}>
      <div className="mb-4 flex justify-between">
        <span>Khai báo danh sách Container cho lô hàng (Bảng: container)</span>
        <Button type="primary" icon={<FiPlus />} onClick={handleAddContainer}>Thêm dòng</Button>
      </div>
      <Table
        columns={[
          { title: "STT", render: (_, __, index) => index + 1, width: 60, align: 'center' },
          { 
            title: "Số Container", 
            dataIndex: "containerNo", 
            render: (text, record) => <Input value={text} onChange={(e) => handleUpdateContainer(record.id, 'containerNo', e.target.value)} />
          },
          { 
            title: "Số Seal (Niêm phong)", 
            dataIndex: "sealNo",
            render: (text, record) => <Input value={text} onChange={(e) => handleUpdateContainer(record.id, 'sealNo', e.target.value)} />
          },
          { 
            title: "Loại Container", 
            dataIndex: "containerType", width: 150,
            render: (text, record) => (
              <Select style={{width: '100%'}} value={text} onChange={(v) => handleUpdateContainer(record.id, 'containerType', v)}>
                <Option value="20DC">20DC - General</Option>
                <Option value="40DC">40DC - General</Option>
                <Option value="40HC">40HC - High Cube</Option>
                <Option value="20RF">20RF - Reefer</Option>
              </Select>
            )
          },
          { 
            title: "Trọng lượng hàng (KGM)", 
            dataIndex: "grossWeight", width: 150,
            render: (val, record) => <InputNumber min={0} value={val} onChange={(v) => handleUpdateContainer(record.id, 'grossWeight', v)} style={{width: '100%'}} />
          },
          {
            width: 60,
            render: (_, record) => <Button danger icon={<FiTrash2 />} size="small" onClick={() => handleDeleteContainer(record.id)} />
          }
        ]}
        dataSource={containers}
        rowKey="id"
        pagination={false}
        bordered
        size="small"
        scroll={{ y: 400 }}
      />
    </div>
  );

  // ==================== TAB 3: DANH SÁCH HÀNG ====================
  const renderGoodsList = () => (
    <div style={{ height: '65vh', display: 'flex', flexDirection: 'column' }}>
      <div className="mb-4">
        <Space>
          <Button type="primary" icon={<FiPlus />} onClick={handleAddGood}>Thêm hàng hóa</Button>
          <Button icon={<FiUpload />}>Import Excel</Button>
        </Space>
      </div>

      <Table
        columns={goodsColumns}
        dataSource={goods}
        rowKey="id"
        pagination={false}
        bordered
        size="small"
        scroll={{ x: 1300, y: 250 }}
        onRow={(record) => ({
          onClick: () => setSelectedGood(record),
          style: { cursor: "pointer", background: selectedGood?.id === record.id ? "#e6f7ff" : undefined },
        })}
        style={{ marginBottom: 16 }}
      />

      {/* Form chi tiết hàng hóa */}
      {selectedGood && (
        <Card title={`Chi tiết dòng hàng số: ${selectedGood.itemNo}`} size="small" extra={<Button type="primary" icon={<FiSave />} size="small" onClick={handleSaveGood}>Lưu dòng hàng</Button>}>
          <Row gutter={[12, 12]}>
            <Col span={12}>
              <label>Tên hàng hóa (Mô tả) *</label>
              <TextArea rows={2} value={selectedGood.description} onChange={(e) => setSelectedGood({ ...selectedGood, description: e.target.value })} />
            </Col>
            <Col span={4}>
              <label>Mã HS *</label>
              <Input value={selectedGood.hsCode} onChange={(e) => setSelectedGood({ ...selectedGood, hsCode: e.target.value })} />
            </Col>
            <Col span={4}>
              <label>Xuất xứ</label>
              <Input value={selectedGood.originCountry} onChange={(e) => setSelectedGood({ ...selectedGood, originCountry: e.target.value })} />
            </Col>
            <Col span={4}>
              <label>Đơn vị tính</label>
              <Input value={selectedGood.unit} onChange={(e) => setSelectedGood({ ...selectedGood, unit: e.target.value })} />
            </Col>

            <Col span={6}>
              <label>Số lượng</label>
              <InputNumber 
                className="w-full" 
                value={selectedGood.quantity} 
                onChange={(v) => {
                  const total = v * selectedGood.unitPrice;
                  setSelectedGood({...selectedGood, quantity: v, totalValue: total});
                }} 
              />
            </Col>
            <Col span={6}>
              <label>Đơn giá</label>
              <InputNumber 
                className="w-full" 
                value={selectedGood.unitPrice} 
                onChange={(v) => {
                  const total = selectedGood.quantity * v;
                  setSelectedGood({...selectedGood, unitPrice: v, totalValue: total});
                }} 
              />
            </Col>
            <Col span={6}>
              <label>Trị giá nguyên tệ</label>
              <InputNumber className="w-full" value={selectedGood.totalValue} disabled />
            </Col>
            <Col span={6} className="bg-gray-50 p-2 rounded border">
              <label className="font-bold text-blue-600">Thuế Xuất Khẩu</label>
              <Input.Group compact>
                <InputNumber 
                  style={{ width: '40%' }} 
                  placeholder="%" 
                  value={selectedGood.exportTaxRate} 
                  onChange={(v) => {
                    const tax = (selectedGood.totalValue * v) / 100;
                    setSelectedGood({...selectedGood, exportTaxRate: v, exportTaxAmount: tax});
                  }}
                />
                <InputNumber style={{ width: '60%' }} value={selectedGood.exportTaxAmount} disabled formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
              </Input.Group>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );

  // ==================== TAB 4: KẾT QUẢ XỬ LÝ ====================
  const renderProcessingResult = () => (
    <div style={{ height: '65vh' }}>
      {processingResult ? (
        <Card className="shadow-md">
          <Alert
            message={`Phân luồng: ${processingResult.channel}`}
            description={processingResult.message}
            type={processingResult.channel === "XANH" ? "success" : processingResult.channel === "VANG" ? "warning" : "error"}
            showIcon
            className="mb-4"
          />
          <Row gutter={24}>
            <Col span={12}>
              <p><strong>Số tờ khai:</strong> {processingResult.declarationNumber}</p>
              <p><strong>Ngày đăng ký:</strong> {processingResult.registrationDate}</p>
            </Col>
            <Col span={12}>
              <p><strong>Trạng thái:</strong> <Tag color="blue">{processingResult.status}</Tag></p>
            </Col>
          </Row>
        </Card>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <FiBox size={48} />
          <p className="mt-4">Chưa có dữ liệu phản hồi từ Hải quan. Vui lòng thực hiện Khai báo trước.</p>
        </div>
      )}
    </div>
  );

  const tabItems = [
    { key: "1", label: "Thông tin chung (General)", children: renderGeneralInfo() },
    { key: "2", label: "Thông tin Container", children: renderContainerInfo() },
    { key: "3", label: "Danh sách hàng hóa", children: renderGoodsList() },
    { key: "4", label: "Kết quả xử lý", children: renderProcessingResult() },
  ];

  return (
    <div>
      {/* TOOLBAR */}
      <Card bodyStyle={{ padding: "12px 16px" }} className="mb-4 bg-gray-50 sticky top-0 z-10 shadow-sm">
        <Space wrap>
          <Button icon={<FiSave />} size="large" onClick={handleSubmit(onSave)}>Ghi tạm</Button>
          <Button type="primary" icon={<FiSend />} size="large" onClick={handleSubmit(onDeclare)}>Khai báo (EDA)</Button>
          <Button icon={<FiRefreshCw />} size="large">Lấy phản hồi</Button>
          <Button icon={<FiPrinter />} size="large">In tờ khai</Button>
          <Divider type="vertical" className="h-8" />
          <Button icon={<FiPlus />} size="large" onClick={() => reset(EDA_DEFAULT)}>Tạo mới</Button>
          <Button icon={<FiX />} size="large">Đóng</Button>
        </Space>
      </Card>

      {/* MAIN TABS */}
      <Card className="shadow-sm">
        <Tabs activeKey={activeTab} items={tabItems} onChange={setActiveTab} size="large" />
      </Card>
    </div>
  );
}

