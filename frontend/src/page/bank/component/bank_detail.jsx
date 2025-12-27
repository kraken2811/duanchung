import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Descriptions,
  Tag,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  getBankTransactionList,
  getBankTransactionById,
} from "../api/bank.api";

const TRANG_THAI_MAP = {
  SUCCESS: { color: "green", label: "Thành công" },
  FAILED: { color: "red", label: "Thất bại" },
  PENDING: { color: "orange", label: "Đang xử lý" },
};

export default function GiaoDichNganHangView() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [form] = Form.useForm();

  /* ================= FETCH ================= */
  const fetchData = async (params = {}) => {
    try {
      setLoading(true);

      const res = await getBankTransactionList({
        page: params.page || pagination.current,
        size: params.size || pagination.pageSize,
        ...params.filters,
      });

      setData(res.data || []);
      setPagination((p) => ({
        ...p,
        total: res.total || 0,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= SEARCH ================= */
  const onSearch = (values) => {
    const filters = { ...values };

    if (filters.thoi_gian) {
      const [from, to] = filters.thoi_gian;
      filters.from_date = from.format("YYYY-MM-DD");
      filters.to_date = to.format("YYYY-MM-DD");
      delete filters.thoi_gian;
    }

    setPagination((p) => ({ ...p, current: 1 }));
    fetchData({ page: 1, filters });
  };

  const onReset = () => {
    form.resetFields();
    setPagination((p) => ({ ...p, current: 1 }));
    fetchData({ page: 1 });
  };

  /* ================= DETAIL ================= */
  const handleView = async (id) => {
    const res = await getBankTransactionById(id);
    setSelected(res.data);
  };

  /* ================= TABLE ================= */
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "thoi_gian_giao_dich",
      render: (v) => dayjs(v).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ngân hàng",
      dataIndex: "ten_ngan_hang",
    },
    {
      title: "Số tiền",
      dataIndex: "so_tien",
      align: "right",
      render: (v) => v?.toLocaleString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      render: (v) => (
        <Tag color={TRANG_THAI_MAP[v]?.color}>
          {TRANG_THAI_MAP[v]?.label}
        </Tag>
      ),
    },
    {
      title: "Kết quả",
      dataIndex: "ma_phan_hoi",
      render: (v) =>
        v === "00" ? (
          <Tag color="green">OK</Tag>
        ) : (
          <Tag color="red">{v}</Tag>
        ),
    },
    {
      title: "Thao tác",
      render: (_, r) => (
        <Button type="link" onClick={() => handleView(r.id_giao_dich)}>
          Xem
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* ===== SEARCH ===== */}
      <Card style={{ marginBottom: 16 }}>
        <Form form={form} layout="vertical" onFinish={onSearch}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="ten_ngan_hang" label="Ngân hàng">
                <Input />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name="trang_thai" label="Trạng thái">
                <Select allowClear options={[
                  { value: "SUCCESS", label: "Thành công" },
                  { value: "FAILED", label: "Thất bại" },
                  { value: "PENDING", label: "Đang xử lý" },
                ]} />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name="thoi_gian" label="Thời gian">
                <DatePicker.RangePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={6} style={{ textAlign: "right" }}>
              <Space style={{ marginTop: 30 }}>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
                <Button onClick={onReset}>Reset</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* ===== TABLE ===== */}
      <Table
        rowKey="id_giao_dich"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          ...pagination,
          showTotal: (t) => `Tổng ${t} giao dịch`,
        }}
        onChange={(p) => {
          setPagination(p);
          fetchData({
            page: p.current,
            size: p.pageSize,
            filters: form.getFieldsValue(),
          });
        }}
      />

      {/* ===== DETAIL ===== */}
      <Modal
        title="Hồ sơ giao dịch ngân hàng"
        open={!!selected}
        onCancel={() => setSelected(null)}
        footer={<Button onClick={() => setSelected(null)}>Đóng</Button>}
        width={900}
      >
        {selected && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Ngân hàng">
              {selected.ten_ngan_hang}
            </Descriptions.Item>

            <Descriptions.Item label="Tài khoản">
              {selected.tai_khoan_ngan_hang}
            </Descriptions.Item>

            <Descriptions.Item label="Số tiền">
              {selected.so_tien?.toLocaleString()}
            </Descriptions.Item>

            <Descriptions.Item label="Thời gian">
              {dayjs(selected.thoi_gian_giao_dich).format("DD/MM/YYYY HH:mm")}
            </Descriptions.Item>

            <Descriptions.Item label="Trạng thái">
              <Tag color={TRANG_THAI_MAP[selected.trang_thai]?.color}>
                {TRANG_THAI_MAP[selected.trang_thai]?.label}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Mã phản hồi">
              {selected.ma_phan_hoi}
            </Descriptions.Item>

            <Descriptions.Item label="Thông điệp" span={2}>
              {selected.thong_diep_phan_hoi}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}
