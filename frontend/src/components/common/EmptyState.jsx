import { Empty } from "antd";

export default function EmptyState({
  description = "Không có dữ liệu",
  style,
}) {
  return (
    <Empty
      description={description}
      style={{ padding: "40px 0", ...style }}
    />
  );
}
