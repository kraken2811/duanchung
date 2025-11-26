import { Button } from "antd";

export default function Button({
  type = "primary",
  children,
  loading = false,
  icon,
  danger = false,
  onClick,
  style,
  disabled,
}) {
  return (
    <Button
      type={type}
      icon={icon}
      loading={loading}
      danger={danger}
      disabled={disabled}
      style={{ borderRadius: 6, ...style }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
