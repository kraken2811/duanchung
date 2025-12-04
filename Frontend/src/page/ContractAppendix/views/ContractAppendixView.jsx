import { Card, Breadcrumb } from "antd";
import ContractAppendixForm from "../components/ContractAppendixForm";

export default function ContractAppendixView() {
  return (
    <div style={{ padding: 24 }}>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>Gia công</Breadcrumb.Item>
        <Breadcrumb.Item>Hợp đồng gia công</Breadcrumb.Item>
        <Breadcrumb.Item>Phụ lục hợp đồng</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Cập nhật Phụ lục Hợp đồng gia công" bordered={false}>
        <ContractAppendixForm />
      </Card>
    </div>
  );
}