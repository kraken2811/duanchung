import { Table } from "antd";

export default function DataTable({
  columns,
  data,
  loading,
  rowKey = "id",
  pagination = false,
  bordered = true,
  size = "middle",
}) {
  return (
    <Table
      rowKey={rowKey}
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={pagination}
      bordered={bordered}
      size={size}
    />
  );
}
