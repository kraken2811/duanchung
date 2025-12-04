// --- START OF FILE page/Contract/views/ContractView.jsx ---

import { Card, Breadcrumb } from "antd";
import ContractForm from "../components/ContractForm";
import ContractStepBar from "../components/ContractStepBar";

export default function ContractView() {
  return (
    <div style={{ padding: 12 }}>

      {/* Khu vực StepBar */}
      <Card bodyStyle={{ padding: "16px 24px" }} style={{ marginBottom: 12 }}>
        <ContractStepBar />
      </Card>

      {/* Khu vực Form chính (Bao gồm toolbar và nội dung nhập liệu) */}
      <Card bodyStyle={{ padding: 0 }}>
        <ContractForm />
      </Card>
    </div>
  );
}