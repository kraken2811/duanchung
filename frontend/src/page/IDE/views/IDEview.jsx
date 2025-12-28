import { Card, Button, Space, Typography, Modal } from "antd";
import { 
  FiSave, FiSend, FiDownload, FiX, FiPrinter 
} from "react-icons/fi";
import IDEForm from "../components/IDEForm";
import IDEStepBar from "../components/IDEStepBar";
import useNotify from "@/components/notification/useNotify";
import { useState } from "react";
import { saveIDEForm, guiIDE } 
  from "@/page/IDE/api/ide.api";

const { Title } = Typography;

export default function IDEView() {
  const notify = useNotify();
  const [currentIDE, setCurrentIDE] = useState(null);
  const [resetForm, setResetForm] = useState(null);
  const [submitAction, setSubmitAction] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const handleDeclare = async (formData) => {
    let idSuaDoi;

    try {
      idSuaDoi = currentIDE?.ide_form?.id_sua_doi;

      // 1️⃣ Nếu chưa có IDE → lưu trước
      if (!idSuaDoi) {
        const ide = await saveIDEForm({
          id_to_khai: currentIDE.to_khai.id_to_khai,
          ma_ly_do_huy: formData.reasonCode,
          ly_do_sua: formData.reasonNote,
        });
        idSuaDoi = ide.id_sua_doi;
      }
    } catch (err) {
      return notify.error("Không thể lưu yêu cầu hủy");
    }

    // 2️⃣ Confirm gửi IDE
    Modal.confirm({
      title: "Xác nhận gửi bản tin IDE",
      content: `Bạn có chắc chắn muốn gửi yêu cầu hủy cho tờ khai ${formData.declarationNumber}?`,
      okText: "Gửi ngay",
      okType: "danger",
      onOk: async () => {
        try {
          await guiIDE(idSuaDoi);
          notify.success("Đã gửi bản tin hủy tờ khai (IDE) thành công!");
          setFormKey(prev => prev + 1); // 🔥 RESET TOÀN BỘ FORM
          setCurrentIDE(null);
        } catch (err) {
          if (err?.response?.status === 401) {
            notify.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
          } else {
            notify.error(err?.response?.data?.message || "Không thể gửi IDE");
          }
        }
      },
    });
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
            <Button
              icon={<FiSave />}
              onClick={() => {
                setSubmitAction("SAVE");
                document.getElementById("ide-form")?.requestSubmit();
              }}
            >
              Ghi
            </Button>
            <Button type="primary" danger icon={<FiSend />} form="ide-form" htmlType="submit">
                Khai báo
            </Button>
            <Button icon={<FiPrinter />}>In phiếu</Button>
        </Space>
      </Card>

      {/* --- 2. THÊM STEP BAR VÀO ĐÂY --- */}
      <Card size="small" style={{ marginBottom: 16 }}>
        <IDEStepBar />
      </Card>

      {/* FORM CHÍNH */}
      <Card bodyStyle={{ padding: 0 }}>
        <IDEForm
          key={formKey}
          formId="ide-form"
          onSubmit={handleDeclare}
          onLoaded={setCurrentIDE}
          onFormChange={(data) => setCurrentIDE((prev) => ({ ...prev, formData: data }))}
        />
      </Card>
    </div>
  );
}