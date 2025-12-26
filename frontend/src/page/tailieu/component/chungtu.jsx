import { Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getTailieuByToKhai } from "../api/tailieu.api";

export default function ChungTuTab({ selectedToKhai }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTailieuByToKhai(selectedToKhai.id_to_khai)
      .then((res) => setData(res.data));
  }, [selectedToKhai]);

  return (
    <Table
      rowKey="id_tai_lieu"
      columns={[
        { title: "Tên file", dataIndex: "ten_file" },
        {
          title: "Loại",
          dataIndex: "loai_tai_lieu",
          render: (v) => <Tag>{v}</Tag>,
        },
        { title: "Người tải", dataIndex: "nguoi_tai_len" },
        { title: "Ngày tải", dataIndex: "ngay_tai_len" },
      ]}
      dataSource={data}
    />
  );
}
