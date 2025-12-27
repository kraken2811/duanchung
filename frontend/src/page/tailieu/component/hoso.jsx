import {
  Table,
  Upload,
  Button,
  Tag,
  Alert,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getTailieuByToKhai,
  updateTailieu,
} from "../api/tailieu.api";

export default function HoSoTab({ selectedToKhai }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getTailieuByToKhai(
      selectedToKhai.id_to_khai
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [selectedToKhai]);

  const uploadProps = {
    customRequest: async ({ file }) => {
      const form = new FormData();
      form.append("file", file);
      form.append("loai_tai_lieu", "HO_SO_DIEN_TU");

      await updateTailieu(selectedToKhai.id_to_khai, form);
      message.success("Upload thành công");
      fetchData();
    },
  };

  if (selectedToKhai.trang_thai_gui !== "NHAP") {
    return (
      <Alert
        type="warning"
        showIcon
        message="Tờ khai đã gửi / thông quan, không được chỉnh sửa hồ sơ"
      />
    );
  }

  return (
    <>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>
          Thêm hồ sơ
        </Button>
      </Upload>

      <Table
        rowKey="id_tai_lieu"
        columns={[
          { title: "Tên file", dataIndex: "ten_file" },
          {
            title: "Loại",
            dataIndex: "loai_tai_lieu",
            render: (v) => <Tag>{v}</Tag>,
          },
          { title: "Ngày tải", dataIndex: "ngay_tai_len" },
        ]}
        dataSource={data}
        style={{ marginTop: 16 }}
      />
    </>
  );
}
