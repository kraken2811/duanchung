import { Table, Tag } from "antd";

export default function MaterialListTable({
  data,
  loading,
  selectedRowKeys,
  onSelectChange,
}) {
  const columns = [
    {
      title: "STT",
      key: "index",
      width: 50,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Mã NPL",
      dataIndex: "code",
      width: 120,
      sorter: (a, b) => a.code.localeCompare(b.code),
      render: (text) => <span style={{ fontWeight: "bold", color: "#1890ff" }}>{text}</span>,
    },
    {
      title: "Tên nguyên liệu",
      dataIndex: "name",
      width: 250,
      ellipsis: true,
    },
    {
      title: "Tên tiếng Anh",
      dataIndex: "nameEn",
      width: 200,
      ellipsis: true,
      responsive: ["lg"],
    },
    {
      title: "ĐVT",
      dataIndex: "unit",
      width: 80,
      align: "center",
    },
    {
      title: "Mã HS",
      dataIndex: "hsCode",
      width: 100,
      align: "center",
    },
    {
      title: "Thuế NK (%)",
      dataIndex: "taxRate",
      width: 100,
      align: "right",
      render: (val) => val ? `${val}%` : "-",
    },
    {
      title: "Xuất xứ",
      dataIndex: "originCountry",
      width: 80,
      align: "center",
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      width: 120,
      align: "right",
      render: (val) => val ? `$ ${val.toLocaleString()}` : "-",
    },
    {
      title: "Nguồn gốc",
      dataIndex: "source",
      width: 120,
      render: (val) => (
        <Tag color={val === "import" ? "blue" : "green"}>
          {val === "import" ? "Nhập khẩu" : "Nội địa"}
        </Tag>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "radio", // Chọn từng dòng (hoặc 'checkbox' nếu muốn xóa nhiều)
  };

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      loading={loading}
      rowSelection={rowSelection}
      bordered
      size="small" // Quan trọng: tạo cảm giác data-dense
      pagination={{
        defaultPageSize: 20,
        showSizeChanger: true,
        showTotal: (total, range) => (
          <strong>{`Hiển thị ${range[0]}-${range[1]} của ${total} bản ghi`}</strong>
        ),
        pageSizeOptions: ["20", "50", "100"],
      }}
      scroll={{ y: "calc(100vh - 350px)" }} // Scroll nội dung table
      onRow={(record) => ({
        onClick: () => onSelectChange([record.id], [record]), // Click row to select
      })}
    />
  );
}