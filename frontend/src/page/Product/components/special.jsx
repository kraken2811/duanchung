import {
  Descriptions,
  Tag,
  Alert,
  Card,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { getSpecialTypeByLoHang } from "../api/special.api";

export default function SpecialTypeTab({ selectedLoHang }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================== FETCH ================== */
  useEffect(() => {
    if (!selectedLoHang) {
      setData(null);
      return;
    }

    setLoading(true);
    getSpecialTypeByLoHang(selectedLoHang.id_lo_hang)
      .then((res) => {
        // nếu BE trả mảng → lấy phần tử đầu
        const result = Array.isArray(res.data)
          ? res.data[0]
          : res.data;
        setData(result || null);
      })
      .finally(() => setLoading(false));
  }, [selectedLoHang]);

  /* ================== UI GUARD ================== */
  if (!selectedLoHang) {
    return (
      <Alert
        message="Vui lòng chọn lô hàng để xem loại hình đặc biệt"
        type="warning"
        showIcon
      />
    );
  }

  if (loading) {
    return <Spin />;
  }

  if (!data) {
    return (
      <Alert
        message="Lô hàng chưa có loại hình đặc biệt"
        type="info"
        showIcon
      />
    );
  }

  return (
    <>
      {/* ===== CONTEXT LÔ HÀNG ===== */}
      <Card
        size="small"
        style={{
          marginBottom: 16,
          borderLeft: "4px solid #722ed1",
        }}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Lô hàng">
            <strong>{selectedLoHang.so_lo_hang}</strong>
          </Descriptions.Item>

          <Descriptions.Item label="Trạng thái">
            <Tag color={data.da_thong_quan ? "green" : "orange"}>
              {data.da_thong_quan
                ? "Đã thông quan"
                : "Chưa thông quan"}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Loại hình">
            <Tag color="blue">{data.ma_loai_hinh}</Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* ===== CẢNH BÁO NGHIỆP VỤ ===== */}
      {data.da_thong_quan && (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
          message="Lô hàng đã thông quan, không được thay đổi loại hình"
        />
      )}

      {/* ===== DETAIL ===== */}
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Mã loại hình">
          <Tag color="blue">{data.ma_loai_hinh}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Tên loại hình">
          {data.ten_loai_hinh}
        </Descriptions.Item>

        <Descriptions.Item label="Thời hạn">
          {data.thoi_han || "Không áp dụng"}
        </Descriptions.Item>

        <Descriptions.Item label="Ghi chú">
          {data.ghi_chu || "--"}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
