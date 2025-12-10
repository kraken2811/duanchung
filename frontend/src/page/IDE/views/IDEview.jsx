import { Card, Button, Space, Typography, Modal } from "antd";
import { 
  FiSave, FiSend, FiDownload, FiX, FiPrinter 
} from "react-icons/fi";
import IDEForm from "../components/IDEForm";
import IDEStepBar from "../components/IDEStepBar";
import useNotify from "@/components/notification/useNotify";

const { Title } = Typography;

export default function IDEView() {
  const notify = useNotify();

  const handleDeclare = (data) => {
     // ... logic giữ nguyên như cũ ...
     Modal.confirm({
         title: "Xác nhận gửi bản tin IDE",
         content: `Bạn có chắc chắn muốn gửi yêu cầu hủy cho tờ khai ${data.declarationNumber}?`,
         okText: "Gửi ngay",
         okType: "danger", // Nút màu đỏ
         onOk: () => notify.success("Đã gửi bản tin hủy tờ khai (IDE) thành công!")
     });
  };

  const handleSave = () => {
      notify.info("Đã lưu thông tin lý do hủy.");
  };

  return (
    <div style={{ padding: 16, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      
      {/* THANH CÔNG CỤ CHỨC NĂNG */}
      <Card 
        size="small" 
        bodyStyle={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        style={{ marginBottom: 16, borderTop: '3px solid #cf1322' }}
      >
        <Space>
            <Title level={4} style={{ margin: 0, color: '#cf1322', marginRight: 20 }}>
                Khai báo hủy tờ khai (IDE)
            </Title>
        </Space>
        
        <Space size="small">
            <Button icon={<FiSave />} onClick={handleSave}>Ghi</Button>
            <Button type="primary" danger icon={<FiSend />} form="ide-form" htmlType="submit">
                Khai báo
            </Button>
            <Button icon={<FiDownload />}>Lấy phản hồi</Button>
            <Button icon={<FiPrinter />}>In phiếu</Button>
            <Button icon={<FiX />}>Đóng</Button>
        </Space>
      </Card>

      {/* --- 2. THÊM STEP BAR VÀO ĐÂY --- */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <IDEStepBar />
      </Card>

      {/* FORM CHÍNH */}
      <Card bodyStyle={{ padding: 0 }}>
        <IDEForm formId="ide-form" onSubmit={handleDeclare} />
      </Card>
    </div>
  );
}