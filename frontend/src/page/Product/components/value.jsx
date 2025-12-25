import {
  Table,
  Button,
  Modal,
  Form,
  InputNumber,
  Input,
  Space,
  Card,
  Descriptions,
  Tag,
  Alert,
  message,
  Select,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  getValueAdjustments,
  createValueAdjustment,
} from "../api/value.api";

export default function ValueAdjustmentTab({ selectedLoHang }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  /* ================== LOAD DATA ================== */
  useEffect(() => {
    if (!selectedLoHang) return;

    setLoading(true);
    getValueAdjustments()
      .then((res) => {
        // ⚠️ BE chưa filter → lọc tạm theo số đăng ký
        const filtered = res.data.filter(
          (i) => i.so_dang_ky === selectedLoHang.so_lo_hang
        );
        setData(filtered);
      })
      .catch(() => message.error("Không tải được dữ liệu điều chỉnh"))
      .finally(() => setLoading(false));
  }, [selectedLoHang]);

  /* ================== TÍNH TOÁN ================== */
  const baseValue = selectedLoHang?.tong_gia_tri || 0;

  const totalAdjustment = useMemo(
    () => data.reduce((s, i) => s + Number(i.phi || 0), 0),
    [data]
  );

  const currentValue = baseValue + totalAdjustment;

  /* ================== TABLE ================== */
  const columns = [
    {
      title: "Ngày",
      dataIndex: "ngay_tao",
      render: (v) => (v ? dayjs(v).format("DD/MM/YYYY") : "--"),
    },
    {
      title: "Khoản điều chỉnh",
      dataIndex: "ma_loai",
      render: (v) => <Tag color="blue">{v}</Tag>,
    },
    {
      title: "Số tiền",
      dataIndex: "phi",
      render: (v) => (
        <Tag color={v >= 0 ? "green" : "red"}>
          {v >= 0 ? "+" : ""}
          {Number(v).toLocaleString()}
        </Tag>
      ),
    },
    {
      title: "Tiền tệ",
      dataIndex: "ma_tien_te",
    },
    {
      title: "Mô tả",
      dataIndex: "mo_ta",
    },
  ];

  /* ================== SUBMIT ================== */
  const handleSubmit = async (values) => {
    const payload = {
      id_khoan_dieu_chinh: values.id_khoan_dieu_chinh,
      phi: values.phi,
      ma_loai: values.ma_loai,
      ma_tien_te: values.ma_tien_te,
      so_dang_ky: selectedLoHang.so_lo_hang,
      mo_ta: values.mo_ta,
      ngay_tao: new Date(),
    };

    try {
      await createValueAdjustment(payload);
      message.success("Thêm khoản điều chỉnh thành công");
      setOpen(false);
      form.resetFields();

      const res = await getValueAdjustments();
      setData(
        res.data.filter((i) => i.so_dang_ky === selectedLoHang.so_lo_hang)
      );
    } catch {
      message.error("Lỗi khi thêm khoản điều chỉnh");
    }
  };

  /* ================== UI GUARD ================== */
  if (!selectedLoHang) {
    return (
      <Alert
        type="warning"
        showIcon
        message="Vui lòng chọn một lô hàng để xem / điều chỉnh trị giá"
      />
    );
  }

  return (
    <>
      {/* ===== CONTEXT ===== */}
      <Card style={{ marginBottom: 16 }}>
        <Descriptions bordered size="small" column={3}>
          <Descriptions.Item label="Số lô">
            <strong>{selectedLoHang.so_lo_hang}</strong>
          </Descriptions.Item>

          <Descriptions.Item label="Giá trị ban đầu">
            {baseValue.toLocaleString()} {selectedLoHang.ma_ngoai_te}
          </Descriptions.Item>

          <Descriptions.Item label="Giá trị sau điều chỉnh">
            <Tag color="purple">
              {currentValue.toLocaleString()} {selectedLoHang.ma_ngoai_te}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* ===== ACTION ===== */}
      <Space style={{ marginBottom: 12 }}>
        <Button type="primary" onClick={() => setOpen(true)}>
          Thêm khoản điều chỉnh
        </Button>
      </Space>

      {/* ===== TABLE ===== */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: "Chưa có khoản điều chỉnh" }}
      />

      {/* ===== MODAL ===== */}
      <Modal
        title={`Điều chỉnh trị giá – Lô ${selectedLoHang.so_lo_hang}`}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Loại điều chỉnh"
            name="ma_loai"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: "PHI_VAN_CHUYEN", label: "Phí vận chuyển" },
                { value: "BAO_HIEM", label: "Bảo hiểm" },
                { value: "CHIET_KHAU", label: "Chiết khấu" },
                { value: "PHI_KHAC", label: "Phí khác" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Khoản điều chỉnh (ID)"
            name="id_khoan_dieu_chinh"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Số tiền điều chỉnh"
            name="phi"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Tiền tệ"
            name="ma_tien_te"
            initialValue={selectedLoHang.ma_ngoai_te}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Mô tả" name="mo_ta">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
