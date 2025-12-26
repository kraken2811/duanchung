import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  message,
} from "antd";
import { useEffect, useState } from "react";

import {
  getDoiTacList,
  createDoiTac,
  updateDoiTac,
} from "../api/doiTac.api";

export default function DoiTacPage() {
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
    try {
      setLoading(true);
      const res = await getDoiTacList(params);
      setData(res.data);
    } catch {
      message.error("Không tải được danh sách đối tác");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (type, record) => {
    setMode(type);
    setSelected(record || null);
    setOpen(true);

    if (record) form.setFieldsValue(record);
    else form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (mode === "create") {
        await createDoiTac(values);
        message.success("Thêm đối tác thành công");
      } else if (mode === "edit") {
        await updateDoiTac(selected.id, values);
        message.success("Cập nhật đối tác thành công");
      }

      setOpen(false);
      fetchData();
    } catch {
      message.error("Lỗi xử lý dữ liệu");
    }
  };

  const onSearch = (values) => {
    fetchData(values);
  };

  const columns = [
    { title: "Mã đối tác", dataIndex: "ma_doi_tac" },
    { title: "Tên đối tác", dataIndex: "ten_doi_tac" },
    {
      title: "Loại",
      dataIndex: "loai_doi_tac",
      render: (v) => (
        <Tag color="blue">
          {v === "KHACH_HANG"
            ? "Khách hàng"
            : v === "DAI_LY"
            ? "Đại lý"
            : "Nhà cung cấp"}
        </Tag>
      ),
    },
    { title: "Quốc gia", dataIndex: "quoc_gia" },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      render: (v) => (
        <Tag color={v === "ACTIVE" ? "green" : "red"}>
          {v === "ACTIVE" ? "Hoạt động" : "Ngưng"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      render: (_, r) => (
        <Space>
          <Button type="link" onClick={() => openModal("view", r)}>
            Xem
          </Button>
          <Button  type="link" onClick={() => openModal("edit", r)}>
            Sửa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Danh mục Đối tác">
      {/* ===== SEARCH ===== */}
      <Form
        layout="inline"
        style={{ marginBottom: 16 }}
        onFinish={onSearch}
      >
        <Form.Item name="keyword">
          <Input placeholder="Mã / Tên đối tác" />
        </Form.Item>

        <Form.Item name="loai_doi_tac">
          <Select
            allowClear
            placeholder="Loại đối tác"
            style={{ width: 150 }}
            options={[
              { value: "KHACH_HANG", label: "Khách hàng" },
              { value: "DAI_LY", label: "Đại lý" },
              { value: "NCC", label: "Nhà cung cấp" },
            ]}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Tìm
        </Button>
        <Button
        style={{marginLeft: 10}}
          onClick={() => {
            fetchData();
          }}
        >
          Reset
        </Button>
      </Form>

      {/* ===== ACTION ===== */}
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => openModal("create")}
      >
        Thêm đối tác
      </Button>

      {/* ===== TABLE ===== */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* ===== MODAL ===== */}
      <Modal
        title={
          mode === "create"
            ? "Thêm đối tác"
            : mode === "edit"
            ? "Cập nhật đối tác"
            : "Chi tiết đối tác"
        }
        open={open}
        onCancel={() => setOpen(false)}
        onOk={mode === "view" ? () => setOpen(false) : () => form.submit()}
        okButtonProps={{ disabled: mode === "view" }}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={mode === "view"}
        >
          <Form.Item
            label="Mã đối tác"
            name="ma_doi_tac"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tên đối tác"
            name="ten_doi_tac"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Loại đối tác"
            name="loai_doi_tac"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { value: "KHACH_HANG", label: "Khách hàng" },
                { value: "DAI_LY", label: "Đại lý" },
                { value: "NCC", label: "Nhà cung cấp" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Quốc gia" name="quoc_gia">
            <Input />
          </Form.Item>

          <Form.Item label="Mã số thuế" name="ma_so_thue">
            <Input />
          </Form.Item>

          <Form.Item label="Trạng thái" name="trang_thai">
            <Select
              options={[
                { value: "ACTIVE", label: "Hoạt động" },
                { value: "INACTIVE", label: "Ngưng" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
