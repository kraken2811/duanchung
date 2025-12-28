import { useState } from "react";
import { Table, Button, Input, InputNumber, Space, Card, message } from "antd";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";

export default function EdaGoods({ idToKhai, onSave }) {
  const [goods, setGoods] = useState([]);

  /* ================= ADD ================= */
  const handleAdd = () => {
    setGoods([
      ...goods,
      {
        id: Date.now(),
        ma_hs: "",
        mo_ta: "",
        so_luong: 0,
        don_vi: "",
        don_gia: 0,
        tri_gia: 0,
        xuat_xu: "",
      },
    ]);
  };

  /* ================= UPDATE ================= */
  const updateField = (id, field, value) => {
    setGoods((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              [field]: value,
              tri_gia:
                field === "so_luong" || field === "don_gia"
                  ? (field === "so_luong"
                      ? value
                      : g.so_luong) *
                    (field === "don_gia"
                      ? value
                      : g.don_gia)
                  : g.tri_gia,
            }
          : g
      )
    );
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    setGoods(goods.filter((g) => g.id !== id));
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!idToKhai) {
      message.error("Chưa có tờ khai");
      return;
    }

    if (!goods.length) {
      message.warning("Chưa có hàng hóa");
      return;
    }

    try {
      await onSave({
        id_to_khai: idToKhai,
        goods,
      });

      message.success("Lưu hàng hóa thành công");
    } catch (err) {
      console.error(err);
      message.error("Lỗi lưu hàng hóa");
    }
  };

  /* ================= TABLE ================= */
  const columns = [
    {
      title: "Mã HS",
      dataIndex: "ma_hs",
      render: (_, r) => (
        <Input
          value={r.ma_hs}
          onChange={(e) =>
            updateField(r.id, "ma_hs", e.target.value)
          }
        />
      ),
    },
    {
      title: "Mô tả hàng",
      dataIndex: "mo_ta",
      render: (_, r) => (
        <Input
          value={r.mo_ta}
          onChange={(e) =>
            updateField(r.id, "mo_ta", e.target.value)
          }
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "so_luong",
      render: (_, r) => (
        <InputNumber
          value={r.so_luong}
          onChange={(v) =>
            updateField(r.id, "so_luong", v)
          }
        />
      ),
    },
    {
      title: "Đơn vị",
      dataIndex: "don_vi",
      render: (_, r) => (
        <Input
          value={r.don_vi}
          onChange={(e) =>
            updateField(r.id, "don_vi", e.target.value)
          }
        />
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "don_gia",
      render: (_, r) => (
        <InputNumber
          value={r.don_gia}
          onChange={(v) =>
            updateField(r.id, "don_gia", v)
          }
        />
      ),
    },
    {
      title: "Trị giá",
      dataIndex: "tri_gia",
      render: (_, r) => (
        <InputNumber value={r.tri_gia} disabled />
      ),
    },
    {
      title: "Xuất xứ",
      dataIndex: "xuat_xu",
      render: (_, r) => (
        <Input
          value={r.xuat_xu}
          onChange={(e) =>
            updateField(r.id, "xuat_xu", e.target.value)
          }
        />
      ),
    },
    {
      title: "",
      width: 70,
      render: (_, r) => (
        <Button
          danger
          icon={<FiTrash2 />}
          onClick={() => handleDelete(r.id)}
        />
      ),
    },
  ];

  return (
    <Card title="Danh sách hàng hóa">
      <Space style={{ marginBottom: 12 }}>
        <Button icon={<FiPlus />} onClick={handleAdd}>
          Thêm hàng
        </Button>

        <Button
          type="primary"
          icon={<FiSave />}
          onClick={handleSave}
          disabled={!idToKhai}
        >
          Lưu hàng hóa
        </Button>
      </Space>

      <Table
        rowKey="id"
        dataSource={goods}
        columns={columns}
        pagination={false}
        bordered
      />
    </Card>
  );
}
