// --- START OF FILE page/Contract/views/ContractView.jsx ---

import { Card, Breadcrumb } from "antd";
import ContractForm from "../components/ContractForm";

export default function ContractView() {
  return (
    <div style={{ padding: 12 }}>
      {/* Khu vực Form chính (Bao gồm toolbar và nội dung nhập liệu) */}
      <Card bodyStyle={{ padding: 0 }}>
        <ContractForm />
      </Card>
    </div>
  );
}