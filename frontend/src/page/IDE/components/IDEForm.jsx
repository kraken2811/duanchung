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
} from "antd";
import dayjs from "dayjs"; // Đảm bảo đã import dayjs

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

export default function IDEForm({ formId, onSubmit }) {
  // --- 1. DỮ LIỆU GIẢ LẬP (MOCK DATA) ---
  // Lưu ý: Dữ liệu gốc thường là dạng chuẩn ISO (YYYY-MM-DD)
  const mockDeclarations = [
    {
      no: "102742999910",
      regDate: "2025-11-28", // Định dạng gốc YYYY-MM-DD
      customsCode: "02CI - Chi cục HQ CK Cảng HP KV1",
      typeCode: "A11 - Nhập kinh doanh tiêu dùng",
      processDept: "Đội thủ tục hàng hóa XNK",
      attachments: [
        { id: 1, name: 'CV_XIN_HUY_102742.pdf', date: '28/11/2025', type: 'Công văn xin hủy' }
      ]
    },
    {
      no: "102742999911",
      regDate: "2025-12-01", 
      customsCode: "01B1 - Chi cục HQ CK Sân bay QT Nội Bài",
      typeCode: "A12 - Nhập kinh doanh sản xuất",
      processDept: "Đội giám sát kho hàng",
      attachments: [
        { id: 2, name: 'GIAI_TRINH_HUY_A12.pdf', date: '01/12/2025', type: 'Giải trình' },
        { id: 3, name: 'BILL_OF_LADING.pdf', date: '01/12/2025', type: 'Vận đơn' }
      ]
    },
    {
      no: "102742999912",
      regDate: "2025-12-05", 
      customsCode: "03EE - Chi cục HQ CK Cảng Cái Lân",
      typeCode: "E31 - Nhập nguyên liệu SXXK",
      processDept: "Đội nghiệp vụ tổng hợp",
      attachments: []
    }
  ];

  // Khởi tạo Form
  const { 
    control, 
    handleSubmit, 
    setValue, 
    watch, 
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

  const currentAttachments = watch("attachments");

  // --- 2. HÀM XỬ LÝ LOGIC CHỌN TỜ KHAI ---
  const handleDeclarationChange = (value) => {
    const selectedDecl = mockDeclarations.find(item => item.no === value);

    if (selectedDecl) {
      // Cập nhật các trường thông tin chung
      setValue("customsCode", selectedDecl.customsCode);
      setValue("typeCode", selectedDecl.typeCode);
      setValue("processDept", selectedDecl.processDept);
      setValue("attachments", selectedDecl.attachments);
      
      // --- XỬ LÝ FORMAT NGÀY THÁNG ---
      // Nếu có ngày, dùng dayjs format lại thành "DD/MM/YYYY" trước khi hiển thị lên Input
      if (selectedDecl.regDate) {
        const formattedDate = dayjs(selectedDecl.regDate).format("DD/MM/YYYY");
        setValue("regDate", formattedDate); 
      } else {
        setValue("regDate", "");
      }

      message.success(`Đã tải thông tin tờ khai ${value}`);
    } else {
      // Reset form nếu không tìm thấy
      setValue("customsCode", "");
      setValue("typeCode", "");
      setValue("processDept", "");
      setValue("regDate", "");
      setValue("attachments", []);
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
                  style={{ width: '100%', fontWeight: 'bold' }}
                  status={errors.declarationNumber ? "error" : ""}
                  onChange={(val) => {
                    field.onChange(val);
                    handleDeclarationChange(val);
                  }}
                >
                  {mockDeclarations.map(item => (
                    <Option key={item.no} value={item.no}>{item.no}</Option>
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
        extra={<a style={{ color: '#070707ff', fontWeight: 500 }} href="#">+ Thêm tệp</a>}
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