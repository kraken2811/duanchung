import { Pagination } from "antd";

export default function PaginationBar({
  total,
  page,
  pageSize,
  onChange,
  style,
}) {
  return (
    <Pagination
      total={total}
      current={page}
      pageSize={pageSize}
      onChange={onChange}
      showSizeChanger
      style={{ marginTop: 16, textAlign: "right", ...style }}
    />
  );
}
