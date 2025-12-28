import { useEffect, useState } from "react";
import { Row, Col, Input, Select, DatePicker, Card } from "antd";

import {
  getCongTys,
  getDoiTacs,
  getLoaiVanTai,
  getKhoBais,
} from "../api/info.api";

const { Option } = Select;

export default function EdaGeneralInfo({ value, onChange }) {
  const [congTys, setCongTys] = useState([]);
  const [doiTacs, setDoiTacs] = useState([]);
  const [vanTais, setVanTais] = useState([]);
  const [khoBais, setKhoBais] = useState([]);

  const setField = (path, val) => {
    onChange((prev) => {
      const clone = structuredClone(prev);
      const keys = path.split(".");
      let obj = clone;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = obj[keys[i]] || {};
        obj = obj[keys[i]];
      }
      obj[keys.at(-1)] = val;
      return clone;
    });
  };

  useEffect(() => {
    getCongTys().then(setCongTys);
    getDoiTacs({ loai: "XUAT_KHAU" }).then(setDoiTacs);
    getLoaiVanTai().then(setVanTais);
    getKhoBais().then(setKhoBais);
  }, []);

  return (
    <div style={{ paddingRight: 8 }}>

      {/* ================= THÔNG TIN TỜ KHAI ================= */}
      <Card title="Thông tin đầu tờ khai" size="small" className="mb-4">
        <Row gutter={16}>
          <Col span={6}>
            <label>Số tờ khai</label>
            <Input disabled placeholder="Hệ thống tự sinh" />
          </Col>

          <Col span={6}>
            <label>Mã loại hình</label>
            <Select value="EDA" disabled style={{ width: "100%" }}>
              <Option value="EDA">EDA - Xuất khẩu</Option>
            </Select>
          </Col>

          <Col span={6}>
            <label>Cơ quan hải quan</label>
            <Select
              showSearch
              style={{ width: "100%" }}
              onChange={(v) => setField("header.customsOffice", v)}
            >
              {khoBais.map(k => (
                <Option key={k.ma_dia_diem} value={k.ma_dia_diem}>
                  {k.ma_cuc_hai_quan} - {k.ten_dia_diem}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={6}>
            <label>Ngày đăng ký</label>
            <DatePicker
              style={{ width: "100%" }}
              onChange={(d) => setField("header.regDate", d)}
            />
          </Col>
        </Row>
      </Card>

      {/* ================= NGƯỜI NHẬP KHẨU ================= */}
      <Card title="Người nhập khẩu" size="small" className="mb-4">
        <Row gutter={16}>
          <Col span={6}>
            <label>Mã số thuế</label>
            <Select
              showSearch
              style={{ width: "100%" }}
              onChange={(id) => {
                const c = congTys.find(x => x.id_cong_ty === id);
                if (!c) return;

                setField("importer.taxCode", c.ma_so_thue);
                setField("importer.name", c.ten_cong_ty);
                setField("importer.address", c.dia_chi);
                setField("importer.phone", c.dien_thoai);
              }}
            >
              {congTys.map(c => (
                <Option key={c.id_cong_ty} value={c.id_cong_ty}>
                  {c.ma_so_thue} - {c.ten_cong_ty}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={6}>
            <label>Tên DN</label>
            <Input value={value.importer?.name || ""} disabled />
          </Col>

          <Col span={6}>
            <label>Địa chỉ</label>
            <Input value={value.importer?.address || ""} disabled />
          </Col>

          <Col span={6}>
            <label>Điện thoại</label>
            <Input value={value.importer?.phone || ""} disabled />
          </Col>
        </Row>
      </Card>

      {/* ================= NGƯỜI XUẤT KHẨU ================= */}
      <Card title="Người xuất khẩu" size="small" className="mb-4">
        <Row gutter={16}>
          <Col span={6}>
            <label>Đối tác</label>
            <Select
              showSearch
              style={{ width: "100%" }}
              onChange={(id) => {
                const d = doiTacs.find(x => x.id_doi_tac === id);
                if (!d) return;

                setField("exporter.name", d.ten_doi_tac);
                setField("exporter.country", d.ma_quoc_gia);
                setField("exporter.phone", d.dien_thoai_lien_he);
              }}
            >
              {doiTacs.map(d => (
                <Option key={d.id_doi_tac} value={d.id_doi_tac}>
                  {d.ten_doi_tac}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={6}>
            <label>Tên</label>
            <Input value={value.exporter?.name || ""} disabled />
          </Col>

          <Col span={6}>
            <label>Mã nước</label>
            <Input value={value.exporter?.country || ""} disabled />
          </Col>

          <Col span={6}>
            <label>Điện thoại</label>
            <Input value={value.exporter?.phone || ""} disabled />
          </Col>
        </Row>
      </Card>

      {/* ================= LÔ HÀNG ================= */}
      <Card title="Lô hàng" size="small">
        <Row gutter={16}>
          <Col span={6}>
            <label>Phương thức vận chuyển</label>
            <Select
              style={{ width: "100%" }}
              onChange={(v) => setField("shipment.transport", v)}
            >
              {vanTais.map(v => (
                <Option key={v.id_loai_van_tai} value={v.id_loai_van_tai}>
                  {v.ten_loai_van_tai}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={6}>
            <label>Cảng xếp</label>
            <Select
              style={{ width: "100%" }}
              onChange={(v) => setField("shipment.loadingPort", v)}
            >
              {khoBais.map(k => (
                <Option key={k.ma_dia_diem} value={k.ma_dia_diem}>
                  {k.ten_dia_diem}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={6}>
            <label>Cảng dỡ</label>
            <Select
              style={{ width: "100%" }}
              onChange={(v) => setField("shipment.dischargePort", v)}
            >
              {khoBais.map(k => (
                <Option key={k.ma_dia_diem} value={k.ma_dia_diem}>
                  {k.ten_dia_diem}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={6}>
            <label>Mô tả lô hàng</label>
            <Input.TextArea
              rows={2}
              onChange={(e) =>
                setField("shipment.description", e.target.value)
              }
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}
