import { DatePicker } from "antd";

export default function Date({
  label,
  value,
  onChange,
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
            height: 20,
          }}
        >
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </div>
      )}

      <DatePicker
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{ width: "100%" }}
      />
    </div>
  );
}
