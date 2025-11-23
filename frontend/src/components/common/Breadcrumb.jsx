import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

export default function AppBreadcrumb() {
  const { pathname } = useLocation();

  const parts = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb style={{ marginBottom: 16 }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      {parts.map((p, i) => (
        <Breadcrumb.Item key={i}>{p}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
