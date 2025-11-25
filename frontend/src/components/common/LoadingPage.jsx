import { Spin } from "antd";

export default function LoadingPage() {
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" />
    </div>
  );
}
