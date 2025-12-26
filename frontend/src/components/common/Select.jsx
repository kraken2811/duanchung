import { Select as AntdSelect } from "antd";

export default function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  required,
  showSearch = false,
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

      <AntdSelect
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        showSearch={showSearch}
        disabled={disabled}
        style={{ width: "100%" }}
        optionFilterProp="label"
      />
    </div>
  );
}
