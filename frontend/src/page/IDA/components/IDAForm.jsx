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
  message,
} from "antd";
import { 
  FiPlus, 
  FiTrash2, 
  FiUpload, 
  FiSave, 
  FiSend, 
  FiPrinter, 
  FiEdit 
} from "react-icons/fi";
import { useState } from "react";
import useNotify from "@/components/notification/useNotify";
// Giả định đường dẫn import của bạn
import { IDA_DEFAULT } from "../types"; 
import { formatIDA } from "../utils/status";

const { TextArea } = Input;

// DANH SÁCH CÁC NƯỚC (Có thể bổ sung thêm)
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

export default function IDAForm() {
  const notify = useNotify();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: IDA_DEFAULT,
  });

  const [goods, setGoods] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState("1");

  // --- CÁC HÀM XỬ LÝ HÀNG HÓA ---

  // 1. Thêm hàng mới
  const addGoods = () => {
    const newItem = {
      id: Date.now(),
      index: goods.length + 1,
      description: "",
      hsCode: "",
      origin: "CN", // Mặc định là Trung Quốc, có thể đổi thành ""
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

  // 4. Xử lý thay đổi dữ liệu
  const handleDetailChange = (field, value) => {
    setEditingItem((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "quantity" || field === "unitPrice") {
        updated.totalValue = (updated.quantity || 0) * (updated.unitPrice || 0);
      }
      return updated;
    });
  };

  // 5. Lưu lại chi tiết
  const saveGoodDetail = () => {
    if (!editingItem) return;
    
    const updatedGoods = goods.map((item) => 
      item.id === editingItem.id ? editingItem : item
    );
    setGoods(updatedGoods);
    message.success("Đã cập nhật chi tiết hàng hóa");
  };

  // --- CẤU HÌNH CỘT BẢNG ---
  const goodsColumns = [
    { title: "STT", dataIndex: "index", width: 50, align: "center" },
    { title: "Tên hàng", dataIndex: "description", width: 250, ellipsis: true },
    { title: "Mã HS", dataIndex: "hsCode", width: 100 },
    { title: "Xuất xứ", dataIndex: "origin", width: 80, align: "center" },
    { title: "Số lượng", dataIndex: "quantity", width: 100, align: "right" },
    { title: "Đơn vị", dataIndex: "unit", width: 80, align: "center" },
    { 
      title: "Đơn giá", 
      dataIndex: "unitPrice", 
      width: 120, 
      align: "right",
      render: (val) => val ? val.toLocaleString() : 0 
    },
    { 
      title: "Trị giá", 
      dataIndex: "totalValue", 
      width: 120, 
      align: "right",
      render: (val) => val ? val.toLocaleString() : 0 
    },
    {
      title: "Thao tác",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <FiEdit
            style={{ cursor: "pointer", color: "#1677ff", fontSize: 16 }}
            onClick={(e) => {
              e.stopPropagation();
              onEditGood(record);
            }}
            title="Sửa"
          />
          <FiTrash2
            style={{ cursor: "pointer", color: "red", fontSize: 16 }}
            onClick={(e) => removeGoods(record.id, e)}
            title="Xóa"
          />
        </Space>
      ),
    },
  ];

  // --- LOGIC CHUNG ---
  const onSave = (data) => {
    const final = formatIDA({ ...data, goods });
    console.log("LƯU IDA:", final);
    notify.success("Đã lưu thông tin tờ khai");
  };

  const onDeclare = (data) => {
    const final = formatIDA({ ...data, goods });
    console.log("KHAI BÁO IDA:", final);
    notify.success("Đã gửi tờ khai lên hệ thống VNACCS");
  };

  // --- RENDER CÁC TAB ---
  const renderGeneralInfo1 = () => (
    <div>
      <h3>Thông tin đầu tờ khai</h3>
      <Row gutter={16}>
        <Col span={6}><label>Số tờ khai</label><Input disabled placeholder="Hệ thống tự cấp" {...register("declarationNumber")} /></Col>
        <Col span={6}><label>Mã loại hình *</label><Input placeholder="VD: A11, A12" {...register("type")} /></Col>
        <Col span={6}><label>Cơ quan hải quan *</label><Input placeholder="Mã chi cục HQ" {...register("customsOffice")} /></Col>
        <Col span={6}><label>Ngày đăng ký *</label><DatePicker style={{ width: "100%" }} onChange={(d) => setValue("regDate", d)} /></Col>
      </Row>
      <Divider />
      <h3>Người nhập khẩu</h3>
      <Row gutter={16}>
        <Col span={8}><label>Mã số thuế *</label><Input placeholder="MST" {...register("importer.taxCode")} /></Col>
        <Col span={16}><label>Tên doanh nghiệp *</label><Input placeholder="Tên công ty" {...register("importer.name")} /></Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={18}><label>Địa chỉ</label><Input placeholder="Địa chỉ" {...register("importer.address")} /></Col>
        <Col span={6}><label>Điện thoại</label><Input placeholder="SĐT" {...register("importer.phone")} /></Col>
      </Row>
      <Divider />
      <h3>Người xuất khẩu</h3>
      <Row gutter={16}>
        <Col span={12}><label>Tên người xuất khẩu</label><Input placeholder="Tên nhà cung cấp" {...register("exporter.name")} /></Col>
        <Col span={12}><label>Địa chỉ</label><Input placeholder="Địa chỉ" {...register("exporter.address")} /></Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={6}><label>Mã nước *</label><Input placeholder="VD: CN, US" {...register("exporter.countryCode")} /></Col>
      </Row>
      <Divider />
      <h3>Vận đơn (Bill of Lading)</h3>
      <Row gutter={16}>
        <Col span={8}><label>Số vận đơn *</label><Input placeholder="Số B/L" {...register("billOfLading.number")} /></Col>
        <Col span={8}><label>Ngày vận đơn</label><DatePicker style={{ width: "100%" }} onChange={(d) => setValue("billOfLading.date", d)} /></Col>
        <Col span={4}><label>Số lượng kiện</label><InputNumber style={{ width: "100%" }} onChange={(v) => setValue("billOfLading.packages", v)} /></Col>
        <Col span={4}>
          <label>Loại kiện</label>
          <Select style={{ width: "100%" }} onChange={(v) => setValue("billOfLading.packageType", v)}>
            <Select.Option value="CT">Thùng carton</Select.Option>
            <Select.Option value="PL">Pallet</Select.Option>
          </Select>
        </Col>
      </Row>
    </div>
  );

  const renderGeneralInfo2 = () => (
    <div>
      <h3>Hóa đơn thương mại</h3>
      <Row gutter={16}>
        <Col span={8}><label>Số hóa đơn *</label><Input {...register("invoice.number")} /></Col>
        <Col span={8}><label>Ngày hóa đơn</label><DatePicker style={{ width: "100%" }} onChange={(d) => setValue("invoice.date", d)} /></Col>
        <Col span={8}>
          <label>Điều kiện giá</label>
          <Select style={{ width: "100%" }} onChange={(v) => setValue("invoice.incoterms", v)}>
            <Select.Option value="CIF">CIF</Select.Option>
            <Select.Option value="FOB">FOB</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={6}>
          <label>Mã đồng tiền</label>
          <Select style={{ width: "100%" }} defaultValue="USD" onChange={(v) => setValue("invoice.currency", v)}>
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="VND">VND</Select.Option>
          </Select>
        </Col>
        <Col span={9}><label>Tổng trị giá</label><InputNumber style={{ width: "100%" }} onChange={(v) => setValue("invoice.totalValue", v)} /></Col>
      </Row>
      <Divider />
      <h3>Thông tin khác</h3>
      <Row gutter={16}>
        <Col span={24}><label>Ghi chú</label><TextArea rows={3} {...register("notes")} /></Col>
      </Row>
    </div>
  );

  // Tab 3: Danh sách hàng hóa (ĐÃ CẬP NHẬT SELECT XUẤT XỨ)
  const renderGoodsList = () => (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button className="btn-hover-white" icon={<FiPlus />} onClick={addGoods}>
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
          style: { 
            cursor: "pointer", 
            background: editingItem?.id === record.id ? "#e6f7ff" : "inherit" 
          }
        })}
      />

      {editingItem && (
        <>
          <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: 8, border: "1px solid #d9d9d9", marginTop: 20 }}>
            
            <Row gutter={16}>
              <Col span={8}>
                <label>Mã số hàng hóa (HS Code) *</label>
                <Input 
                  value={editingItem.hsCode}
                  onChange={(e) => handleDetailChange("hsCode", e.target.value)}
                  placeholder="8 hoặc 10 số"
                />
              </Col>
              
              {/* --- ĐÃ SỬA: DÙNG SELECT CHO XUẤT XỨ --- */}
              <Col span={8}>
                <label>Xuất xứ (Origin) *</label>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Chọn nước"
                  value={editingItem.origin}
                  onChange={(value) => handleDetailChange("origin", value)}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={COUNTRY_OPTIONS}
                />
              </Col>
              {/* ------------------------------------- */}

              <Col span={8}>
                <label>Mã quản lý riêng</label>
                <Input placeholder="Nếu có" />
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={6}>
                <label>Số lượng *</label>
                <InputNumber 
                  style={{ width: "100%" }} 
                  value={editingItem.quantity}
                  onChange={(v) => handleDetailChange("quantity", v)}
                />
              </Col>
              <Col span={6}>
                <label>Đơn vị tính</label>
                <Select 
                  style={{ width: "100%" }} 
                  value={editingItem.unit}
                  onChange={(v) => handleDetailChange("unit", v)}
                >
                  <Select.Option value="PCE">Cái (PCE)</Select.Option>
                  <Select.Option value="KGM">Kg (KGM)</Select.Option>
                  <Select.Option value="SET">Bộ (SET)</Select.Option>
                </Select>
              </Col>
              <Col span={6}>
                <label>Đơn giá hóa đơn</label>
                <InputNumber 
                  style={{ width: "100%" }} 
                  value={editingItem.unitPrice}
                  onChange={(v) => handleDetailChange("unitPrice", v)}
                />
              </Col>
              <Col span={6}>
                <label>Trị giá hóa đơn</label>
                <InputNumber 
                  style={{ width: "100%" }} 
                  disabled 
                  value={editingItem.totalValue}
                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={8}>
                <label>Thuế suất NK (%)</label>
                <InputNumber 
                  style={{ width: "100%" }} 
                  value={editingItem.taxRate}
                  onChange={(v) => handleDetailChange("taxRate", v)}
                />
              </Col>
              <Col span={8}>
                <label>Thuế suất VAT (%)</label>
                <InputNumber 
                  style={{ width: "100%" }} 
                  value={editingItem.vatRate}
                  onChange={(v) => handleDetailChange("vatRate", v)}
                />
              </Col>
              <Col span={8}>
                <label>Mã miễn/giảm thuế</label>
                <Input placeholder="Nếu có" />
              </Col>
            </Row>
            
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={24}>
                <label style={{ fontWeight: 600 }}>Mô tả hàng hóa *</label>
                <TextArea 
                  rows={3} 
                  value={editingItem.description}
                  onChange={(e) => handleDetailChange("description", e.target.value)}
                  placeholder="Mô tả chi tiết hàng hóa bằng tiếng Việt..." 
                />
              </Col>
            </Row>

            <Row justify="end" style={{ marginTop: 20 }}>
              <Space>
                 <Button onClick={() => setEditingItem(null)}>Đóng</Button>
                 <Button 
                    type="primary" 
                    icon={<FiSave />} 
                    onClick={saveGoodDetail}
                    style={{ minWidth: 120 }}
                 >
                    Lưu dòng hàng
                 </Button>
              </Space>
            </Row>
          </div>
        </>
      )}
    </div>
  );

  const renderAttachments = () => (
    <div>
      <h3>Đính kèm chứng từ điện tử</h3>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Button icon={<FiUpload />}>Tải lên Hợp đồng</Button>
        <Button icon={<FiUpload />}>Tải lên Invoice</Button>
        <Button icon={<FiUpload />}>Tải lên C/O</Button>
      </Space>
    </div>
  );

  const tabItems = [
    { key: "1", label: "Thông tin chung 1", children: renderGeneralInfo1() },
    { key: "2", label: "Thông tin chung 2", children: renderGeneralInfo2() },
    { key: "3", label: "Danh sách hàng", children: renderGoodsList() },
    { key: "4", label: "Đính kèm chứng từ", children: renderAttachments() },
  ];

  return (
    <div>
      <style>{`
        .btn-hover-white:hover {
          background-color: #003366 !important;
          color: white !important;
          border-color: #003366 !important;
        }
        .btn-hover-danger:hover {
          background-color: #ff4d4f !important;
          color: white !important;
          border-color: #ff4d4f !important;
        }
        .ant-btn-primary:hover {
          color: white !important;
        }
      `}</style>

      <div
        style={{
          background: "#fff",
          padding: "12px 16px",
          borderBottom: "1px solid #d9d9d9",
          marginBottom: 16,
        }}
      >
        <Space>
          <Button className="btn-hover-white" icon={<FiSave />} onClick={handleSubmit(onSave)}>
            Ghi
          </Button>
          <Button type="primary" icon={<FiSend />} onClick={handleSubmit(onDeclare)}>
            Khai báo
          </Button>
          <Button className="btn-hover-white" icon={<FiPrinter />}>
            In
          </Button>
          <Divider type="vertical" />
          <Button className="btn-hover-white">Lấy phản hồi</Button>
          <Button className="btn-hover-white">Đăng ký mới</Button>
          <Button danger className="btn-hover-danger">
            Xóa
          </Button>
        </Space>
      </div>

      <Tabs activeKey={activeTab} items={tabItems} onChange={setActiveTab} />
    </div>
  );
}