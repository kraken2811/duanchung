import { Row, Col, Input, DatePicker, Divider, Select, InputNumber } from "antd";
const { TextArea } = Input;

export default function GeneralInfo2({ register, setValue }) {
  return (
    <div>
      <h3>Hóa đơn thương mại</h3>
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
          <label>Điều kiện giá</label>
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
      </Row>
      <Divider />
      
      <h3>Thông tin khác</h3>
      <Row gutter={16}>
        <Col span={24}>
          <label>Ghi chú</label>
          <TextArea rows={3} {...register("notes")} />
        </Col>
      </Row>
    </div>
  );
}