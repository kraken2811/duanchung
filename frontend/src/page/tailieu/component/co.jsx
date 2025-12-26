import {
  Card,
  Descriptions,
  Tag,
  Upload,
  Button,
  Alert,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getTailieuByToKhai,
  updateTailieu,
} from "../api/tailieu.api";

export default function COTab({ selectedToKhai }) {
  const [co, setCO] = useState(null);

  const fetchCO = async () => {
    const res = await getTailieuByToKhai(
      selectedToKhai.id_to_khai
    );
    setCO(res.data.find((i) => i.loai_tai_lieu === "CO"));
  };

  useEffect(() => {
    fetchCO();
  }, [selectedToKhai]);

  if (selectedToKhai.trang_thai_gui !== "NHAP") {
    return (
      <Alert
        type="warning"
        showIcon
        message="Không được chỉnh sửa C/O khi tờ khai đã gửi"
      />
    );
  }

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Số tờ khai">
            {selectedToKhai.so_to_khai}
          </Descriptions.Item>
          <Descriptions.Item label="Loại hình">
            <Tag color="blue">
              {selectedToKhai.loai_hinh_dac_biet?.ma_loai_hinh}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {!co ? (
        <Upload
          customRequest={async ({ file }) => {
            const form = new FormData();
            form.append("file", file);
            form.append("loai_tai_lieu", "CO");
            await updateTailieu(
              selectedToKhai.id_to_khai,
              form
            );
            fetchCO();
          }}
        >
          <Button type="primary" icon={<UploadOutlined />}>
            Upload C/O
          </Button>
        </Upload>
      ) : (
        <Alert
          type="success"
          message={`Đã có C/O: ${co.ten_file}`}
        />
      )}
    </>
  );
}
