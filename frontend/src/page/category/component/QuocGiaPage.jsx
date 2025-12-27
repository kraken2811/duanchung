import {
  Card, Table, Button, Modal,
  Form, Input, message
} from "antd";
import { useEffect, useState } from "react";
import {
  getQuocGiaList,
  createQuocGia,
  updateQuocGia
} from "../api/quocGia.api";

export default function QuocGiaPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    const res = await getQuocGiaList();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    selected
      ? await updateQuocGia(selected.id, values)
      : await createQuocGia(values);

    message.success("Lưu quốc gia thành công");
    setOpen(false);
    setSelected(null);
    fetchData();
  };

  return (
    <Card title="Danh mục Quốc gia">
      <Button type="primary" onClick={() => setOpen(true)} style={{marginBottom:16}}>
        Thêm quốc gia
      </Button>

      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: "Mã quốc gia", dataIndex: "ma_quoc_gia" },
          { title: "Tên quốc gia", dataIndex: "ten_quoc_gia" },
        ]}
        onRow={(r) => ({
          onClick: () => {
            setSelected(r);
            form.setFieldsValue(r);
            setOpen(true);
          },
        })}
      />

      <Modal open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="ma_quoc_gia" label="Mã quốc gia" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="ten_quoc_gia" label="Tên quốc gia" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
