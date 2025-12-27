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
  filterOption, // ← THÊM PROP NÀY (tùy chỉnh filter khi search)
  optionFilterProp = "label", // mặc định là label
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
        placeholder={placeholder || "Chọn..."}
        showSearch={showSearch}
        disabled={disabled}
        style={{ width: "100%" }}
        optionFilterProp={optionFilterProp}
        filterOption={filterOption} // ← Cho phép override filter logic
      />
    </div>
  );
}