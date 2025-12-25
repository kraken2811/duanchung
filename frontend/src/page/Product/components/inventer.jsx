import {
  Table,
  Tag,
  Alert,
  Card,
  Descriptions,
} from "antd";
import { useEffect, useState, useMemo } from "react";
import { getInventoryByLoHang } from "../api/inventory.api";

export default function InventoryTab({ selectedLoHang }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================== FETCH ================== */
  useEffect(() => {
    if (!selectedLoHang) {
      setData([]);
      return;
    }

    setLoading(true);
    getInventoryByLoHang(selectedLoHang.id_lo_hang)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [selectedLoHang]);

  /* ================== TỔNG TỒN ================== */
  const totalRemain = useMemo(() => {
    if (!selectedLoHang) return 0;
    return data.reduce(
      (s, i) => s + Number(i.ton_hien_tai || 0),
      0
    );
  }, [data, selectedLoHang]);

  /* ================== UI GUARD (SAU HOOKS) ================== */
  if (!selectedLoHang) {
    return (
      <Alert
        message="Vui lòng chọn lô hàng để xem tồn kho"
        type="warning"
        showIcon
      />
    );
  }

  /* ================== TABLE ================== */
  const columns = [
    { title: "Mã hàng", dataIndex: "ma_hang" },
    { title: "Tên hàng", dataIndex: "ten_hang" },
    { title: "SL nhập", dataIndex: "so_luong_nhap" },
    { title: "SL xuất", dataIndex: "so_luong_xuat" },
    {
      title: "SL tồn",
      dataIndex: "ton_hien_tai",
      render: (v) => {
        if (v === 0) return <Tag color="red">Hết hàng</Tag>;
        if (v < 10) return <Tag color="orange">{v}</Tag>;
        return <Tag color="green">{v}</Tag>;
      },
    },
  ];

  return (
    <>
      {/* ===== CONTEXT LÔ HÀNG ===== */}
      <Card
        size="small"
        style={{
          marginBottom: 16,
          borderLeft: "4px solid #52c41a",
        }}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Lô hàng">
            <strong>{selectedLoHang.so_lo_hang}</strong>
          </Descriptions.Item>

          <Descriptions.Item label="Hành trình">
            {selectedLoHang.cang_xep_hang} →{" "}
            {selectedLoHang.cang_do_hang}
          </Descriptions.Item>

          <Descriptions.Item label="Tổng SL tồn">
            <Tag color={totalRemain > 0 ? "green" : "red"}>
              {totalRemain}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* ===== TABLE ===== */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        locale={{
          emptyText: "Không có dữ liệu tồn kho cho lô hàng này",
        }}
      />
    </>
  );
}
