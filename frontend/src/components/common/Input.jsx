import { Input } from "antd";

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  disabled,
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ fontWeight: 500 }}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}

      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        style={{ marginTop: 6, borderRadius: 6 }}
      />
    </div>
  );
}
