import { useEffect, useState } from "react";
import { Row, Col, Input, Select, DatePicker, Card } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

import {
  getCongTys,
  getDoiTacs,
  getLoaiVanTai,
  getKhoBais,
} from "../api/info.api";

const { Option } = Select;

export default function EdaGeneralInfo() {
  /* ================= FORM CONTEXT ================= */
  const { control, setValue, watch } = useFormContext();

  /* ================= STATE ================= */
  const [congTys, setCongTys] = useState([]);
  const [doiTacs, setDoiTacs] = useState([]);
  const [vanTais, setVanTais] = useState([]);
  const [khoBais, setKhoBais] = useState([]);

  /* ================= CONSTANT ================= */
  const col = { span: 6 };
  const gutter = [16, 12];

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    getCongTys().then(setCongTys);
    getDoiTacs({ loai: "XUAT_KHAU" }).then(setDoiTacs);
    getLoaiVanTai().then(setVanTais);
    getKhoBais().then(setKhoBais);
  }, []);

  return (
    <div style={{ paddingRight: 8 }}>

      {/* ================= THÔNG TIN ĐẦU TỜ KHAI ================= */}
      <Card title="Thông tin đầu tờ khai" size="small" className="mb-4">
        <Row gutter={gutter}>
          <Col {...col}>
            <label>Số tờ khai</label>
            <Input disabled placeholder="Hệ thống tự sinh" />
          </Col>

          <Col {...col}>
            <label>Mã loại hình</label>
            <Select value="EDA" disabled style={{ width: "100%" }}>
              <Option value="EDA">EDA - Xuất khẩu</Option>
            </Select>
          </Col>

          <Col {...col}>
            <label>Cơ quan hải quan</label>
            <Controller
              name="customsOffice"
              control={control}
              render={({ field }) => (
                <Select {...field} showSearch style={{ width: "100%" }}>
                  {khoBais.map(k => (
                    <Option key={k.ma_dia_diem} value={k.ma_dia_diem}>
                      {k.ma_cuc_hai_quan} - {k.ten_dia_diem}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </Col>

          <Col {...col}>
            <label>Ngày đăng ký</label>
            <Controller
              name="regDate"
              control={control}
              render={({ field }) => (
                <DatePicker {...field} style={{ width: "100%" }} />
              )}
            />
          </Col>
        </Row>
      </Card>

      {/* ================= NGƯỜI NHẬP KHẨU ================= */}
      <Card title="Người nhập khẩu" size="small" className="mb-4">
        <Row gutter={gutter}>
          <Col {...col}>
            <label>Mã số thuế</label>
            <Select
              showSearch
              style={{ width: "100%" }}
              onChange={(id) => {
                const c = congTys.find(x => x.id_cong_ty === id);
                if (!c) return;
                setValue("importer.taxCode", c.ma_so_thue);
                setValue("importer.name", c.ten_cong_ty);
                setValue("importer.address", c.dia_chi);
                setValue("importer.phone", c.dien_thoai);
              }}
            >
              {congTys.map(c => (
                <Option key={c.id_cong_ty} value={c.id_cong_ty}>
                  {c.ma_so_thue} - {c.ten_cong_ty}
                </Option>
              ))}
            </Select>
          </Col>

          <Col {...col}><label>Tên DN</label><Input value={watch("importer.name") || ""} disabled /></Col>
          <Col {...col}><label>Địa chỉ</label><Input value={watch("importer.address") || ""} disabled /></Col>
          <Col {...col}><label>Điện thoại</label><Input value={watch("importer.phone") || ""} disabled /></Col>
        </Row>
      </Card>

      {/* ================= NGƯỜI XUẤT KHẨU ================= */}
      <Card title="Người xuất khẩu" size="small" className="mb-4">
        <Row gutter={gutter}>
          <Col {...col}>
            <label>Đối tác</label>
            <Select
              style={{ width: "100%" }}
              showSearch
              onChange={(id) => {
                const d = doiTacs.find(x => x.id_doi_tac === id);
                if (!d) return;
                setValue("exporter.name", d.ten_doi_tac);
                setValue("exporter.country", d.ma_quoc_gia);
                setValue("exporter.phone", d.dien_thoai_lien_he);
              }}
            >
              {doiTacs.map(d => (
                <Option key={d.id_doi_tac} value={d.id_doi_tac}>
                  {d.ten_doi_tac}
                </Option>
              ))}
            </Select>
          </Col>

          <Col {...col}><label>Tên</label><Input value={watch("exporter.name") || ""} disabled /></Col>
          <Col {...col}><label>Mã nước</label><Input value={watch("exporter.country") || ""} disabled /></Col>
          <Col {...col}><label>Điện thoại</label><Input value={watch("exporter.phone") || ""} disabled /></Col>
        </Row>
      </Card>

      {/* ================= LÔ HÀNG ================= */}
      <Card title="Lô hàng" size="small">
        <Row gutter={gutter}>
          <Col {...col}>
            <label>Phương thức vận chuyển</label>
            <Controller
              name="loHang.vanTai"
              control={control}
              render={({ field }) => (
                <Select {...field} style={{ width: "100%" }}>
                  {vanTais.map(v => (
                    <Option key={v.id_loai_van_tai} value={v.id_loai_van_tai}>
                      {v.ten_loai_van_tai}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </Col>

          <Col {...col}>
            <label>Cảng xếp</label>
            <Controller
              name="loHang.cangXep"
              control={control}
              render={({ field }) => (
                <Select {...field} style={{ width: "100%" }}>
                  {khoBais.map(k => (
                    <Option key={k.ma_dia_diem} value={k.ma_dia_diem}>
                      {k.ten_dia_diem}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </Col>

          <Col {...col}>
            <label>Cảng dỡ</label>
            <Controller
              name="loHang.cangDo"
              control={control}
              render={({ field }) => (
                <Select {...field} style={{ width: "100%" }}>
                  {khoBais.map(k => (
                    <Option key={k.ma_dia_diem} value={k.ma_dia_diem}>
                      {k.ten_dia_diem}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </Col>

          <Col {...col}>
            <label>Kho lưu</label>
            <Controller
              name="loHang.luuKho"
              control={control}
              render={({ field }) => (
                <Select {...field} style={{ width: "100%" }}>
                  {khoBais.map(k => (
                    <Option key={k.ma_dia_diem} value={k.ma_dia_diem}>
                      {k.ten_dia_diem}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </Col>

          <Col span={24}>
            <label>Mô tả lô hàng</label>
            <Controller
              name="loHang.moTa"
              control={control}
              render={({ field }) => <Input.TextArea rows={2} {...field} />}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
}
