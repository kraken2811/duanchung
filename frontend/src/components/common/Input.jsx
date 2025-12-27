import { Input as AntdInput } from "antd";

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  required,
  disabled,
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && (
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 6,
            height: 20,          // 🔒 cố định label
          }}
        >
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </div>
      )}

      <AntdInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: "100%",
          borderRadius: 6,
        }}
      />
    </div>
  );
}
