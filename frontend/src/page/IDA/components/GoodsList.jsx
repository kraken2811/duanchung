import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Popconfirm,
  Space,
} from "antd";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import DataTable from "@/components/common/DataTable";
import {
  getByToKhaiId,
  createChiTietToKhai,
  deleteChiTietToKhai,
} from "../api/chiTietToKhai.api";
import { getMaHs } from "../api/chiTietToKhai.api"; 
import '../css/IDA.css';

const { TextArea } = Input;

export default function GoodsList({ idToKhai }) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [maHsList, setMaHsList] = useState([]);

  // Load danh sách mã HS
  useEffect(() => {
    getMaHs()
      .then(setMaHsList)
      .catch(() => message.error("Không tải được danh sách mã HS"));
  }, []);

  // Load chi tiết hàng hóa theo tờ khai
  const fetchData = async () => {
    if (!idToKhai) {
      setData([]);
      return;
    }
    try {
      const res = await getByToKhaiId(idToKhai);
      setData(res || []);
    } catch {
      message.error("Lỗi tải danh sách hàng hóa");
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idToKhai]);

  // Tự động điền mô tả khi chọn mã HS
  const handleMaHsChange = (ma_hs) => {
    const hs = maHsList.find((h) => h.ma_hs === ma_hs);
    if (hs) {
      form.setFieldsValue({
        mo_ta_hang_hoa: hs.mo_ta || "",
      });
    }
  };

  // Lưu hàng hóa
  const handleSave = async () => {
    if (!idToKhai) {
      message.error("Chưa tạo tờ khai, không thể thêm hàng hóa!");
      setOpen(false);
      return;
    }

    try {
      const values = await form.validateFields();

      const maHS = values.ma_hs;
      const soLuong = Number(values.so_luong);
      const tongGiaTri = Number(values.tong_gia_tri);

      if (soLuong <= 0) return message.error("Số lượng phải lớn hơn 0");
      if (tongGiaTri <= 0) return message.error("Trị giá phải lớn hơn 0");

      const payload = {
        id_to_khai: idToKhai,
        ma_hs: maHS,
        mo_ta_hang_hoa: values.mo_ta_hang_hoa?.trim() || null,
        so_luong: soLuong,
        don_vi_tinh: values.don_vi_tinh || null,
        tong_gia_tri: tongGiaTri,
        ma_ngoai_te: values.ma_ngoai_te || "USD",
        ma_quoc_gia: values.ma_quoc_gia || null,
      };

      await createChiTietToKhai(payload);

      message.success("Thêm hàng hóa thành công!");
      setOpen(false);
      form.resetFields();
      fetchData();
    } catch (err) {
      if (err.errorFields) return; // lỗi validate form
      const msg = err.response?.data?.message || "Thêm hàng hóa thất bại";
      message.error(msg);
    }
  };

  // Xóa hàng hóa
  const handleDelete = async (id) => {
    try {
      await deleteChiTietToKhai(id);
      message.success("Xóa thành công");
      fetchData();
    } catch {
      message.error("Xóa thất bại");
    }
  };

  return (
    <>
      {/* Nút thêm hàng hóa */}
      <Button
        type="primary"
        icon={<FiPlus />}
        className="textSibar"
        onClick={() => {
          if (!idToKhai) {
            message.warning("Vui lòng tạo tờ khai trước khi thêm hàng hóa");
            return;
          }
          setOpen(true);
        }}
        disabled={!idToKhai}
      >
        Thêm hàng hóa
      </Button>

      {/* Bảng danh sách hàng hóa */}
      <div style={{ marginTop: 16 }}>
        <DataTable
          rowKey="id_chi_tiet"
          data={data}
          columns={[
            { title: "STT", dataIndex: "so_dong", width: 80, align: "center" },
            { title: "Mã HS", dataIndex: "ma_hs", width: 130 },
            { title: "Mô tả hàng hóa", dataIndex: "mo_ta_hang_hoa" },
            { title: "SL", dataIndex: "so_luong", width: 100, align: "center" },
            { title: "ĐVT", dataIndex: "don_vi_tinh", width: 100, align: "center" },
            { title: "Trị giá", dataIndex: "tong_gia_tri", width: 150 },
            { title: "Ngoại tệ", dataIndex: "ma_ngoai_te", width: 100, align: "center" },
            { title: "Thuế NK", dataIndex: "tien_thue", width: 130 },
            { title: "VAT", dataIndex: "tien_vat", width: 130 },
            {
              title: "Thao tác",
              width: 100,
              align: "center",
              render: (_, record) => (
                <Popconfirm
                  title="Xác nhận xóa?"
                  description="Xóa dòng hàng hóa này?"
                  onConfirm={() => handleDelete(record.id_chi_tiet)}
                  okText="Xóa"
                  cancelText="Hủy"
                >
                  <Button danger size="small" icon={<FiTrash2 />} />
                </Popconfirm>
              ),
            },
          ]}
        />
      </div>

      {/* Modal thêm hàng hóa */}
      <Modal
        title="Thêm dòng hàng hóa"
        open={open}
        onOk={handleSave}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        okText="Lưu"
        cancelText="Hủy"
        width={1000}
      >
        <Form form={form} layout="vertical">
          {/* MÃ HS - SELECT CÓ SEARCH */}
          <Form.Item
            name="ma_hs"
            label="Mã HS"
            rules={[{ required: true, message: "Vui lòng chọn mã HS!" }]}
          >
            <Select
              showSearch
              placeholder="Tìm hoặc chọn mã HS..."
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
              }
              onChange={handleMaHsChange}
            >
              {maHsList.map((hs) => (
                <Select.Option key={hs.ma_hs} value={hs.ma_hs}>
                  {hs.ma_hs} {hs.mo_ta ? `- ${hs.mo_ta}` : ""}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* HIỂN THỊ THUẾ SUẤT THAM KHẢO */}
          {form.getFieldValue("ma_hs") && (
            <div style={{ marginBottom: 16, padding: 12, background: "#f0f8ff", borderRadius: 6 }}>
              <Space>
                <strong>Thuế suất:</strong>
                <span>
                  Thuế NK:{" "}
                  <strong>
                    {maHsList.find((h) => h.ma_hs === form.getFieldValue("ma_hs"))?.thue_nhap_khau ?? "N/A"}%
                  </strong>
                </span>
                <span>
                  VAT:{" "}
                  <strong>
                    {maHsList.find((h) => h.ma_hs === form.getFieldValue("ma_hs"))?.thue_vat ?? "10"}%
                  </strong>
                </span>
              </Space>
            </div>
          )}

          <Form.Item name="mo_ta_hang_hoa" label="Mô tả hàng hóa">
            <TextArea rows={3} placeholder="Có thể chỉnh sửa mô tả tự động từ mã HS" />
          </Form.Item>

          <Form.Item
            name="so_luong"
            label="Số lượng"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <InputNumber min={1} precision={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="don_vi_tinh" label="Đơn vị tính">
            <Select allowClear placeholder="Chọn đơn vị">
              <Select.Option value="Cái">Cái</Select.Option>
              <Select.Option value="Chiếc">Chiếc</Select.Option>
              <Select.Option value="Bộ">Bộ</Select.Option>
              <Select.Option value="Kg">Kg</Select.Option>
              <Select.Option value="Tấn">Tấn</Select.Option>
              <Select.Option value="Mét">Mét</Select.Option>
              <Select.Option value="Thùng">Thùng</Select.Option>
              <Select.Option value="Lít">Lít</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="tong_gia_tri"
            label="Tổng trị giá"
            rules={[{ required: true, message: "Vui lòng nhập trị giá!" }]}
          >
            <InputNumber
              min={0.01}
              step={0.01}
              style={{ width: "100%" }}
              formatter={(value) => (value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "")}
              parser={(value) => value.replace(/,/g, "")}
            />
          </Form.Item>

          <Form.Item name="ma_ngoai_te" label="Ngoại tệ" initialValue="USD">
            <Select>
              <Select.Option value="USD">USD</Select.Option>
              <Select.Option value="EUR">EUR</Select.Option>
              <Select.Option value="JPY">JPY</Select.Option>
              <Select.Option value="VND">VND</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="ma_quoc_gia" label="Xuất xứ (mã quốc gia)">
            <Select allowClear showSearch placeholder="Chọn quốc gia">
              <Select.Option value="CN">Trung Quốc (CN)</Select.Option>
              <Select.Option value="KR">Hàn Quốc (KR)</Select.Option>
              <Select.Option value="JP">Nhật Bản (JP)</Select.Option>
              <Select.Option value="US">Hoa Kỳ (US)</Select.Option>
              <Select.Option value="TW">Đài Loan (TW)</Select.Option>
              <Select.Option value="TH">Thái Lan (TH)</Select.Option>
              <Select.Option value="DE">Đức (DE)</Select.Option>
              <Select.Option value="FR">Pháp (FR)</Select.Option>
              <Select.Option value="IT">Ý (IT)</Select.Option>
              <Select.Option value="VN">Việt Nam (VN)</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}