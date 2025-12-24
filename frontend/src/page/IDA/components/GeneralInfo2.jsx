import { Row, Col, Input, DatePicker, Divider, Select, InputNumber } from "antd";
const { TextArea } = Input;

export default function GeneralInfo2({ register, setValue }) {
  return (
    <div>
      <h3>Hóa đơn thương mại (Commercial Invoice)</h3>
      <Row gutter={16}>
        <Col span={8}>
          <label>Số hóa đơn *</label>
          <Input {...register("invoice.number")} />
        </Col>
        <Col span={8}>
          <label>Ngày hóa đơn</label>
          <DatePicker style={{ width: "100%" }} onChange={(d) => setValue("invoice.date", d)} />
        </Col>
        <Col span={8}>
          <label>Điều kiện giá (incoterms)</label>
          <Select style={{ width: "100%" }} onChange={(v) => setValue("invoice.incoterms", v)}>
            <Select.Option value="CIF">CIF</Select.Option>
            <Select.Option value="FOB">FOB</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={8}>
          <label>Mã đồng tiền</label>
          <Select style={{ width: "100%" }} defaultValue="USD" onChange={(v) => setValue("invoice.currency", v)}>
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="VND">VND</Select.Option>
          </Select>
        </Col>
        <Col span={8}>
          <label>Tổng trị giá</label>
          <InputNumber style={{ width: "100%" }} onChange={(v) => setValue("invoice.totalValue", v)} />
        </Col>
        <Col span={8}>
          <label>Phương thức thanh toán</label>
          <Select style={{ width: "100%" }} onChange={(v) => setValue("invoice.paymentMethod", v)}>
            <Select.Option value="LC">Thư tín dụng (LC)</Select.Option>
            <Select.Option value="CASH">Tiền mặt (CASH)</Select.Option>
            <Select.Option value="TT">Chuyển khoản (TT)</Select.Option>
          </Select>
        </Col>
      </Row>
      <Divider />

      <h3>Trị giá tính thuế (Customs Value)</h3>
      <Row gutter={16}>
        <Col span={8}>
          <label>Phương pháp xác định trị giá</label>
          <Select style={{ width: "100%" }} onChange={(v) => setValue("customsValue.method", v)}>
            <Select.Option value="PP1">PP1 - Trị giá giao dịch</Select.Option>
            <Select.Option value="PP2">PP2 - Trị giá giao dịch của hàng hóa giống hệt</Select.Option>
            <Select.Option value="PP3">PP3 - Trị giá giao dịch của hàng hóa tương tự</Select.Option>
          </Select>
        </Col>
        <Col span={8}>
          <label>Phí vận chuyển (Freight)</label>
          <InputNumber style={{ width: "100%" }} onChange={(v) => setValue("customsValue.freight", v)} />
        </Col>
        <Col span={8}>
          <label>Phí bảo hiểm (Insurance)</label>
          <InputNumber style={{ width: "100%" }} onChange={(v) => setValue("customsValue.insurance", v)} />
        </Col>
      </Row>
      <Divider />

      <h3>Thuế và bảo lãnh</h3>
      <Row gutter={16}>
        <Col span={8}>
          <label>Người nộp thuế</label>
          <Select style={{ width: "100%" }} onChange={(v) => setValue("taxesAndGuarantees.taxPayer", v)}>
            <Select.Option value="IMPORTER">Người nhập khẩu</Select.Option>
            <Select.Option value="EXPORTER">Người xuất khẩu</Select.Option>
          </Select>
        </Col>
        <Col span={8}>
          <label>Thời hạn nộp thuế</label>
          <Select style={{ width: "100%" }} onChange={(v) => setValue("taxesAndGuarantees.taxDeadline", v)}>
            <Select.Option value="BEFORE_CLEARANCE">Trước khi làm thủ tục hải quan</Select.Option>
            <Select.Option value="AFTER_CLEARANCE">Sau khi làm thủ tục hải quan</Select.Option>
          </Select>
        </Col>
      </Row>
      <Divider />
      
      <h3>Thông tin khác</h3>
      <Row gutter={16}>
        <Col span={12}>
          <label>Số hợp đồng</label>
          <InputNumber style={{ width: "100%" }} onChange={(v) => setValue("otherInformation.contractNumber", v)} />
        </Col>
        <Col span={12}>
          <label>Ngày hợp đồng</label>
          <DatePicker style={{ width: "100%" }} onChange={(d) => setValue("otherInformation.contractDate", d)} />
        </Col>
        <Col span={24}>
          <label>Ghi chú</label>
          <TextArea rows={3} {...register("notes")} />
        </Col>
      </Row>
    </div>
  );
}