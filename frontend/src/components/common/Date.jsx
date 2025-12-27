import { DatePicker } from "antd";
import dayjs from "dayjs";

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
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </div>
      )}

      <DatePicker
        value={value ? dayjs(value) : null}   // ✅ FIX
        onChange={(d) =>
          onChange(d ? d.toISOString() : null) // ✅ LUÔN LƯU ISO STRING
        }
        disabled={disabled}
        style={{ width: "100%" }}
      />
    </div>
  );
}
