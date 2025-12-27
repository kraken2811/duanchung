import { Row, Col, Divider } from "antd";
import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";

import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Date from "@/components/common/Date";

import {
  getCongTys,
  getLoaiHinh,
  getLoaiVanTai,
  getKhoBais,
  getDoiTacs,
} from "../api/generalinfo1.api";

export default function GeneralInfo1({ control, setValue }) {
  const [congTys, setCongTys] = useState([]);
  const [loaiHinhs, setLoaiHinhs] = useState([]);
  const [vanTais, setVanTais] = useState([]);
  const [khoBais, setKhoBais] = useState([]);
  const [doiTacs, setDoiTacs] = useState([]);

  useEffect(() => {
    getCongTys().then(setCongTys);
    getLoaiHinh().then(setLoaiHinhs);
    getLoaiVanTai().then(setVanTais);
    getKhoBais().then(setKhoBais);
    getDoiTacs({ loai: "XUAT_KHAU" }).then(setDoiTacs);
  }, []);

  return (
    <div>
      {/* ================= THÔNG TIN TỜ KHAI ================= */}
      <h3>Thông tin đầu tờ khai</h3>

      <Row gutter={16}>
        <Col span={6}>
          <Controller
            name="declarationNumber"
            control={control}
            render={({ field }) => (
              <Input label="Số tờ khai" disabled {...field} />
            )}
          />
        </Col>

        <Col span={6}>
          <Controller
            name="typeCode"
            control={control}
            render={({ field }) => (
              <Select
                label="Mã loại hình"
                required
                {...field}
                options={loaiHinhs.map(l => ({
                  value: l.id_loai_hinh,
                  label: `${l.ma_loai_hinh} - ${l.ten_loai_hinh}`,
                }))}
              />
            )}
          />
        </Col>

        <Col span={6}>
          <Controller
            name="customsOffice"
            control={control}
            render={({ field }) => (
              <Select
                label="Cơ quan hải quan"
                required
                showSearch
                optionFilterProp="label"
                {...field}
                options={khoBais
                  .filter(k => k.ma_cuc_hai_quan) // loại bỏ null
                  .map(k => ({
                    value: k.ma_dia_diem, // ← DÙNG ma_dia_diem ĐỂ UNIQUE
                    label: `${k.ma_cuc_hai_quan} - ${k.ten_dia_diem}`,
                  }))}
              />
            )}
          />
        </Col>

        <Col span={6}>
          <Controller
            name="regDate"
            control={control}
            render={({ field }) => (
              <Date label="Ngày đăng ký" required {...field} />
            )}
          />
        </Col>
      </Row>

      <Divider />

      {/* ================= NGƯỜI NHẬP KHẨU ================= */}
      <h3>Người nhập khẩu</h3>

      <Row gutter={16}>
        <Col span={6}>
          <Controller
            name="importer.companyId"
            control={control}
            render={({ field }) => (
              <Select
                label="Mã số thuế"
                showSearch
                required
                {...field}
                options={congTys.map(c => ({
                  value: c.id_cong_ty,
                  label: `${c.ma_so_thue} - ${c.ten_cong_ty}`,
                }))}
                onChange={(id) => {
                  field.onChange(id);
                  const c = congTys.find(x => x.id_cong_ty === id);
                  if (!c) return;

                  setValue("importer.taxCode", c.ma_so_thue);
                  setValue("importer.name", c.ten_cong_ty);
                  setValue("importer.address", c.dia_chi);
                  setValue("importer.phone", c.dien_thoai);
                }}
              />
            )}
          />
        </Col>

        <Col span={6}>
          <Controller name="importer.name" control={control}
            render={({ field }) => <Input label="Tên DN" disabled {...field} />} />
        </Col>

        <Col span={6}>
          <Controller name="importer.address" control={control}
            render={({ field }) => <Input label="Địa chỉ" disabled {...field} />} />
        </Col>

        <Col span={6}>
          <Controller name="importer.phone" control={control}
            render={({ field }) => <Input label="Điện thoại" disabled {...field} />} />
        </Col>
      </Row>

      <Divider />

      {/* ================= NGƯỜI XUẤT KHẨU ================= */}
      <h3>Người xuất khẩu</h3>

      <Row gutter={16}>
        <Col span={6}>
          <Controller
            name="exporter.doiTacId"
            control={control}
            render={({ field }) => (
              <Select
                label="Đối tác xuất khẩu"
                {...field}
                options={doiTacs.map(d => ({
                  value: d.id_doi_tac,
                  label: d.ten_doi_tac,
                }))}
                onChange={(id) => {
                  field.onChange(id);
                  const d = doiTacs.find(x => x.id_doi_tac === id);
                  if (!d) return;

                  setValue("exporter.name", d.ten_doi_tac);
                  setValue("exporter.address", d.dia_chi);
                  setValue("exporter.countryCode", d.ma_quoc_gia);
                  setValue("exporter.phone", d.dien_thoai_lien_he);
                  setValue("exporter.email", d.email_lien_he);
                }}
              />
            )}
          />
        </Col>

        <Col span={6}>
          <Controller name="exporter.name" control={control}
            render={({ field }) => <Input label="Tên người XK" disabled {...field} />} />
        </Col>

        <Col span={6}>
          <Controller name="exporter.countryCode" control={control}
            render={({ field }) => <Input label="Mã nước" disabled {...field} />} />
        </Col>

        <Col span={6}>
          <Controller name="exporter.phone" control={control}
            render={({ field }) => <Input label="Điện thoại" disabled {...field} />} />
        </Col>
      </Row>

      <Divider />

      {/* ================= LÔ HÀNG ================= */}
      <h3>Lô hàng</h3>

      <Row gutter={16}>
        <Col span={6}>
          <Controller
            name="loHang.shippingMethodId"
            control={control}
            render={({ field }) => (
              <Select
                label="Phương thức vận chuyển"
                {...field}
                options={vanTais.map(v => ({
                  value: v.id_loai_van_tai,
                  label: v.ten_loai_van_tai,
                }))}
              />
            )}
          />
        </Col>

        <Col span={6}>
          <Controller
            name="loHang.portOfLoading"
            control={control}
            render={({ field }) => (
              <Select
                label="Cảng xếp hàng"
                {...field}
                options={khoBais.map(k => ({
                  value: k.ma_dia_diem,
                  label: k.ten_dia_diem,
                }))}
              />
            )}
          />
        </Col>

        <Col span={6}>
          <Controller
            name="loHang.portOfDischarge"
            control={control}
            render={({ field }) => (
              <Select
                label="Cảng dỡ hàng"
                {...field}
                options={khoBais.map(k => ({
                  value: k.ma_dia_diem,
                  label: k.ten_dia_diem,
                }))}
              />
            )}
          />
        </Col>

        <Col span={6}>
          <Controller
            name="loHang.storageLocation"
            control={control}
            render={({ field }) => (
              <Select
                label="Địa điểm lưu kho"
                {...field}
                options={khoBais.map(k => ({
                  value: k.ma_dia_diem,
                  label: k.ten_dia_diem,
                }))}
              />
            )}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <Controller
            name="loHang.estimatedExportDate"
            control={control}
            render={({ field }) => (
              <Date label="Ngày dự kiến xuất" {...field} />
            )}
          />
        </Col>

        <Col span={6}>
          <Controller
            name="loHang.estimatedImportDate"
            control={control}
            render={({ field }) => (
              <Date label="Ngày dự kiến nhập" {...field} />
            )}
          />
        </Col>

        <Col span={6}>
          <Controller
            name="loHang.carrierId"
            control={control}
            render={({ field }) => (
              <Select
                label="Hãng vận chuyển"
                {...field}
                options={doiTacs
                  .filter(d => d.loai_doi_tac === "NHA_SAN_XUAT")
                  .map(d => ({
                    value: d.id_doi_tac,
                    label: d.ten_doi_tac,
                  }))}
              />
            )}
          />
        </Col>

        <Col span={6}>
          <Controller
            name="loHang.agentId"
            control={control}
            render={({ field }) => (
              <Select
                label="Đại lý hải quan"
                {...field}
                options={doiTacs
                  .filter(d => d.loai_doi_tac === "DAI_LY")
                  .map(d => ({
                    value: d.id_doi_tac,
                    label: d.ten_doi_tac,
                  }))}
              />
            )}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Controller
            name="loHang.description"
            control={control}
            render={({ field }) => (
              <Input label="Mô tả lô hàng" {...field} />
            )}
          />
        </Col>
      </Row>
    </div>
  );
}
