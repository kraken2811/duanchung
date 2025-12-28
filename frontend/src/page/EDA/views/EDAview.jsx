import { Card, Breadcrumb } from "antd";
import { FiHome, FiFileText } from "react-icons/fi";
import EDAIndex from "../components/EDAIndex";

export default function EDAView() {
  return (
    <div style={{ padding: 24, background: "#ffff", minHeight: "0" }}>
      {/* Breadcrumb */}
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          {
            title: (
              <>
                <FiHome style={{ marginRight: 4 }} />
                <span>Trang chủ</span>
              </>
            ),
          },
          {
            title: "Nghiệp vụ hải quan",
          },
          {
            title: (
              <>
                <FiFileText style={{ marginRight: 4 }} />
                <span>Đăng ký tờ khai xuất khẩu (EDA)</span>
              </>
            ),
          },
        ]}
      />

      {/* Header */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 600,
              color: "#1890ff",
            }}
          >
            TỜ KHAI XUẤT KHẨU (EXPORT DECLARATION - EDA)
          </h2>
          <p style={{ margin: "8px 0 0 0", color: "#666" }}>
            Hệ thống Hải quan điện tử VNACCS/VCIS - Phân hệ Xuất khẩu
          </p>
        </div>
      </Card>

      {/* Form */}
      <EDAIndex />
    </div>
  );
}
