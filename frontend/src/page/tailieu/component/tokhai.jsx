import {
  Table,
  Button,
  Space,
  Tag,
  Card,
  Form,
  Input,
  Row,
  Col,
} from "antd";
import { useEffect, useState } from "react";
import { getToKhaiList } from "../api/tokhai.api";

export default function ToKhaiTab({ onSelectToKhai, selectedToKhai }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async (filters = {}) => {
    setLoading(true);
    const res = await getToKhaiList(filters);
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSearch = (values) => fetchData(values);

  const columns = [
    { title: "Số tờ khai", dataIndex: "so_to_khai" },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai_gui",
      render: (v) => <Tag>{v}</Tag>,
    },
    {
      title: "Loại hình",
      render: (_, r) => (
        <Tag color="blue">{r.loai_hinh_dac_biet?.ma_loai_hinh}</Tag>
      ),
    },
    {
      title: "Thao tác",
      render: (_, r) => (
        <Button
          type="primary"
          disabled={
            selectedToKhai &&
            selectedToKhai.id_to_khai === r.id_to_khai
          }
          onClick={() => onSelectToKhai(r)}
        >
          {selectedToKhai &&
          selectedToKhai.id_to_khai === r.id_to_khai
            ? "Đang làm việc"
            : "Chọn làm việc"}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <Form layout="vertical" form={form} onFinish={onSearch}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="so_to_khai" label="Số tờ khai">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} style={{ marginTop: 30 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
                <Button onClick={() => fetchData()}>
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Table
        rowKey="id_to_khai"
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </>
  );
}
