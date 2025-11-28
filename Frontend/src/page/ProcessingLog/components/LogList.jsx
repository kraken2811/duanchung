import React from "react";
import { Table, Tag, Card } from "antd";
import { FiFileText } from "react-icons/fi";
import { getStatusInfo } from "../utils/status"; // Import util đã tạo

export default function LogList({ data, selectedId, onSelect, loading }) {
  // Cấu hình cột
  const columns = [
    {
      title: "",
      dataIndex: "status",
      width: 40,
      align: "center",
      render: (status) => {
        const { icon, color } = getStatusInfo(status);
        return <span style={{ color, fontSize: 16 }}>{icon}</span>;
      },
    },
    {
      title: "Mã",
      dataIndex: "code",
      width: 70,
      render: (code) => <Tag color="blue">{code}</Tag>,
    },
    {
      title: "Nghiệp vụ / Thông báo",
      dataIndex: "name",
      ellipsis: true,
      render: (text) => <span style={{ fontWeight: 500, fontSize: 13 }}>{text}</span>,
    },
    {
      title: "Thời gian",
      dataIndex: "processDate", // Dùng trường processDate như định nghĩa trong types
      width: 140,
      align: "right",
      render: (text) => <span style={{ fontSize: 12, color: "#888" }}>{text}</span>,
    },
  ];

  return (
    <Card
      title={
        <>
          <FiFileText style={{ marginRight: 8 }} />
          Danh sách thông điệp
        </>
      }
      bodyStyle={{ padding: 0 }}
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={false}
        size="small"
        scroll={{ y: 500 }} // Cho phép cuộn nếu danh sách dài
        onRow={(record) => ({
          onClick: () => onSelect(record),
          style: {
            cursor: "pointer",
            backgroundColor: selectedId === record.id ? "#e6f7ff" : "transparent",
            transition: "background 0.3s",
          },
        })}
      />
    </Card>
  );
}