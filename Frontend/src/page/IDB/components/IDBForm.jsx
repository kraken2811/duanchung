import { useForm } from "react-hook-form";
import {
  Row,
  Col,
  Input,
  DatePicker,
  Button,
  Divider,
  Table,
} from "antd";
import { FiPlus, FiTrash2, FiUpload } from "react-icons/fi";
import { useState } from "react";
import useNotify from "@/components/notification/useNotify";

import { IDB_DEFAULT } from "../types";
import { formatIDB } from "../utils/status";

export default function IDBForm() {
  const notify = useNotify();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: IDB_DEFAULT,
  });

  const [docs, setDocs] = useState([]);

  const columns = [
    { title: "Loại chứng từ", dataIndex: "type" },
    { title: "Số chứng từ", dataIndex: "number" },
    { title: "Ngày phát hành", dataIndex: "date" },
    {
      title: "",
      width: 50,
      render: (_, r) => (
        <FiTrash2
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => setDocs(docs.filter((d) => d.id !== r.id))}
        />
      ),
    },
  ];

  const addDoc = () => {
    const id = Date.now();
    setDocs([
      ...docs,
      {
        id,
        type: "Invoice",
        number: `INV-${id % 1000}`,
        date: "2024-01-01",
      },
    ]);
  };

  const onSubmit = (data) => {
    const final = formatIDB({ ...data, docs });
    console.log("IDB SUBMIT:", final);
    notify.success("Đã gửi tờ khai IDB");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Thông tin chung */}
      <Row gutter={16}>
        <Col span={8}>
          <label>Số tờ khai</label>
          <Input placeholder="VD: 102742" {...register("declarationNumber")} />
        </Col>

        <Col span={8}>
          <label>Ngày đăng ký</label>
          <DatePicker
            style={{ width: "100%" }}
            onChange={(d) => setValue("regDate", d)}
          />
        </Col>

        <Col span={8}>
          <label>Lý do bổ sung</label>
          <Input placeholder="VD: Thiếu chứng từ" {...register("reason")} />
        </Col>
      </Row>

      <Divider />

      {/* Danh sách chứng từ */}
      <h3>Danh sách chứng từ bổ sung</h3>

      <Button
        type="dashed"
        icon={<FiPlus />}
        onClick={addDoc}
        style={{ marginBottom: 12 }}
      >
        Thêm chứng từ
      </Button>

      <Table
        columns={columns}
        dataSource={docs}
        rowKey="id"
        pagination={false}
        bordered
      />

      <Divider />

      {/* Upload */}
      <h3>Đính kèm file chứng từ</h3>
      <Button icon={<FiUpload />}>Tải lên</Button>

      <Divider />

      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button type="primary" size="large" htmlType="submit">
          Gửi IDB
        </Button>
      </div>
    </form>
  );
}
