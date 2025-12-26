import {
  Card, Table, Button, Space, Modal,
  Form, Input, Tag, message
} from "antd";
import { useEffect, useState } from "react";
import {
  getKhoBaiList,
  createKhoBai,
  updateKhoBai
} from "../api/khoBai.api";

export default function KhoBaiPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async (params = {}) => {
    setLoading(true);
    const res = await getKhoBaiList(params);
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (type, record) => {
    setMode(type);
    setSelected(record || null);
    setOpen(true);
    record ? form.setFieldsValue(record) : form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      mode === "create"
        ? await createKhoBai(values)
        : await updateKhoBai(selected.id, values);
      message.success("Lưu kho bãi thành công");
      setOpen(false);
      fetchData();
    } catch {
      message.error("Lỗi xử lý kho bãi");
    }
  };

  const columns = [
    { title: "Mã kho", dataIndex: "ma_kho" },
    { title: "Tên kho", dataIndex: "ten_kho" },
    { title: "Địa chỉ", dataIndex: "dia_chi" },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      render: (v) => (
        <Tag color={v === "ACTIVE" ? "green" : "red"}>{v}</Tag>
      ),
    },
    {
      title: "Thao tác",
      render: (_, r) => (
        <Space>
          <Button type="link" onClick={() => openModal("edit", r)}>Sửa</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Danh mục Kho bãi">
      <Button type="primary" onClick={() => openModal("create")} style={{marginBottom:16}}>
        Thêm kho
      </Button>

      <Table rowKey="id" columns={columns} dataSource={data} loading={loading} />

      <Modal
        open={open}
        title={mode === "create" ? "Thêm kho" : "Cập nhật kho"}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="ma_kho" label="Mã kho" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="ten_kho" label="Tên kho" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="dia_chi" label="Địa chỉ">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
