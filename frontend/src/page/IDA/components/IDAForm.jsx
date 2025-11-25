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

import { IDA_DEFAULT } from "../types";
import { formatIDA } from "../utils/status";

export default function IDAForm() {
  const notify = useNotify();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: IDA_DEFAULT,
  });

  const [goods, setGoods] = useState([]);

  const columns = [
    { title: "Mã hàng", dataIndex: "code" },
    { title: "Mô tả", dataIndex: "desc" },
    { title: "Số lượng", dataIndex: "qty" },
    {
      title: "",
      render: (_, r) => (
        <FiTrash2
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => setGoods(goods.filter((g) => g.id !== r.id))}
        />
      ),
    },
  ];

  const addGoods = () => {
    const id = Date.now();
    setGoods([
      ...goods,
      { id, code: `HS-${id % 100}`, desc: "Hàng hóa demo", qty: 10 },
    ]);
  };

  const onSubmit = (data) => {
    const final = formatIDA({ ...data, goods });
    console.log("IDA SUBMIT:", final);
    notify.success("Đã lưu thông tin IDA");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={16}>
        <Col span={8}>
          <label>Số tờ khai</label>
          <Input
            placeholder="VD: 102742"
            {...register("declarationNumber")}
          />
        </Col>

        <Col span={8}>
          <label>Ngày đăng ký</label>
          <DatePicker
            style={{ width: "100%" }}
            onChange={(d) => setValue("regDate", d)}
          />
        </Col>

        <Col span={8}>
          <label>Loại hình</label>
          <Input placeholder="VD: A11" {...register("type")} />
        </Col>
      </Row>

      <Divider />

      <h3>Danh sách hàng hóa</h3>

      <Button
        type="dashed"
        icon={<FiPlus />}
        onClick={addGoods}
        style={{ marginBottom: 12 }}
      >
        Thêm hàng hóa
      </Button>

      <Table
        columns={columns}
        dataSource={goods}
        rowKey="id"
        pagination={false}
        bordered
      />

      <Divider />

      <h3>Đính kèm chứng từ</h3>

      <Button icon={<FiUpload />}>Tải lên chứng từ</Button>

      <Divider />

      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button type="primary" size="large" htmlType="submit">
          Gửi IDA
        </Button>
      </div>
    </form>
  );
}
