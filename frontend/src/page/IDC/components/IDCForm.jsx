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
  Alert,
  Badge,
  Tooltip,
} from "antd";
import {
  FiSave,
  FiSend,
  FiPrinter,
  FiEdit3,
  FiAlertCircle,
  FiSearch,
} from "react-icons/fi";
import { useState } from "react";
import useNotify from "@/components/notification/useNotify";
import "../css/IDC.css";

const { TextArea } = Input;

export default function IDCForm() {
  const notify = useNotify();
  const { register, handleSubmit, setValue, watch } = useForm();

  const [activeTab, setActiveTab] = useState("1");
  const [originalDeclaration, setOriginalDeclaration] = useState(null);
  const [modifiedGoods, setModifiedGoods] = useState([]);
  const [changedFields, setChangedFields] = useState(new Set());

  // Load tờ khai gốc
  const loadOriginalDeclaration = (declarationNumber) => {
    // Giả lập load dữ liệu tờ khai gốc
    const mockOriginal = {
      declarationNumber: declarationNumber,
      type: "A11",
      customsOffice: "1801",
      regDate: "2024-01-15",
      importer: {
        taxCode: "0123456789",
        name: "CÔNG TY TNHH ABC",
        address: "123 Nguyễn Văn A, Q.1, TP.HCM",
      },
      invoice: {
        number: "INV-2024-001",
        date: "2024-01-10",
        totalValue: 50000,
        currency: "USD",
      },
      goods: [
        {
          id: 1,
          index: 1,
          description: "Máy tính xách tay",
          hsCode: "84713000",
          origin: "CN",
          quantity: 100,
          unit: "PCE",
          unitPrice: 500,
          totalValue: 50000,
        },
      ],
    };
    setOriginalDeclaration(mockOriginal);
    setModifiedGoods(mockOriginal.goods);
  };

  // Đánh dấu trường đã thay đổi
  const markFieldChanged = (fieldName) => {
    setChangedFields((prev) => new Set([...prev, fieldName]));
  };

  // Kiểm tra trường có bị thay đổi không
  const isFieldChanged = (fieldName) => {
    return changedFields.has(fieldName);
  };

  // Columns cho bảng hàng hóa
  const goodsColumns = [
    {
      title: "STT",
      dataIndex: "index",
      width: 60,
      render: (text, record) => (
        <span style={{ fontWeight: record.modified ? "bold" : "normal" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Tên hàng",
      dataIndex: "description",
      width: 200,
      render: (text, record) => (
        <span
          style={{
            color: record.modified ? "#1890ff" : "inherit",
            fontWeight: record.modified ? "500" : "normal",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Mã HS",
      dataIndex: "hsCode",
      width: 100,
      render: (text, record) => (
        <span style={{ color: record.hsCodeModified ? "#f5222d" : "inherit" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 100,
      render: (text, record) => (
        <Badge
          dot={record.quantityModified}
          status="processing"
          offset={[-5, 0]}
        >
          <span
            style={{
              color: record.quantityModified ? "#1890ff" : "inherit",
              fontWeight: record.quantityModified ? "bold" : "normal",
            }}
          >
            {text}
          </span>
        </Badge>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      width: 120,
      render: (text, record) => (
        <span
          style={{
            color: record.priceModified ? "#1890ff" : "inherit",
            fontWeight: record.priceModified ? "bold" : "normal",
          }}
        >
          ${text}
        </span>
      ),
    },
    {
      title: "Trị giá",
      dataIndex: "totalValue",
      width: 120,
      render: (text, record) => (
        <span
          style={{
            color: record.valueModified ? "#1890ff" : "inherit",
            fontWeight: record.valueModified ? "bold" : "normal",
          }}
        >
          ${text}
        </span>
      ),
    },
    {
      title: "",
      width: 60,
      render: (_, record) => (
        <Tooltip title="Chỉnh sửa dòng hàng">
          <FiEdit3
            style={{ cursor: "pointer", color: "#1890ff" }}
            onClick={() => editGoodsItem(record)}
          />
        </Tooltip>
      ),
    },
  ];

  const editGoodsItem = (record) => {
    console.log("Chỉnh sửa:", record);
  };

  const onSave = (data) => {
    console.log("LƯU IDC:", data);
    notify.success("Đã lưu thông tin sửa đổi");
  };

  const onDeclare = (data) => {
    console.log("KHAI BÁO IDC:", data);
    notify.success("Đã gửi tờ khai sửa đổi lên VNACCS");
  };

  // --- TAB RENDER FUNCTIONS ---
  const renderSearchOriginal = () => (
    <div>
      <Alert
        message="Tìm kiếm tờ khai gốc cần sửa đổi"
        description="Nhập số tờ khai gốc để load thông tin và thực hiện sửa đổi bổ sung"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <Row gutter={16}>
        <Col span={12}>
          <label>
            Số tờ khai gốc <span style={{ color: "red" }}>*</span>
          </label>
          <Input.Search
            size="large"
            placeholder="Nhập số tờ khai gốc (VD: 1801240123)"
            enterButton={
              <Button type="primary" icon={<FiSearch />}>
                Tìm kiếm
              </Button>
            }
            onSearch={loadOriginalDeclaration}
          />
        </Col>
      </Row>
      {originalDeclaration && (
        <>
          <Divider />
          <Alert
            message="Đã tải thông tin tờ khai gốc"
            description={
              <div>
                <div>
                  <strong>Số tờ khai:</strong>{" "}
                  {originalDeclaration.declarationNumber}
                </div>
                <div>
                  <strong>Loại hình:</strong> {originalDeclaration.type}
                </div>
                <div>
                  <strong>Người nhập khẩu:</strong>{" "}
                  {originalDeclaration.importer.name}
                </div>
                <div>
                  <strong>Ngày đăng ký:</strong> {originalDeclaration.regDate}
                </div>
              </div>
            }
            type="success"
            showIcon
          />
          <Divider />
          <h3>Thông tin tờ khai gốc (Chỉ xem - Không thể chỉnh sửa)</h3>
          <Row gutter={16}>
            <Col span={6}>
              <label>Số tờ khai gốc</label>
              <Input
                disabled
                value={originalDeclaration.declarationNumber}
                style={{ background: "#f5f5f5", color: "#999" }}
              />
            </Col>
            <Col span={6}>
              <label>Mã loại hình</label>
              <Input
                disabled
                value={originalDeclaration.type}
                style={{ background: "#f5f5f5", color: "#999" }}
              />
            </Col>
            <Col span={6}>
              <label>Cơ quan hải quan</label>
              <Input
                disabled
                value={originalDeclaration.customsOffice}
                style={{ background: "#f5f5f5", color: "#999" }}
              />
            </Col>
            <Col span={6}>
              <label>Ngày  gốc</label>
              <Input
                disabled
                value={originalDeclaration.regDate}
                style={{ background: "#f5f5f5", color: "#999" }}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );

  const renderModificationInfo = () => (
    <div>
      <Alert
        message="Khu vực thông tin sửa đổi bổ sung"
        description="Đây là phần quan trọng nhất của tờ khai IDC - Vui lòng điền đầy đủ thông tin sửa đổi và lý do"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <div
        style={{
          border: "2px solid #dcdbdaff",
          borderRadius: 4,
          padding: 16,
        }}
      >
        <h3>Thông tin sửa đổi bổ sung</h3>
        <Row gutter={16}>
          <Col span={8}>
            <label>
              Mã phân loại sửa đổi <span style={{ color: "red" }}>*</span>
            </label>
            <Select
              size="large"
              style={{ width: "100%" }}
              placeholder="Chọn loại sửa đổi"
              onChange={(v) => {
                setValue("modification.type", v);
                markFieldChanged("modification.type");
              }}
            >
              <Select.Option value="A">
                A - Sửa đổi thông tin người khai
              </Select.Option>
              <Select.Option value="B">
                B - Sửa đổi thông tin hàng hóa
              </Select.Option>
              <Select.Option value="C">
                C - Sửa đổi trị giá hải quan
              </Select.Option>
              <Select.Option value="D">
                D - Sửa đổi thuế suất/số tiền thuế
              </Select.Option>
              <Select.Option value="E">
                E - Sửa đổi chứng từ đính kèm
              </Select.Option>
            </Select>
          </Col>
          <Col span={8}>
            <label>
              Ngày yêu cầu sửa đổi <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              onChange={(d) => {
                setValue("modification.requestDate", d);
                markFieldChanged("modification.requestDate");
              }}
            />
          </Col>
          <Col span={8}>
            <label>Phân loại kiểm tra</label>
            <Select
              size="large"
              style={{ width: "100%" }}
              placeholder="Chọn"
              onChange={(v) => setValue("modification.inspectionType", v)}
            >
              <Select.Option value="1">Trước thông quan</Select.Option>
              <Select.Option value="2">Sau thông quan</Select.Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={24}>
            <label>
              Lý do sửa đổi / Giải trình{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <TextArea
              rows={4}
              placeholder="Nhập chi tiết lý do yêu cầu sửa đổi tờ khai (Tối thiểu 50 ký tự)"
              onChange={(e) => {
                setValue("modification.reason", e.target.value);
                markFieldChanged("modification.reason");
              }}
            />
            <div style={{ color: "#999", fontSize: 12, marginTop: 4 }}>
              Ví dụ: "Sửa số lượng hàng hóa dòng 1 từ 100 PCE thành 120 PCE do
              khai thiếu theo thực tế nhập khẩu"
            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={12}>
            <label>Văn bản xin sửa đổi số</label>
            <Input
              placeholder="Số văn bản (nếu có)"
              {...register("modification.documentNumber")}
            />
          </Col>
          <Col span={12}>
            <label>Ngày văn bản</label>
            <DatePicker
              style={{ width: "100%" }}
              onChange={(d) => setValue("modification.documentDate", d)}
            />
          </Col>
        </Row>
      </div>
      <Divider />
      <h3>So sánh thông tin thay đổi</h3>
      <Row gutter={16}>
        <Col span={12}>
          <div
            style={{
              background: "#f0f0f0",
              padding: 12,
              borderRadius: 4,
              minHeight: 200,
            }}
          >
            <h4>Thông tin GỐC</h4>
            {originalDeclaration && (
              <div style={{ fontSize: 13 }}>
                <div>
                  <strong>Invoice:</strong> {originalDeclaration.invoice.number}
                </div>
                <div>
                  <strong>Tổng trị giá:</strong> $
                  {originalDeclaration.invoice.totalValue}
                </div>
                <div>
                  <strong>Số lượng hàng:</strong>{" "}
                  {originalDeclaration.goods.length} dòng
                </div>
              </div>
            )}
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              background: "#e6f7ff",
              padding: 12,
              borderRadius: 4,
              border: "1px solid #91d5ff",
              minHeight: 200,
            }}
          >
            <h4 style={{ color: "#1890ff" }}>Thông tin SAU SỬA ĐỔI</h4>
            <div style={{ fontSize: 13, color: "#1890ff" }}>
              <div>Các thay đổi sẽ hiển thị ở đây sau khi bạn nhập liệu</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );

  const renderGeneralInfo1 = () => (
    <div>
      <Alert
        message="Chú ý: Chỉ một số trường được phép sửa đổi"
        description="Các trường có nền trắng có thể chỉnh sửa. Các trường có nền xám đã bị khóa theo quy định của VNACCS."
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <h3>Người nhập khẩu</h3>
      <Row gutter={16}>
        <Col span={8}>
          <label>Mã số thuế</label>
          <Input
            disabled
            value={originalDeclaration?.importer.taxCode}
            style={{ background: "#f5f5f5", color: "#999" }}
          />
        </Col>
        <Col span={16}>
          <label>Tên doanh nghiệp (Có thể sửa)</label>
          <Input
            placeholder="Tên công ty"
            defaultValue={originalDeclaration?.importer.name}
            style={{
              background: isFieldChanged("importer.name")
                ? "#e6f7ff"
                : "#fff",
              borderColor: isFieldChanged("importer.name")
                ? "#1890ff"
                : "#d9d9d9",
            }}
            onChange={(e) => {
              setValue("importer.name", e.target.value);
              markFieldChanged("importer.name");
            }}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={18}>
          <label>Địa chỉ (Có thể sửa)</label>
          <Input
            placeholder="Địa chỉ"
            defaultValue={originalDeclaration?.importer.address}
            style={{
              background: isFieldChanged("importer.address")
                ? "#e6f7ff"
                : "#fff",
              borderColor: isFieldChanged("importer.address")
                ? "#1890ff"
                : "#d9d9d9",
            }}
            onChange={(e) => {
              setValue("importer.address", e.target.value);
              markFieldChanged("importer.address");
            }}
          />
        </Col>
        <Col span={6}>
          <label>Điện thoại (Có thể sửa)</label>
          <Input
            placeholder="SĐT"
            onChange={(e) => {
              setValue("importer.phone", e.target.value);
              markFieldChanged("importer.phone");
            }}
          />
        </Col>
      </Row>
      <Divider />
      <h3>Thông tin Invoice (Các trường quan trọng)</h3>
      <Row gutter={16}>
        <Col span={12}>
          <label>Số Invoice (Có thể sửa)</label>
          <Input
            placeholder="Số hóa đơn"
            defaultValue={originalDeclaration?.invoice.number}
            style={{
              background: isFieldChanged("invoice.number") ? "#e6f7ff" : "#fff",
              borderColor: isFieldChanged("invoice.number")
                ? "#1890ff"
                : "#d9d9d9",
            }}
            onChange={(e) => {
              setValue("invoice.number", e.target.value);
              markFieldChanged("invoice.number");
            }}
          />
        </Col>
        <Col span={12}>
          <label>Tổng trị giá (Có thể sửa)</label>
          <InputNumber
            style={{
              width: "100%",
              background: isFieldChanged("invoice.totalValue")
                ? "#e6f7ff"
                : "#fff",
              borderColor: isFieldChanged("invoice.totalValue")
                ? "#1890ff"
                : "#d9d9d9",
            }}
            placeholder="0.00"
            defaultValue={originalDeclaration?.invoice.totalValue}
            onChange={(v) => {
              setValue("invoice.totalValue", v);
              markFieldChanged("invoice.totalValue");
            }}
          />
        </Col>
      </Row>
    </div>
  );

  const renderGoodsList = () => (
    <div>
      <Alert
        message="Chỉnh sửa danh sách hàng hóa"
        description="Click vào biểu tượng bút chì để sửa từng dòng hàng. Các dòng có thay đổi sẽ được highlight màu xanh."
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={goodsColumns}
        dataSource={modifiedGoods}
        rowKey="id"
        pagination={false}
        bordered
        size="small"
        rowClassName={(record) =>
          record.modified ? "row-modified" : "row-normal"
        }
      />
      <style>{`
        .row-modified {
          background-color: #e6f7ff !important;
        }
      `}</style>
      <Divider />
      <div
        style={{
          background: "#f0f5ff",
          padding: 16,
          borderRadius: 4,
          border: "1px solid #adc6ff",
        }}
      >
        <h4>Chi tiết sửa đổi dòng hàng</h4>
        <Row gutter={16}>
          <Col span={12}>
            <label>Mã HS Code (Có thể sửa)</label>
            <Input placeholder="Nhập mã HS mới" />
          </Col>
          <Col span={6}>
            <label>Số lượng (Có thể sửa)</label>
            <InputNumber style={{ width: "100%" }} placeholder="0" />
          </Col>
          <Col span={6}>
            <label>Đơn giá (Có thể sửa)</label>
            <InputNumber style={{ width: "100%" }} placeholder="0.00" />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 12 }}>
          <Col span={24}>
            <label>Lý do sửa dòng hàng này</label>
            <TextArea
              rows={2}
              placeholder="Nhập lý do sửa đổi cho dòng hàng này"
            />
          </Col>
        </Row>
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <Button type="primary">Cập nhật thay đổi</Button>
        </div>
      </div>
    </div>
  );

  const renderResponse = () => (
    <div>
      <h3>Kết quả xử lý từ VNACCS</h3>
      <Alert
        message="Chưa có kết quả phản hồi"
        description="Sau khi gửi tờ khai sửa đổi, kết quả xử lý từ Hải quan sẽ hiển thị tại đây"
        type="info"
        showIcon
      />
      <Divider />
      <div style={{ color: "#999", fontSize: 13 }}>
        <div>• Chấp nhận: Tờ khai sửa đổi được duyệt</div>
        <div>• Từ chối: Tờ khai sửa đổi bị từ chối (có lý do kèm theo)</div>
        <div>• Yêu cầu bổ sung: Cần bổ sung thêm chứng từ hoặc giải trình</div>
      </div>
    </div>
  );

  const tabItems = [
    {
      key: "1",
      label: "Tìm kiếm TK gốc",
      children: renderSearchOriginal(),
    },
    {
      key: "2",
      label: "Thông tin chung 1",
      children: renderGeneralInfo1(),
      disabled: !originalDeclaration,
    },
    {
      key: "3",
      // SỬA ĐỔI: Nếu chưa có tờ khai (disabled) thì chỉ hiện chữ thường
      // Nếu đã có tờ khai thì mới bọc trong Badge
      label: !originalDeclaration ? (
        "Danh sách hàng"
      ) : (
        <Badge count={modifiedGoods.filter((g) => g.modified).length}>
          Danh sách hàng
        </Badge>
      ),
      children: renderGoodsList(),
      disabled: !originalDeclaration,
    },
    {
      key: "4",
      // SỬA ĐỔI: Tương tự, nếu disabled thì hiện chữ thường để đồng bộ màu xám
      label: !originalDeclaration ? (
        "Thông tin sửa đổi"
      ) : (
        <Badge dot={changedFields.size > 0} offset={[5, 0]}>
          Thông tin sửa đổi
        </Badge>
      ),
      children: renderModificationInfo(),
      disabled: !originalDeclaration,
    },
    {
      key: "5",
      label: "Kết quả phản hồi",
      children: renderResponse(),
      disabled: !originalDeclaration,
    },
  ];

  return (
    <div>
      {/* Thanh công cụ đặc thù cho IDC */}
      <div
        style={{
          background: "#fff1f0",
          padding: "12px 16px",
          borderBottom: "2px solid #ffa39e",
          marginBottom: 16,
        }}
      >
        <Space>
          <Button
            icon={<FiSave />}
            onClick={handleSubmit(onSave)}
            disabled={!originalDeclaration}
          >
            Ghi
          </Button>
          <Button
            type="primary"
            danger
            icon={<FiSend />}
            onClick={handleSubmit(onDeclare)}
            disabled={!originalDeclaration}
          >
            Khai báo IDC
          </Button>
          <Button icon={<FiPrinter />} disabled={!originalDeclaration}>
            In TK sửa đổi
          </Button>
          <Divider type="vertical" />
          <Button disabled={!originalDeclaration}>Lấy phản hồi</Button>
          <Button className="textSibar" >Đăng ký mới</Button>
        </Space>

        <div style={{ marginTop: 8, fontSize: 12, color: "#cf1322" }}>
          <FiAlertCircle style={{ marginRight: 4 }} />
          <strong>Lưu ý:</strong> Tờ khai IDC chỉ được phép sửa đổi một số
          trường thông tin nhất định theo quy định của VNACCS
        </div>
      </div>

      {/* Nội dung các tab */}
      <Tabs
        activeKey={activeTab}
        items={tabItems}
        onChange={setActiveTab}
        tabBarStyle={{ background: "#fafafa", padding: "0 16px" }}
      />
    </div>
  );
}