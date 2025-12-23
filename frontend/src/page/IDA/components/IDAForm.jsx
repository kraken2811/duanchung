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
} from "antd";
import { FiPlus, FiTrash2, FiUpload, FiSave, FiSend, FiPrinter } from "react-icons/fi";
import { useState } from "react";
import useNotify from "@/components/notification/useNotify";
import { IDA_DEFAULT } from "../types";
import { formatIDA } from "../utils/status";
import "../css/IDAForm.css";
const { TextArea } = Input;

export default function IDAForm() {
  const notify = useNotify();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: IDA_DEFAULT,
  });

  const [goods, setGoods] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  // Columns cho bảng hàng hóa
  const goodsColumns = [
    { title: "STT", dataIndex: "index", width: 60 },
    { title: "Tên hàng", dataIndex: "description", width: 200 },
    { title: "Mã HS", dataIndex: "hsCode", width: 100 },
    { title: "Xuất xứ", dataIndex: "origin", width: 80 },
    { title: "Số lượng", dataIndex: "quantity", width: 100 },
    { title: "Đơn vị", dataIndex: "unit", width: 80 },
    { title: "Đơn giá", dataIndex: "unitPrice", width: 120 },
    { title: "Trị giá", dataIndex: "totalValue", width: 120 },
    {
      title: "",
      width: 60,
      render: (_, record) => (
        <FiTrash2
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => removeGoods(record.id)}
        />
      ),
    },
  ];

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
    };
    setGoods([...goods, newItem]);
  };

  const removeGoods = (id) => {
    setGoods(goods.filter((g) => g.id !== id));
  };

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

  // Tab 1: Thông tin chung 1
  const renderGeneralInfo1 = () => (
    <div>
      <h3>Thông tin đầu tờ khai</h3>
      <Row gutter={16}>
        <Col span={6}>
          <label>Số tờ khai</label>
          <Input disabled placeholder="Hệ thống tự cấp" {...register("declarationNumber")} />
        </Col>
        <Col span={6}>
          <label>Mã loại hình *</label>
          <Input placeholder="VD: A11, A12" {...register("type")} />
        </Col>
        <Col span={6}>
          <label>Cơ quan hải quan *</label>
          <Input placeholder="Mã chi cục HQ" {...register("customsOffice")} />
        </Col>
        <Col span={6}>
          <label>Ngày đăng ký *</label>
          <DatePicker
            style={{ width: "100%" }}
            onChange={(d) => setValue("regDate", d)}
          />
        </Col>
      </Row>

      <Divider />

      <h3>Người nhập khẩu</h3>
      <Row gutter={16}>
        <Col span={8}>
          <label>Mã số thuế *</label>
          <Input placeholder="MST" {...register("importer.taxCode")} />
        </Col>
        <Col span={16}>
          <label>Tên doanh nghiệp *</label>
          <Input placeholder="Tên công ty" {...register("importer.name")} />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={18}>
          <label>Địa chỉ</label>
          <Input placeholder="Địa chỉ" {...register("importer.address")} />
        </Col>
        <Col span={6}>
          <label>Điện thoại</label>
          <Input placeholder="SĐT" {...register("importer.phone")} />
        </Col>
      </Row>

      <Divider />

      <h3>Người xuất khẩu</h3>
      <Row gutter={16}>
        <Col span={12}>
          <label>Tên người xuất khẩu</label>
          <Input placeholder="Tên nhà cung cấp" {...register("exporter.name")} />
        </Col>
        <Col span={12}>
          <label>Địa chỉ</label>
          <Input placeholder="Địa chỉ" {...register("exporter.address")} />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={6}>
          <label>Mã nước *</label>
          <Input placeholder="VD: CN, US" {...register("exporter.countryCode")} />
        </Col>
      </Row>

      <Divider />

      <h3>Vận đơn (Bill of Lading)</h3>
      <Row gutter={16}>
        <Col span={8}>
          <label>Số vận đơn *</label>
          <Input placeholder="Số B/L" {...register("billOfLading.number")} />
        </Col>
        <Col span={8}>
          <label>Ngày vận đơn</label>
          <DatePicker
            style={{ width: "100%" }}
            onChange={(d) => setValue("billOfLading.date", d)}
          />
        </Col>
        <Col span={4}>
          <label>Số lượng kiện</label>
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Số kiện"
            onChange={(v) => setValue("billOfLading.packages", v)}
          />
        </Col>
        <Col span={4}>
          <label>Loại kiện</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Loại"
            onChange={(v) => setValue("billOfLading.packageType", v)}
          >
            <Select.Option value="CT">Thùng carton</Select.Option>
            <Select.Option value="PL">Pallet</Select.Option>
            <Select.Option value="BG">Bao</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={8}>
          <label>Tổng trọng lượng (KGM)</label>
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Trọng lượng"
            onChange={(v) => setValue("billOfLading.grossWeight", v)}
          />
        </Col>
        <Col span={8}>
          <label>Phương thức vận chuyển</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn"
            onChange={(v) => setValue("transport.method", v)}
          >
            <Select.Option value="1">Đường biển</Select.Option>
            <Select.Option value="4">Hàng không</Select.Option>
            <Select.Option value="3">Đường bộ</Select.Option>
          </Select>
        </Col>
        <Col span={8}>
          <label>Tên phương tiện</label>
          <Input placeholder="Tên tàu/máy bay" {...register("transport.vehicle")} />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={8}>
          <label>Cảng xếp hàng</label>
          <Input placeholder="Mã cảng xuất phát" {...register("transport.portOfLoading")} />
        </Col>
        <Col span={8}>
          <label>Cảng dỡ hàng</label>
          <Input placeholder="Mã cảng đến" {...register("transport.portOfDischarge")} />
        </Col>
        <Col span={8}>
          <label>Địa điểm lưu kho</label>
          <Input placeholder="Mã kho/bãi" {...register("warehouse.code")} />
        </Col>
      </Row>
    </div>
  );

  // Tab 2: Thông tin chung 2
  const renderGeneralInfo2 = () => (
    <div>
      <h3>Hóa đơn thương mại (Commercial Invoice)</h3>
      <Row gutter={16}>
        <Col span={8}>
          <label>Số hóa đơn *</label>
          <Input placeholder="Số Invoice" {...register("invoice.number")} />
        </Col>
        <Col span={8}>
          <label>Ngày hóa đơn</label>
          <DatePicker
            style={{ width: "100%" }}
            onChange={(d) => setValue("invoice.date", d)}
          />
        </Col>
        <Col span={8}>
          <label>Điều kiện giá (Incoterms) *</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn"
            onChange={(v) => setValue("invoice.incoterms", v)}
          >
            <Select.Option value="CIF">CIF</Select.Option>
            <Select.Option value="FOB">FOB</Select.Option>
            <Select.Option value="EXW">EXW</Select.Option>
            <Select.Option value="CFR">CFR</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={6}>
          <label>Mã đồng tiền</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Tiền tệ"
            defaultValue="USD"
            onChange={(v) => setValue("invoice.currency", v)}
          >
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="EUR">EUR</Select.Option>
            <Select.Option value="JPY">JPY</Select.Option>
            <Select.Option value="VND">VND</Select.Option>
          </Select>
        </Col>
        <Col span={9}>
          <label>Tổng trị giá hóa đơn</label>
          <InputNumber
            style={{ width: "100%" }}
            placeholder="0.00"
            onChange={(v) => setValue("invoice.totalValue", v)}
          />
        </Col>
        <Col span={9}>
          <label>Phương thức thanh toán</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn"
            onChange={(v) => setValue("invoice.paymentMethod", v)}
          >
            <Select.Option value="TT">Chuyển khoản (TT)</Select.Option>
            <Select.Option value="LC">Tín dụng chứng từ (LC)</Select.Option>
            <Select.Option value="KC">Khác</Select.Option>
          </Select>
        </Col>
      </Row>

      <Divider />

      <h3>Trị giá tính thuế (Customs Value)</h3>
      <Row gutter={16}>
        <Col span={8}>
          <label>Phương pháp xác định trị giá</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn"
            defaultValue="1"
            onChange={(v) => setValue("customsValue.method", v)}
          >
            <Select.Option value="1">PP1 - Trị giá giao dịch</Select.Option>
            <Select.Option value="2">PP2 - Trị giá hàng đồng nhất</Select.Option>
            <Select.Option value="6">PP6 - Phương pháp khác</Select.Option>
          </Select>
        </Col>
        <Col span={8}>
          <label>Phí vận chuyển (Freight)</label>
          <InputNumber
            style={{ width: "100%" }}
            placeholder="0.00"
            onChange={(v) => setValue("customsValue.freight", v)}
          />
        </Col>
        <Col span={8}>
          <label>Phí bảo hiểm (Insurance)</label>
          <InputNumber
            style={{ width: "100%" }}
            placeholder="0.00"
            onChange={(v) => setValue("customsValue.insurance", v)}
          />
        </Col>
      </Row>

      <Divider />

      <h3>Thuế và Bảo lãnh</h3>
      <Row gutter={16}>
        <Col span={8}>
          <label>Người nộp thuế</label>
          <Select
            style={{ width: "100%" }}
            defaultValue="1"
            onChange={(v) => setValue("tax.payer", v)}
          >
            <Select.Option value="1">Người nhập khẩu</Select.Option>
            <Select.Option value="2">Đại lý hải quan</Select.Option>
          </Select>
        </Col>
        <Col span={8}>
          <label>Thời hạn nộp thuế</label>
          <Select
            style={{ width: "100%" }}
            onChange={(v) => setValue("tax.paymentDeadline", v)}
          >
            <Select.Option value="1">Nộp ngay</Select.Option>
            <Select.Option value="2">Bảo lãnh</Select.Option>
          </Select>
        </Col>
      </Row>

      <Divider />

      <h3>Thông tin khác</h3>
      <Row gutter={16}>
        <Col span={12}>
          <label>Số hợp đồng</label>
          <Input placeholder="Số hợp đồng" {...register("contract.number")} />
        </Col>
        <Col span={12}>
          <label>Ngày hợp đồng</label>
          <DatePicker
            style={{ width: "100%" }}
            onChange={(d) => setValue("contract.date", d)}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={24}>
          <label>Ghi chú</label>
          <TextArea
            rows={3}
            placeholder="Các ghi chú bổ sung cho tờ khai"
            {...register("notes")}
          />
        </Col>
      </Row>
    </div>
  );

  // Tab 3: Danh sách hàng hóa
  const renderGoodsList = () => (
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
      />

      {goods.length > 0 && (
        <>
          <Divider />
          <div style={{ background: "#f5f5f5", padding: 16, borderRadius: 4 }}>
            <h4>Chi tiết hàng hóa được chọn</h4>
            <Row gutter={16}>
              <Col span={24}>
                <label>Mô tả hàng hóa</label>
                <TextArea rows={2} placeholder="Mô tả chi tiết hàng hóa bằng tiếng Việt" />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={8}>
                <label>Mã số hàng hóa (HS Code) *</label>
                <Input placeholder="8 hoặc 10 số" />
              </Col>
              <Col span={8}>
                <label>Xuất xứ (Origin) *</label>
                <Input placeholder="Mã nước sản xuất" />
              </Col>
              <Col span={8}>
                <label>Mã quản lý riêng</label>
                <Input placeholder="Nếu có" />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={6}>
                <label>Số lượng *</label>
                <InputNumber style={{ width: "100%" }} placeholder="0" />
              </Col>
              <Col span={6}>
                <label>Đơn vị tính</label>
                <Select style={{ width: "100%" }} placeholder="Đơn vị">
                  <Select.Option value="PCE">Cái (PCE)</Select.Option>
                  <Select.Option value="KGM">Kg (KGM)</Select.Option>
                  <Select.Option value="SET">Bộ (SET)</Select.Option>
                </Select>
              </Col>
              <Col span={6}>
                <label>Đơn giá hóa đơn</label>
                <InputNumber style={{ width: "100%" }} placeholder="0.00" />
              </Col>
              <Col span={6}>
                <label>Trị giá hóa đơn</label>
                <InputNumber style={{ width: "100%" }} disabled placeholder="Tự động tính" />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 12 }}>
              <Col span={8}>
                <label>Thuế suất NK (%)</label>
                <InputNumber style={{ width: "100%" }} placeholder="0" />
              </Col>
              <Col span={8}>
                <label>Thuế suất VAT (%)</label>
                <InputNumber style={{ width: "100%" }} placeholder="0" />
              </Col>
              <Col span={8}>
                <label>Mã miễn/giảm thuế</label>
                <Input placeholder="Nếu có" />
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );

  // Tab 4: Đính kèm chứng từ
  const renderAttachments = () => (
    <div>
      <h3>Đính kèm chứng từ điện tử</h3>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div>
          <Button className="textSibar" icon={<FiUpload />}>Tải lên Hợp đồng</Button>
          <span style={{ marginLeft: 12, color: "#999" }}>
            (PDF, Word, không quá 5MB)
          </span>
        </div>
        <div>
          <Button className="textSibar" icon={<FiUpload />}>Tải lên Invoice</Button>
          <span style={{ marginLeft: 12, color: "#999" }}>
            (PDF, không quá 5MB)
          </span>
        </div>
        <div>
          <Button className="textSibar" icon={<FiUpload />}>Tải lên Packing List</Button>
          <span style={{ marginLeft: 12, color: "#999" }}>
            (PDF, Excel, không quá 5MB)
          </span>
        </div>
        <div>
          <Button className="textSibar" icon={<FiUpload />}>Tải lên C/O (Giấy chứng nhận xuất xứ)</Button>
          <span style={{ marginLeft: 12, color: "#999" }}>
            (PDF, không quá 5MB)
          </span>
        </div>
      </Space>
    </div>
  );

  const tabItems = [
    {
      key: "1",
      label: "Thông tin chung 1",
      children: renderGeneralInfo1(),
    },
    {
      key: "2",
      label: "Thông tin chung 2",
      children: renderGeneralInfo2(),
    },
    {
      key: "3",
      label: "Danh sách hàng",
      children: renderGoodsList(),
    },
    {
      key: "4",
      label: "Đính kèm chứng từ",
      children: renderAttachments(),
    },
  ];

  return (
    <div>
      {/* Thanh công cụ */}
      <div 
        style={{
          background: "#fff",
          padding: "12px 16px",
          borderBottom: "1px solid #d9d9d9",
          marginBottom: 16,
        }}
      >
        <Space>
          <Button className="textSibar" icon={<FiSave />} onClick={handleSubmit(onSave)}>
            Ghi
          </Button>
          <Button  type="primary" icon={<FiSend />} onClick={handleSubmit(onDeclare)}>
            Khai báo
          </Button>
          <Button className="textSibar" icon={<FiPrinter />}>In</Button>
          <Divider type="vertical" />
          <Button className="textSibar">Lấy phản hồi</Button>
          <Button className="textSibar">Đăng ký mới</Button>
          <Button danger>Xóa</Button>
        </Space>
      </div>

      {/* Nội dung các tab */}
      <Tabs activeKey={activeTab} items={tabItems} onChange={setActiveTab} />
    </div>
  );
}