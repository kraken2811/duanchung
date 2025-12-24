import { Row, Col, Input, DatePicker, Divider, Select, InputNumber } from "antd";

export default function GeneralInfo1({ register, setValue }) {
  return (
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
          <DatePicker style={{ width: "100%" }} onChange={(d) => setValue("regDate", d)} />
        </Col>
      </Row>
      <Divider />
      
      <h3>Người nhập khẩu</h3>
      <Row gutter={16}>
        <Col span={6}>
          <label>Mã số thuế *</label>
          <Input placeholder="MST" {...register("importer.taxCode")} />
        </Col>
        <Col span={6}>
          <label>Tên doanh nghiệp *</label>
          <Input placeholder="Tên công ty" {...register("importer.name")} />
        </Col>
        <Col span={6}>
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
        <Col span={6}>
          <label>Số vận đơn *</label>
          <Input placeholder="Số B/L" {...register("billOfLading.number")} />
        </Col>
        <Col span={6}>
          <label>Ngày vận đơn</label>
          <DatePicker style={{ width: "100%" }} onChange={(d) => setValue("billOfLading.date", d)} />
        </Col>
        <Col span={6}>
          <label>Số lượng kiện</label>
          <InputNumber style={{ width: "100%" }} onChange={(v) => setValue("billOfLading.packages", v)} />
        </Col>
        <Col span={6}>
          <label>Loại kiện</label>
          <Select style={{ width: "100%" }} onChange={(v) => setValue("billOfLading.packageType", v)}>
            <Select.Option value="CT">Thùng carton</Select.Option>
            <Select.Option value="PL">Pallet</Select.Option>
          </Select>
        </Col>
        <Col span={6}>
          <label>Tổng trọng lượng (KGM)</label>
          <InputNumber style={{ width: "100%" }} onChange={(v) => setValue("billOfLading.totalWeight", v)} />
        </Col>
        <Col span={6}>
          <label>Phương thức vận chuyển</label>
          <Select style={{ width: "100%" }} onChange={(v) => setValue("billOfLading.shippingMethod", v)}>
            <Select.Option value="SEA">Đường biển (Sea)</Select.Option>
            <Select.Option value="RAIL">Đường sắt (Rail)</Select.Option>
            <Select.Option value="ROAD">Đường bộ (Road)</Select.Option>
            <Select.Option value="AIR">Đường hàng không (Air)</Select.Option>
            <Select.Option value="MAIL">Đường bưu điện (Mail)</Select.Option>
            <Select.Option value="OTHER">Khác (Other)</Select.Option>
          </Select>
        </Col>
        <Col span={6}>
          <label>Tên phương tiện</label>
          <Input placeholder="Tên tàu/máy bay" {...register("billOfLading.vehicleName")} />
        </Col>
        <Col span={6}>
          <label>Cảng xếp hàng</label>
          <Input placeholder="Mã cảng xuất phát" {...register("billOfLading.portOfLoading")} />
        </Col>
        <Col span={6}>
          <label>Cảng dỡ hàng</label>
          <Input placeholder="Mã cảng đến" {...register("billOfLading.portOfDischarge")} />
        </Col>
        <Col span={6}>
          <label>Địa điểm lưu kho</label>
          <Input placeholder="Mã kho/bãi" {...register("billOfLading.storageLocation")} />
        </Col>
      </Row>
    </div>
  );
}