import { Input } from "antd";
const { TextArea } = Input;

export default function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
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
        </div>
      )}

      <TextArea
        value={value}
        onChange={onChange}
        rows={rows}
        style={{ borderRadius: 6 }}
      />
    </div>
  );
}
