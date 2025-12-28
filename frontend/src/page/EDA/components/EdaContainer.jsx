import { useState, useEffect } from "react";
import { Table, Button, Input, InputNumber, Select, Space, Card, message } from "antd";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const { Option } = Select;

export default function EdaContainer({ idToKhai, onSave }) {
  const [containers, setContainers] = useState([]);
  const [saving, setSaving] = useState(false);

  /* ================= LOAD LOCAL ================= */
  useEffect(() => {
    if (!idToKhai) return;

    const saved = localStorage.getItem(`eda_containers_${idToKhai}`);
    if (saved) {
      setContainers(JSON.parse(saved));
    }
  }, [idToKhai]);

  /* ================= AUTO SAVE (DEBOUNCE) ================= */
  useEffect(() => {
    if (!idToKhai || !containers.length) return;

    const timer = setTimeout(async () => {
      try {
        setSaving(true);

        await onSave({
          id_to_khai: idToKhai,
          containers,
        });

        localStorage.setItem(
          `eda_containers_${idToKhai}`,
          JSON.stringify(containers)
        );
      } catch (err) {
        console.error(err);
      } finally {
        setSaving(false);
      }
    }, 800); // 👈 debounce 800ms

    return () => clearTimeout(timer);
  }, [containers, idToKhai, onSave]);

  /* ================= ADD ================= */
  const handleAdd = () => {
    setContainers((prev) => [
      ...prev,
      {
        id: Date.now(),
        so_container: "",
        so_seal: "",
        loai_container: "",
        trong_luong: null,
      },
    ]);
  };

  /* ================= UPDATE ================= */
  const updateField = (id, field, value) => {
    setContainers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    const next = containers.filter((c) => c.id !== id);
    setContainers(next);
    localStorage.setItem(
      `eda_containers_${idToKhai}`,
      JSON.stringify(next)
    );
  };

  /* ================= TABLE ================= */
  const columns = [
    {
      title: "Số container",
      render: (_, r) => (
        <Input
          value={r.so_container}
          onChange={(e) =>
            updateField(r.id, "so_container", e.target.value)
          }
        />
      ),
    },
    {
      title: "Số seal",
      render: (_, r) => (
        <Input
          value={r.so_seal}
          onChange={(e) =>
            updateField(r.id, "so_seal", e.target.value)
          }
        />
      ),
    },
    {
      title: "Loại container",
      render: (_, r) => (
        <Select
          value={r.loai_container}
          style={{ width: "100%" }}
          onChange={(v) =>
            updateField(r.id, "loai_container", v)
          }
        >
          <Option value="20DC">20DC</Option>
          <Option value="40DC">40DC</Option>
          <Option value="40HC">40HC</Option>
        </Select>
      ),
    },
    {
      title: "Trọng lượng (KG)",
      render: (_, r) => (
        <InputNumber
          style={{ width: "100%" }}
          value={r.trong_luong}
          onChange={(v) =>
            updateField(r.id, "trong_luong", v)
          }
        />
      ),
    },
    {
      title: "",
      width: 60,
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
    <Card
      title="Danh sách Container"
      extra={
        saving ? (
          <span style={{ color: "#1890ff" }}>Đang lưu...</span>
        ) : (
          <span style={{ color: "green" }}>✓ Đã lưu</span>
        )
      }
    >
      <Space style={{ marginBottom: 12 }}>
        <Button onClick={handleAdd}>Thêm container</Button>
      </Space>

      <Table
        rowKey="id"
        dataSource={containers}
        columns={columns}
        pagination={false}
        bordered
      />
    </Card>
  );
}
