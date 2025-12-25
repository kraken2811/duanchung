import { Row, Col, Input, DatePicker, Divider, Select, InputNumber } from "antd";
import { useEffect, useState } from "react";
import {
  getCongTys,
  getLoaiHinh,
  getQuocGias,
  getLoaiVanTai,
  getKhoBais,
} from "../api/generalinfo1.api";

export default function GeneralInfo1({ register, setValue }) {
  const [congTys, setCongTys] = useState([]);
  const [loaiHinhs, setLoaiHinhs] = useState([]);
  const [quocGias, setQuocGias] = useState([]);
  const [vanTais, setVanTais] = useState([]);
  const [khoBais, setKhoBais] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [
          congTyRes,
          loaiHinhRes,
          quocGiaRes,
          vanTaiRes,
          khoBaiRes,
        ] = await Promise.all([
          getCongTys(),
          getLoaiHinh(),
          getQuocGias(),
          getLoaiVanTai(),
          getKhoBais(),
        ]);

        setCongTys(congTyRes || []);
        setLoaiHinhs(loaiHinhRes || []);
        setQuocGias(quocGiaRes || []);
        setVanTais(vanTaiRes || []);
        setKhoBais(khoBaiRes || []);
      } catch (err) {
        console.error("LOAD MASTER DATA ERROR:", err);
      }
    };

    load();
  }, []);

  return (
    <div>
      {/* ================= THÔNG TIN ĐẦU TỜ KHAI ================= */}
      <h3>Thông tin đầu tờ khai</h3>
      <Row gutter={16}>
        <Col span={6}>
          <label>Số tờ khai</label>
          <Input disabled placeholder="Hệ thống tự cấp" {...register("declarationNumber")} />
        </Col>

        <Col span={6}>
          <label>Mã loại hình *</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn loại hình"
            onChange={(v) =>
              setValue("type", v, { shouldDirty: true })
            }
          >
            {loaiHinhs.map(lh => (
              <Select.Option key={lh.id_loai_hinh} value={lh.ma_loai_hinh}>
                {lh.ma_loai_hinh} - {lh.ten_loai_hinh}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col span={6}>
          <label>Cơ quan hải quan *</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn hải quan"
            onChange={(v) =>
              setValue("customsOffice", v, { shouldDirty: true })
            }
          >
            {khoBais.map(k => (
              <Select.Option key={k.id_dia_diem} value={k.ma_cuc_hai_quan}>
                {k.ma_cuc_hai_quan} - {k.ten_dia_diem}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col span={6}>
          <label>Ngày đăng ký *</label>
          <DatePicker
            style={{ width: "100%" }}
            onChange={(d) =>
              setValue("regDate", d, { shouldDirty: true })
            }
          />
        </Col>
      </Row>

      <Divider />

      {/* ================= NGƯỜI NHẬP KHẨU ================= */}
      <h3>Người nhập khẩu</h3>
      <Row gutter={16}>
        <Col span={6}>
          <label>Mã số thuế *</label>
          <Select
            style={{ width: "100%" }}
            showSearch
            placeholder="Chọn MST"
            optionFilterProp="children"
            onChange={(mst) => {
              const c = congTys.find(x => x.ma_so_thue === mst);
              if (!c) return;

              setValue("importer.taxCode", c.ma_so_thue, { shouldDirty: true });
              setValue("importer.name", c.ten_cong_ty, { shouldDirty: true });
              setValue("importer.address", c.dia_chi, { shouldDirty: true });
              setValue("importer.phone", c.dien_thoai, { shouldDirty: true });
            }}
          >
            {congTys
              .filter(c => c.ma_so_thue)
              .map(c => (
                <Select.Option key={c.ma_so_thue} value={c.ma_so_thue}>
                  {c.ma_so_thue} – {c.ten_cong_ty}
                </Select.Option>
              ))}
          </Select>
        </Col>

        <Col span={6}>
          <label>Tên doanh nghiệp *</label>
          <Input {...register("importer.name")} readOnly />
        </Col>

        <Col span={6}>
          <label>Địa chỉ</label>
          <Input {...register("importer.address")} readOnly />
        </Col>

        <Col span={6}>
          <label>Điện thoại</label>
          <Input {...register("importer.phone")} readOnly />
        </Col>
      </Row>

      <Divider />

      {/* ================= NGƯỜI XUẤT KHẨU ================= */}
      <h3>Người xuất khẩu</h3>
      <Row gutter={16}>
        <Col span={12}>
          <label>Tên người xuất khẩu</label>
          <Input {...register("exporter.name")} />
        </Col>
        <Col span={12}>
          <label>Địa chỉ</label>
          <Input {...register("exporter.address")} />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 12 }}>
        <Col span={6}>
          <label>Mã nước *</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn quốc gia"
            onChange={(v) =>
              setValue("exporter.countryCode", v, { shouldDirty: true })
            }
          >
            {quocGias.map(q => (
              <Select.Option key={q.ma_quoc_gia} value={q.ma_quoc_gia}>
                {q.ma_quoc_gia} - {q.ten_quoc_gia}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Divider />

      {/* ================= VẬN ĐƠN ================= */}
      <h3>Vận đơn (Bill of Lading)</h3>
      <Row gutter={16}>
        <Col span={6}>
          <label>Số vận đơn *</label>
          <Input {...register("billOfLading.number")} />
        </Col>

        <Col span={6}>
          <label>Ngày vận đơn</label>
          <DatePicker
            style={{ width: "100%" }}
            onChange={(d) =>
              setValue("billOfLading.date", d, { shouldDirty: true })
            }
          />
        </Col>

        <Col span={6}>
          <label>Số lượng kiện</label>
          <InputNumber
            style={{ width: "100%" }}
            onChange={(v) =>
              setValue("billOfLading.packages", v, { shouldDirty: true })
            }
          />
        </Col>

        <Col span={6}>
          <label>Loại kiện</label>
          <Select
            style={{ width: "100%" }}
            onChange={(v) =>
              setValue("billOfLading.packageType", v, { shouldDirty: true })
            }
          >
            <Select.Option value="CT">Thùng carton</Select.Option>
            <Select.Option value="PL">Pallet</Select.Option>
          </Select>
        </Col>

        <Col span={6}>
          <label>Tổng trọng lượng (KGM)</label>
          <InputNumber
            style={{ width: "100%" }}
            onChange={(v) =>
              setValue("billOfLading.totalWeight", v, { shouldDirty: true })
            }
          />
        </Col>

        <Col span={6}>
          <label>Phương thức vận chuyển</label>
          <Select
            style={{ width: "100%" }}
            onChange={(v) =>
              setValue("billOfLading.shippingMethod", v, { shouldDirty: true })
            }
          >
            {vanTais.map(vt => (
              <Select.Option key={vt.id_loai_van_tai} value={vt.ma_loai_van_tai}>
                {vt.ten_loai_van_tai}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col span={6}>
          <label>Cảng xếp hàng</label>
          <Select
            style={{ width: "100%" }}
            onChange={(v) =>
              setValue("billOfLading.portOfLoading", v, { shouldDirty: true })
            }
          >
            {khoBais.map(k => (
              <Select.Option key={k.id_dia_diem} value={k.ma_dia_diem}>
                {k.ten_dia_diem}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col span={6}>
          <label>Cảng dỡ hàng</label>
          <Select
            style={{ width: "100%" }}
            onChange={(v) =>
              setValue("billOfLading.portOfDischarge", v, { shouldDirty: true })
            }
          >
            {khoBais.map(k => (
              <Select.Option key={k.id_dia_diem} value={k.ma_dia_diem}>
                {k.ten_dia_diem}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col span={6}>
          <label>Địa điểm lưu kho</label>
          <Select
            style={{ width: "100%" }}
            onChange={(v) =>
              setValue("billOfLading.storageLocation", v, { shouldDirty: true })
            }
          >
            {khoBais.map(k => (
              <Select.Option key={k.id_dia_diem} value={k.ma_dia_diem}>
                {k.ten_dia_diem}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
}
