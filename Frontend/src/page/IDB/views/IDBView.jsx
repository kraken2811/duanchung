import { Card } from "antd";
import IDBForm from "../components/IDBForm";
import IDBStepBar from "../components/IDBStepBar";

export default function IDBView() {
  return (
    <div style={{ padding: 24 }}>
      <Card style={{ marginBottom: 24 }}>
        <IDBStepBar />
      </Card>

      <Card>
        <IDBForm />
      </Card>
    </div>
  );
}
