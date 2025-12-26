import { Row, Col, Input, DatePicker, Divider, Select, InputNumber } from "antd";
import { Controller } from "react-hook-form";

const { TextArea } = Input; 
const FieldLabel = ({ children, required }) => (
  <div
    style={{
      height: 32,                
      display: "flex",
      alignItems: "center",     
      fontWeight: 500,
      fontSize: 13,
      marginBottom: 4,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
    title={typeof children === "string" ? children : undefined}
  >
    <span>
      {children}
      {required && <span style={{ color: "red" }}> *</span>}
    </span>
  </div>
);

export default function GeneralInfo2({ control }) {
  return (
    <div style={{ padding: 12 }}>
      {/* ================= HÓA ĐƠN ================= */}
      <h3>Hóa đơn thương mại (Commercial Invoice)</h3>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <FieldLabel required>Số hóa đơn</FieldLabel>
          <Controller
            name="invoice.number"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Col>

        <Col span={8}>
          <FieldLabel>Ngày hóa đơn</FieldLabel>
          <Controller
            name="invoice.date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                style={{ width: "100%" }}
                onChange={(d) => field.onChange(d)}
              />
            )}
          />
        </Col>

        <Col span={8}>
          <FieldLabel>Điều kiện giá (Incoterms)</FieldLabel>
          <Controller
            name="invoice.incoterms"
            control={control}
            render={({ field }) => (
              <Select {...field} style={{ width: "100%" }}>
                <Select.Option value="CIF">CIF</Select.Option>
                <Select.Option value="FOB">FOB</Select.Option>
                <Select.Option value="EXW">EXW</Select.Option>
              </Select>
            )}
          />
        </Col>

        <Col span={8}>
          <FieldLabel>Mã đồng tiền</FieldLabel>
          <Controller
            name="invoice.currency"
            control={control}
            defaultValue="USD"
            render={({ field }) => (
              <Select {...field} style={{ width: "100%" }}>
                <Select.Option value="USD">USD</Select.Option>
                <Select.Option value="VND">VND</Select.Option>
                <Select.Option value="EUR">EUR</Select.Option>
              </Select>
            )}
          />
        </Col>

        <Col span={8}>
          <FieldLabel>Tổng trị giá</FieldLabel>
          <Controller
            name="invoice.totalValue"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} style={{ width: "100%" }} min={0} />
            )}
          />
        </Col>

        <Col span={8}>
          <FieldLabel>Phương thức thanh toán</FieldLabel>
          <Controller
            name="invoice.paymentMethod"
            control={control}
            render={({ field }) => (
              <Select {...field} style={{ width: "100%" }}>
                <Select.Option value="LC">LC</Select.Option>
                <Select.Option value="TT">TT</Select.Option>
                <Select.Option value="CASH">CASH</Select.Option>
              </Select>
            )}
          />
        </Col>
      </Row>

      <Divider />

      {/* ================= TRỊ GIÁ TÍNH THUẾ ================= */}
      <h3>Trị giá tính thuế</h3>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <FieldLabel>Phương pháp xác định trị giá</FieldLabel>
          <Controller
            name="customsValue.method"
            control={control}
            render={({ field }) => (
              <Select {...field} style={{ width: "100%" }}>
                <Select.Option value="PP1">
                  PP1 - Trị giá giao dịch
                </Select.Option>
                <Select.Option value="PP2">
                  PP2 - Hàng hóa giống hệt
                </Select.Option>
                <Select.Option value="PP3">
                  PP3 - Hàng hóa tương tự
                </Select.Option>
              </Select>
            )}
          />
        </Col>

        <Col span={8}>
          <FieldLabel>Phí vận chuyển (Freight)</FieldLabel>
          <Controller
            name="customsValue.freight"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} style={{ width: "100%" }} min={0} />
            )}
          />
        </Col>

        <Col span={8}>
          <FieldLabel>Phí bảo hiểm (Insurance)</FieldLabel>
          <Controller
            name="customsValue.insurance"
            control={control}
            render={({ field }) => (
              <InputNumber {...field} style={{ width: "100%" }} min={0} />
            )}
          />
        </Col>
      </Row>

      <Divider />

      {/* ================= THUẾ & BẢO LÃNH ================= */}
      <h3>Thuế và bảo lãnh</h3>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <FieldLabel>Người nộp thuế</FieldLabel>
          <Controller
            name="taxesAndGuarantees.taxPayer"
            control={control}
            render={({ field }) => (
              <Select {...field} style={{ width: "100%" }}>
                <Select.Option value="IMPORTER">
                  Người nhập khẩu
                </Select.Option>
                <Select.Option value="EXPORTER">
                  Người xuất khẩu
                </Select.Option>
              </Select>
            )}
          />
        </Col>

        <Col span={8}>
          <FieldLabel>Hình thức nộp thuế</FieldLabel>
          <Controller
            name="taxesAndGuarantees.taxDeadline"
            control={control}
            render={({ field }) => (
              <Select {...field} style={{ width: "100%" }}>
                <Select.Option value="BEFORE_CLEARANCE">
                  Trước thông quan
                </Select.Option>
                <Select.Option value="AFTER_CLEARANCE">
                  Sau thông quan
                </Select.Option>
              </Select>
            )}
          />
        </Col>
      </Row>

      <Divider />
      <h3>Thông tin khác</h3>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <FieldLabel>Số hợp đồng</FieldLabel>
          <Controller
            name="otherInformation.contractNumber"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Col>

        <Col span={12}>
          <FieldLabel>Ngày hợp đồng</FieldLabel>
          <Controller
            name="otherInformation.contractDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                style={{ width: "100%" }}
                onChange={(d) => field.onChange(d)}
              />
            )}
          />
        </Col>

        <Col span={24}>
          <FieldLabel>Ghi chú</FieldLabel>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => <TextArea {...field} rows={3} />}
          />
        </Col>
      </Row>
    </div>
  );
}
