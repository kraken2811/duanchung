import {
  Card, Table, Button, Modal,
  Form, Input, InputNumber, message
} from "antd";
import { useEffect, useState } from "react";
import {
  getMaHSList,
  createMaHS,
  updateMaHS
} from "../api/maHS.api";

export default function MaHSPage() {
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
    const res = await getMaHSList();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    selected
      ? await updateMaHS(selected.id, values)
      : await createMaHS(values);

    message.success("Lưu mã HS thành công");
    setOpen(false);
    setSelected(null);
    fetchData();
  };

  return (
    <Card title="Danh mục Mã HS">
      <Button type="primary" onClick={() => setOpen(true)} style={{marginBottom:16}}>
        Thêm mã HS
      </Button>

      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: "Mã HS", dataIndex: "ma_hs" },
          { title: "Mô tả", dataIndex: "mo_ta" },
          { title: "Thuế NK (%)", dataIndex: "thue_nhap_khau" },
          { title: "Thuế VAT (%)", dataIndex: "thue_vat" },
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
          <Form.Item name="ma_hs" label="Mã HS" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="mo_ta" label="Mô tả">
            <Input />
          </Form.Item>
          <Form.Item name="thue_nhap_khau" label="Thuế NK (%)">
            <InputNumber style={{width:"100%"}} />
          </Form.Item>
          <Form.Item name="thue_vat" label="Thuế VAT (%)">
            <InputNumber style={{width:"100%"}} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
