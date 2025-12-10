import { Card } from "antd";
import IDBForm from "../components/IDBForm";
import IDBStepBar from "../components/IDBStepBar";

export default function IDBView() {
  return (
    <div style={{ padding: 24 }}>
      {/* Step Bar nằm trong Card riêng biệt phía trên */}
      <Card style={{ marginBottom: 24, borderRadius: 8 }}>
        <IDBStepBar />
      </Card>

      {/* Form chính nằm trong Card phía dưới */}
      <Card style={{ borderRadius: 8 }}>
        <IDBForm />
      </Card>
    </div>
  );
}