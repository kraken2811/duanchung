import { Card, Alert } from "antd";
import { FiAlertCircle } from "react-icons/fi";
import IDCForm from "../components/IDCForm";
import IDCStepBar from "../components/IDCStepBar";

export default function IDCView() {
  return (
    <div style={{ padding: 24 }}>
      {/* Alert cảnh báo đặc biệt cho IDC */}
      <Alert
        message={
          <span>
            <FiAlertCircle style={{ marginRight: 8 }} />
            <strong>KHAI SỬA ĐỔI BỔ SUNG TỜ KHAI NHẬP KHẨU (IDC)</strong>
          </span>
        }
        description={
          <div>
            <div>
              • Chức năng này dùng để sửa đổi, bổ sung thông tin tờ khai đã
              đăng ký trước đó
            </div>
            <div>
              • Chỉ được phép sửa một số trường thông tin nhất định theo quy
              định VNACCS
            </div>
            <div>
              • Bắt buộc phải có lý do giải trình rõ ràng cho mỗi thay đổi
            </div>
            <div style={{ color: "#cf1322", marginTop: 8 }}>
              <strong>Lưu ý:</strong> Tờ khai IDC cần được Hải quan chấp thuận
              mới có hiệu lực
            </div>
          </div>
        }
        type="warning"
        showIcon
        closable
        style={{ marginBottom: 24 }}
      />

      {/* Thanh tiến trình */}
      <Card style={{ marginBottom: 24 }}>
        <IDCStepBar currentStep={0} />
      </Card>

      {/* Form chính */}
      <Card
        title={
          <span style={{ fontSize: 16, fontWeight: "bold", color: "#d46b08" }}>
            FORM KHAI SỬA ĐỔI BỔ SUNG (IDC)
          </span>
        }
        extra={
          <span style={{ fontSize: 12, color: "#999" }}>Mã nghiệp vụ: IDC</span>
        }
      >
        <IDCForm />
      </Card>
    </div>
  );
}