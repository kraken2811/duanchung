import {
  Table,
  Button,
  Space,
  Modal,
  Descriptions,
  Tag,
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Alert,
} from "antd";
import { useEffect, useState } from "react";
import { getLoHangList, getLoHangById } from "../api/product.api";
import "../css/lohang.css";

export default function LotGoods({ onSelectLoHang, selectedLoHang }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const [pagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [form] = Form.useForm();

  /* ================= FETCH ================= */
  const fetchData = async (params = {}) => {
    setLoading(true);
    const res = await getLoHangList({
      page: params.page || pagination.current,
      size: params.size || pagination.pageSize,
      ...params.filters,
    });
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= VIEW DETAIL ================= */
  const handleView = async (id) => {
    const res = await getLoHangById(id);
    setSelectedDetail(res.data);
  };

  /* ================= SELECT MASTER ================= */
  const handleSelect = (record) => {
    onSelectLoHang && onSelectLoHang(record);
  };

  /* ================= SEARCH ================= */
  const onSearch = (values) => {
    fetchData({
      page: 1,
      filters: values,
    });
  };

  /* ================= TABLE ================= */
  const columns = [
    { title: "Số lô hàng", dataIndex: "so_lo_hang" },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      render: (v) => <Tag color="blue">{v}</Tag>,
    },
    {
      title: "Hành trình",
      render: (_, r) => `${r.cang_xep_hang} → ${r.cang_do_hang}`,
    },
    {
      title: "Tổng giá trị",
      render: (_, r) =>
        `${r.tong_gia_tri?.toLocaleString()} ${r.ma_ngoai_te}`,
    },
    {
      title: "Thao tác",
      width: 260,
      render: (_, r) => (
        <Space>
          <Button type="link" onClick={() => handleView(r.id_lo_hang)}>
            Xem chi tiết
          </Button>

          <Button
            type="primary"
            disabled={
              selectedLoHang &&
              selectedLoHang.id_lo_hang === r.id_lo_hang
            }
            onClick={() => handleSelect(r)}
          >
            {selectedLoHang &&
            selectedLoHang.id_lo_hang === r.id_lo_hang
              ? "Đang làm việc"
              : "Chọn làm việc"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* GỢI Ý NGHIỆP VỤ */}
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 12 }}
        message="Chọn một lô hàng để thực hiện các nghiệp vụ: tồn kho, điều chỉnh giá trị, loại hình đặc biệt"
      />

      {/* SEARCH */}
      <Card style={{ marginBottom: 16 }}>
        <Form layout="vertical" form={form} onFinish={onSearch}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="so_lo_hang" label="Số lô hàng">
                <Input />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item name="trang_thai" label="Trạng thái">
                <Select
                  allowClear
                  options={[
                    { value: "NHAP", label: "Nhập" },
                    { value: "XUAT", label: "Xuất" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={6} style={{ marginTop: 30 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    fetchData();
                  }}
                >
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* TABLE */}
      <Table
        rowKey="id_lo_hang"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        rowClassName={(record) =>
          selectedLoHang &&
          record.id_lo_hang === selectedLoHang.id_lo_hang
            ? "selected-row"
            : ""
        }
      />

      {/* DETAIL MODAL */}
      <Modal
        open={!!selectedDetail}
        onCancel={() => setSelectedDetail(null)}
        footer={null}
        width={900}
        title="Chi tiết lô hàng"
      >
        {selectedDetail && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Số lô">
              {selectedDetail.so_lo_hang}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag>{selectedDetail.trang_thai}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Cảng xếp">
              {selectedDetail.cang_xep_hang}
            </Descriptions.Item>
            <Descriptions.Item label="Cảng dỡ">
              {selectedDetail.cang_do_hang}
            </Descriptions.Item>
            <Descriptions.Item label="Giá trị">
              {selectedDetail.tong_gia_tri}{" "}
              {selectedDetail.ma_ngoai_te}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}
