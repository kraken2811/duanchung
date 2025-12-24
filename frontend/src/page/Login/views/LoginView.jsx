import { useState } from "react";
import { Typography, App as AntdApp } from "antd";
import LoginForm from "../components/LoginForm";
import { loginApi } from "../api/auth.api";
import { apiClient } from "@/lib/api";

const { Text } = Typography;

export default function LoginView() {
  const { message } = AntdApp.useApp();

  const [step, setStep] = useState(1);
  const [taxCode, setTaxCode] = useState("");

  const handleNext = (data) => {
    setTaxCode(data.taxCode);
    setStep(2);
  };

  const handleLogin = async (data) => {
    try {
      // loginApi trả về res.data
      const { accessToken, user } = await loginApi({
        ten_dang_nhap: data.username,
        mat_khau: data.password,
        tax_code: taxCode,
      });

      // lưu local
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      // gắn token cho axios
      apiClient.defaults.headers.Authorization =
        `Bearer ${accessToken}`;

      message.success("Đăng nhập thành công");
      window.location.href = "/";
    } catch (err) {
      message.error(
        err.response?.data?.message || "Đăng nhập thất bại"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      <div style={{ width: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ color: "#003a8c", margin: 0 }}>
            ECUS5-VNACCS
          </h1>
          <Text type="secondary">Phần mềm Hải quan điện tử</Text>
        </div>

        <LoginForm
          step={step}
          taxCode={taxCode}
          onNext={handleNext}
          onLogin={handleLogin}
          onBack={() => setStep(1)}
        />

        <div
          style={{
            textAlign: "center",
            marginTop: 40,
            fontSize: 12,
            color: "#bfbfbf",
          }}
        >
          © 2024 QuangPhuc
        </div>
      </div>
    </div>
  );
}
