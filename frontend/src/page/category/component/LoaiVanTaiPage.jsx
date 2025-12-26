import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
} from "antd";
import { useEffect, useState } from "react";

import {
  getLoaiVanTaiList,
  createLoaiVanTai,
  updateLoaiVanTai,
} from "../api/loaiVanTai.api";

export default function LoaiVanTaiPage() {
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getLoaiVanTaiList();
      setData(res.data);
    } catch {
      message.error("Không tải được loại vận tải");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= MODAL ================= */
  const openModal = (type, record) => {
    setMode(type);
    setSelected(record || null);
    setOpen(true);

    if (record) form.setFieldsValue(record);
    else form.resetFields();
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (values) => {
    try {
      if (mode === "create") {
        await createLoaiVanTai(values);
        message.success("Thêm loại vận tải thành công");
      } else {
        await updateLoaiVanTai(selected.id, values);
        message.success("Cập nhật loại vận tải thành công");
      }

      setOpen(false);
      fetchData();
    } catch {
      message.error("Lỗi xử lý loại vận tải");
    }
  };

  /* ================= TABLE ================= */
  const columns = [
    { title: "Mã loại", dataIndex: "ma_loai" },
    { title: "Tên loại vận tải", dataIndex: "ten_loai" },
    { title: "Mô tả", dataIndex: "mo_ta" },
    {
      title: "Thao tác",
      render: (_, r) => (
        <Space>
          <Button type="link" onClick={() => openModal("edit", r)}>
            Sửa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Danh mục Loại vận tải">
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => openModal("create")}
      >
        Thêm loại vận tải
      </Button>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
      />

      <Modal
        title={mode === "create" ? "Thêm loại vận tải" : "Cập nhật loại vận tải"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Mã loại"
            name="ma_loai"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tên loại vận tải"
            name="ten_loai"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Mô tả" name="mo_ta">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
