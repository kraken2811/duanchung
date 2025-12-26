
import { Button as AntdButton } from "antd";

export default function AppButton({
  type = "default",
  children,
  icon,
  loading = false,
  danger = false,
  onClick,
}) {
  return (
    <AntdButton
      type={type}
      icon={icon}
      loading={loading}
      danger={danger}
      onClick={onClick}
      size="middle"
      style={{ borderRadius: 6 }}
    >
      {children}
    </AntdButton>
  );
}