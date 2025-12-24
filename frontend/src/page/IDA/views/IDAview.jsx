import { Card } from "antd";
import IDAForm from "../components/IDAForm";
import IDAStepBar from "../components/IDAStepBar";

export default function IDAView() {
  return (
    <div style={{ padding: 24 }}>

      <Card>
        <IDAForm />
      </Card>
    </div>
  );
}
