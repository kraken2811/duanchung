import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Tag,
  Alert,
  Space,
  Select,
  message,
  Card,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

export default function VanDonContainerTab() {
  const [loHangs, setLoHangs] = useState([]);
  const [selectedLoHang, setSelectedLoHang] = useState(null);
  const [vanDons, setVanDons] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchLoHangs = async () => {
    try {
      const res = await axios.get("/lo_hangs");
      setLoHangs(res.data || []);
    } catch {
      message.error("Không tải được danh sách lô hàng");
    }
  };

  const fetchVanDons = async (idLoHang) => {
    if (!idLoHang) return;
    try {
      setLoading(true);
      const res = await axios.get(`/van_dons/lo-hang/${idLoHang}`);
      setVanDons(res.data || []);
    } catch {
      message.error("Không tải được danh sách vận đơn");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoHangs();
  }, []);

  const handleSelectLoHang = (id) => {
    const lo = loHangs.find((l) => l.id_lo_hang === id);
    setSelectedLoHang(lo || null);
    setVanDons([]);
    fetchVanDons(id);
  };

  const handleAddVanDon = async (values) => {
    if (!selectedLoHang?.id_lo_hang) {
      message.error("Chưa chọn lô hàng");
      return;
    }

    try {
      await axios.post("/van_dons", {
        so_van_don: values.so_van_don,
        ten_tau: values.ten_tau,
        hanh_trinh: values.hanh_trinh,
        so_container: values.so_container,
        id_lo_hang: selectedLoHang.id_lo_hang,
      });

      message.success("Thêm vận đơn thành công");
      setOpen(false);
      form.resetFields();
      fetchVanDons(selectedLoHang.id_lo_hang);
    } catch {
      message.error("Thêm vận đơn thất bại");
    }
  };

  const columns = [
    { title: "Số vận đơn", dataIndex: "so_van_don" },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      render: (v) => <Tag color="blue">{v || "MỚI"}</Tag>,
    },
    { title: "Tên tàu", dataIndex: "ten_tau" },
    { title: "Hành trình", dataIndex: "hanh_trinh" },
    { title: "Số container", dataIndex: "so_container" },
    {
      title: "Ngày tạo",
      dataIndex: "ngay_tao",
      render: (v) => dayjs(v).format("DD/MM/YYYY"),
    },
  ];

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <Space>
          <strong>Chọn lô hàng:</strong>
          <Select
            style={{ width: 360 }}
            placeholder="Chọn lô hàng"
            showSearch
            optionFilterProp="label"
            onChange={handleSelectLoHang}
            options={loHangs.map((l) => ({
              value: l.id_lo_hang,
              label: `${l.so_lo_hang} (${l.cang_xep_hang} → ${l.cang_do_hang})`,
            }))}
          />
        </Space>
      </Card>

      {!selectedLoHang && (
        <Alert
          type="info"
          showIcon
          message="Vui lòng chọn một lô hàng để xem vận đơn"
        />
      )}

      {selectedLoHang && (
        <>
          <Space style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={() => setOpen(true)}>
              Thêm vận đơn
            </Button>
          </Space>

          <Table
            rowKey="id_van_don"
            columns={columns}
            dataSource={vanDons}
            loading={loading}
            pagination={{ pageSize: 5 }}
          />
        </>
      )}

      <Modal
        title={`Thêm vận đơn – ${selectedLoHang?.so_lo_hang}`}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleAddVanDon}>
          <Form.Item
            label="Số vận đơn"
            name="so_van_don"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Tên tàu" name="ten_tau">
            <Input />
          </Form.Item>

          <Form.Item label="Hành trình" name="hanh_trinh">
            <Input />
          </Form.Item>

          <Form.Item label="Số container" name="so_container">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
