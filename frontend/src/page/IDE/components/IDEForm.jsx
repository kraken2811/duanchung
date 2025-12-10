import { useForm, Controller } from "react-hook-form";
import {
  Row, Col, Input, DatePicker, Select, Table, Card, Tag, Typography
} from "antd";
import { IDE_DEFAULT } from "../types";
import { IDE_RULES } from "../api/rule.api";
import { CANCELLATION_REASONS } from "../utils/status";
import { useEffect } from "react";

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

export default function IDEForm({ formId, onSubmit }) {
  // Giả lập dữ liệu load từ tờ khai gốc
  const defaultValues = {
      ...IDE_DEFAULT,
      declarationNumber: "102742999910",
      regDate: null, // Cần dayjs object thực tế
      customsCode: "02CI - Chi cục HQ CK Cảng HP KV1",
      typeCode: "A11 - Nhập kinh doanh tiêu dùng",
      attachments: [
          { id: 1, name: 'CV_XIN_HUY_102742.pdf', date: '28/11/2025', type: 'Công văn xin hủy' }
      ]
  };

  const { control, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues,
  });

  // Style cho ô Read-only giống Desktop App (Xám nền)
  const readOnlyStyle = { backgroundColor: "#f0f0f0", color: "#000", cursor: "default" };
  // Style cho Label
  const labelStyle = { fontWeight: 600, fontSize: "13px", marginBottom: "4px", display: "block" };

  const columns = [
      { title: "Tên file", dataIndex: "name", width: "50%" },
      { title: "Ngày tạo", dataIndex: "date" },
      { title: "Loại chứng từ", dataIndex: "type" },
  ];

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} style={{ padding: 10 }}>
      
      {/* KHU VỰC 1: THÔNG TIN TỜ KHAI (READ-ONLY) */}
      <Card 
        size="small" 
        title="1. Thông tin tờ khai cần hủy" 
        style={{ marginBottom: 16, borderColor: '#d9d9d9', backgroundColor: '#fafafa' }}
        headStyle={{ backgroundColor: '#e6f7ff', borderBottom: '1px solid #91d5ff', fontSize: 14, fontWeight: 'bold' }}
      >
        <Row gutter={[16, 12]}>
            <Col span={6}>
                <span style={labelStyle}>Số tờ khai</span>
                <Input {...register("declarationNumber")} style={{...readOnlyStyle, fontWeight: 'bold'}} readOnly />
            </Col>
            <Col span={6}>
                <span style={labelStyle}>Ngày đăng ký</span>
                <DatePicker style={{width: '100%', ...readOnlyStyle}} disabled placeholder="28/11/2025"/>
            </Col>
            <Col span={6}>
                <span style={labelStyle}>Mã Hải quan</span>
                <Input {...register("customsCode")} style={readOnlyStyle} readOnly />
            </Col>
             <Col span={6}>
                <span style={labelStyle}>Loại hình</span>
                <Input {...register("typeCode")} style={readOnlyStyle} readOnly />
            </Col>
            <Col span={6}>
                <span style={labelStyle}>Bộ phận xử lý</span>
                <Input {...register("processDept")} style={readOnlyStyle} readOnly />
            </Col>
        </Row>
      </Card>

      {/* KHU VỰC 2: NỘI DUNG YÊU CẦU HỦY (EDITABLE) */}
      <Card 
        size="small" 
        title="2. Nội dung yêu cầu hủy" 
        style={{ marginBottom: 16, borderColor: '#d9d9d9' }}
        headStyle={{ backgroundColor: '#fffbe6', borderBottom: '1px solid #ffe58f', fontSize: 14, fontWeight: 'bold', color: '#d48806' }}
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
                                <Option key={r.code} value={r.code}>{r.label}</Option>
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
                            placeholder="Nhập chi tiết lý do xin hủy..." 
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
        style={{ marginBottom: 16, borderColor: '#d9d9d9' }}
        extra={<a href="#">+ Thêm tệp</a>}
      >
        <Table 
            columns={columns} 
            dataSource={defaultValues.attachments} 
            pagination={false} 
            size="small" 
            bordered
            rowKey="id"
        />
      </Card>

      {/* KHU VỰC 4: KẾT QUẢ XỬ LÝ (STATUS BAR) */}
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