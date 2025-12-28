import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Row,
  Col,
  Input,
  Select,
  Table,
  Card,
  Tag,
  Typography,
  message,
  Upload
} from "antd";
import dayjs from "dayjs"; // Đảm bảo đã import dayjs
import { getToKhaiIDE, getIDEList, uploadIDE } 
  from "@/page/IDE/api/ide.api";

// --- GIẢ LẬP CÁC HẰNG SỐ & QUY TẮC ---
const IDE_RULES = {
  reasonCode: { required: "Vui lòng chọn lý do hủy" },
  reasonNote: { required: "Vui lòng nhập ghi chú chi tiết" },
};

const CANCELLATION_REASONS = [
  { code: "R01", label: "Khai báo trùng" },
  { code: "R02", label: "Hủy tờ khai theo yêu cầu của hải quan" },
  { code: "R03", label: "Hàng hóa không về" },
  { code: "R04", label: "Khai sai các chỉ tiêu thông tin không được sửa" },
];

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

export default function IDEForm({ formId, onSubmit, onLoaded, onReset }) {
  const [loading, setLoading] = React.useState(false);
  const [currentIDE, setCurrentIDE] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [fetching, setFetching] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  // Khởi tạo Form
  const { 
    control, 
    handleSubmit, 
    setValue, 
    watch, 
    reset,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      declarationNumber: null,
      regDate: "",       // Default là chuỗi rỗng
      customsCode: "",   
      typeCode: "",     
      processDept: "",
      reasonCode: null,
      reasonNote: "",
      attachments: []
    },
  });

  React.useEffect(() => {
    if (onReset) {
      onReset(() => {
        reset({
          declarationNumber: null,
          regDate: "",
          customsCode: "",
          typeCode: "",
          processDept: "",
          reasonCode: null,
          reasonNote: "",
          attachments: [],
        });
      });
    }
  }, [onReset, reset]);

  const getProcessDeptLabel = (to_khai) => {
    switch (to_khai.bo_phan_xu_ly) {
      case "XANH":
        return "Đội thủ tục hàng hóa XNK";
      case "VANG":
        return "Đội kiểm tra hồ sơ";
      case "DO":
        return "Đội kiểm tra thực tế";
      default:
        return "Đội thủ tục hàng hóa XNK";
    }
  };

  const currentAttachments = watch("attachments");

  const fetchDeclarations = async (value = "") => {
    try {
      setFetching(true);
      const data = await getIDEList(value);
      setOptions(data);
    } catch (err) {
      message.error("Không tải được danh sách tờ khai");
    } finally {
      setFetching(false);
    }
  };

  // --- 2. HÀM XỬ LÝ LOGIC CHỌN TỜ KHAI ---
  const handleDeclarationChange = async (so_to_khai) => {
    try {
      setLoading(true);

      reset({
        declarationNumber: so_to_khai,
        regDate: "",
        customsCode: "",
        typeCode: "",
        processDept: "",
        reasonCode: null,
        reasonNote: "",
        attachments: [],
      });

      const data = await getToKhaiIDE(so_to_khai);
      setCurrentIDE(data);
      onLoaded?.(data);

      const { to_khai, ide_form, ho_so_dinh_kem } = data;

      // ====== Đổ thông tin tờ khai ======
      setValue("customsCode", to_khai.ma_hai_quan || "");
      setValue("typeCode", to_khai.loai_hinh || "");
      setValue("processDept", getProcessDeptLabel(to_khai));

      if (to_khai.ngay_dang_ky) {
        setValue(
          "regDate",
          dayjs(to_khai.ngay_dang_ky).format("DD/MM/YYYY")
        );
      }

      // ====== IDE form (nếu đã từng lưu) ======
      if (ide_form) {
        setValue("reasonCode", ide_form.phan_loai_kiem_tra);
        setValue("reasonNote", ide_form.ly_do_sua);
      }

      // ====== Hồ sơ đính kèm ======
      setValue("attachments", ho_so_dinh_kem || []);

      message.success(`Đã tải tờ khai ${so_to_khai}`);
    } catch (err) {
      console.error(err);
      message.error("Không tải được tờ khai");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      if (!currentIDE?.to_khai?.id_to_khai) {
        message.error("Vui lòng chọn tờ khai trước");
        return onError();
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("loai_doi_tuong", "TO_KHAI_HAI_QUAN");
      formData.append("id_doi_tuong", currentIDE.to_khai.id_to_khai);
      formData.append("phan_loai_khai_bao", "IDE");
      formData.append("loai_tai_lieu", "Hồ sơ đính kèm");

      const res = await uploadIDE(formData);

      // đẩy file mới vào table
      setValue("attachments", [
        ...currentAttachments,
        {
          id: res.data.id_tai_lieu,
          name: res.data.ten_file,
          date: dayjs(res.data.ngay_tai_len).format("DD/MM/YYYY"),
          type: res.data.loai_tai_lieu,
        },
      ]);

      message.success("Upload thành công");
      onSuccess();
    } catch (err) {
      console.error(err);
      message.error("Upload thất bại");
      onError(err);
    }
  };

  // --- 3. STYLES ---
  const readOnlyStyle = { 
    backgroundColor: "#f5f5f5", 
    color: "#000", 
    cursor: "default", 
    fontWeight: 500 
  };
  
  const labelStyle = { 
    fontWeight: 600, 
    fontSize: "13px", 
    marginBottom: "4px", 
    display: "block",
    color: "#262626"
  };

  const columns = [
    { title: "Tên file", dataIndex: "name", width: "50%" },
    { title: "Ngày tạo", dataIndex: "date" },
    { title: "Loại chứng từ", dataIndex: "type" },
  ];

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} style={{ padding: 10 }}>
      
      {/* KHU VỰC 1: THÔNG TIN TỜ KHAI */}
      <Card 
        size="small" 
        title="1. Thông tin tờ khai cần hủy" 
        style={{ marginBottom: 16, border: '1px solid #d9d9d9' }}
        headStyle={{ backgroundColor: '#e6f7ff', borderBottom: '1px solid #91d5ff', color: '#0050b3' }}
      >
        <Row gutter={[16, 12]}>
          <Col span={6}>
            <span style={labelStyle}>Số tờ khai <span style={{color: 'red'}}>*</span></span>
            <Controller
              name="declarationNumber"
              control={control}
              rules={{ required: "Vui lòng chọn số tờ khai" }}
              render={({ field }) => (
                <Select
                  {...field}
                  showSearch
                  placeholder="Chọn số tờ khai..."
                  filterOption={false}
                  onSearch={fetchDeclarations}
                  onFocus={() => fetchDeclarations("")}
                  notFoundContent={fetching ? "Đang tải..." : "Không có dữ liệu"}
                  onChange={(val) => {
                    field.onChange(val);
                    handleDeclarationChange(val);
                  }}
                >
                  {options.map((item) => (
                    <Option key={item.so_to_khai} value={item.so_to_khai}>
                      {item.so_to_khai}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.declarationNumber && <Text type="danger" style={{fontSize: 12}}>{errors.declarationNumber.message}</Text>}
          </Col>

          <Col span={6}>
            <span style={labelStyle}>Ngày đăng ký</span>
            {/* Sử dụng Input (readOnly) để hiển thị ngày đã format */}
            <Controller
              name="regDate"
              control={control}
              render={({ field }) => (
                <Input 
                  {...field} 
                  style={readOnlyStyle} 
                  readOnly 
                  placeholder="dd/mm/yyyy" 
                />
              )}
            />
          </Col>

          <Col span={6}>
            <span style={labelStyle}>Mã Hải quan</span>
            <Controller
              name="customsCode"
              control={control}
              render={({ field }) => (
                <Input {...field} style={readOnlyStyle} readOnly placeholder="..." />
              )}
            />
          </Col>
          
          <Col span={6}>
            <span style={labelStyle}>Loại hình</span>
            <Controller
              name="typeCode"
              control={control}
              render={({ field }) => (
                <Input {...field} style={readOnlyStyle} readOnly placeholder="..." />
              )}
            />
          </Col>

          <Col span={6}>
            <span style={labelStyle}>Bộ phận xử lý</span>
            <Controller
              name="processDept"
              control={control}
              render={({ field }) => (
                <Input {...field} style={readOnlyStyle} readOnly placeholder="..." />
              )}
            />
          </Col>
        </Row>
      </Card>

      {/* KHU VỰC 2: NỘI DUNG YÊU CẦU HỦY */}
      <Card 
        size="small" 
        title="2. Nội dung yêu cầu hủy" 
        style={{ marginBottom: 16, border: '1px solid #d9d9d9' }}
        headStyle={{ backgroundColor: '#e6f7ff', borderBottom: '1px solid #91d5ff', color: '#0050b3' }}
      >
         <Row gutter={[16, 12]}>
          <Col span={24}>
            <span style={labelStyle}>Mã lý do hủy <span style={{color: 'red'}}>*</span></span>
            <Controller
              name="reasonCode"
              control={control}
              rules={IDE_RULES.reasonCode}
              render={({ field }) => (
                <Select 
                  {...field} 
                  style={{ width: '100%' }} 
                  placeholder="-- Chọn mã lý do --"
                  status={errors.reasonCode ? "error" : ""}
                >
                  {CANCELLATION_REASONS.map(r => (
                    <Option key={r.code} value={r.code}>{r.code} - {r.label}</Option>
                  ))}
                </Select>
              )}
            />
            {errors.reasonCode && <Text type="danger" style={{fontSize: 12}}>{errors.reasonCode.message}</Text>}
          </Col>

          <Col span={24}>
            <span style={labelStyle}>Ghi chú / Diễn giải lý do <span style={{color: 'red'}}>*</span></span>
            <Controller
              name="reasonNote"
              control={control}
              rules={IDE_RULES.reasonNote}
              render={({ field }) => (
                <TextArea 
                  {...field} 
                  rows={4} 
                  placeholder="Nhập chi tiết lý do xin hủy tờ khai..." 
                  status={errors.reasonNote ? "error" : ""}
                />
              )}
            />
            {errors.reasonNote && <Text type="danger" style={{fontSize: 12}}>{errors.reasonNote.message}</Text>}
          </Col>
         </Row>
      </Card>

      {/* KHU VỰC 3: HỒ SƠ ĐÍNH KÈM */}
      <Card 
        size="small" 
        title="3. Hồ sơ đính kèm (HYS)" 
        style={{ marginBottom: 16, border: '1px solid #d9d9d9' }}
        headStyle={{ backgroundColor: '#e6f7ff', borderBottom: '1px solid #91d5ff', color: '#0050b3' }}
        extra={
          <Upload
            showUploadList={false}
            disabled={false}
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            customRequest={async (options) => {
              const { file, onSuccess, onError } = options;
              try {
                setUploading(true);
                await handleUpload({ file, onSuccess, onError });
              } finally {
                setUploading(false);
              }
            }}
          >
            <span
              style={{
                fontWeight: 500,
                cursor: "pointer",
                color: "#0050b3",
              }}
            >
              {uploading ? "Đang tải..." : "+ Thêm tệp"}
            </span>
          </Upload>
        }
      >
        <Table 
          columns={columns} 
          dataSource={currentAttachments} 
          pagination={false} 
          size="small" 
          bordered
          rowKey="id"
          locale={{ emptyText: 'Chưa có chứng từ đính kèm (Chọn tờ khai để tải)' }}
        />
      </Card>

      {/* KHU VỰC 4: KẾT QUẢ XỬ LÝ */}
      <div style={{ 
        border: '1px solid #b7eb8f', 
        backgroundColor: '#f6ffed', 
        padding: '8px 16px', 
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <strong>Trạng thái bản tin: </strong> 
          <Tag color="warning">Chưa khai báo</Tag>
        </div>
        <div>
          <strong>Số tiếp nhận: </strong>
          <span style={{ color: '#8c8c8c', fontStyle: 'italic' }}>[Chưa có]</span>
        </div>
      </div>
    </form>
  );
}