import { useState } from "react";
import { Card, Typography } from "antd";
import LoginForm from "../components/LoginForm";

const { Text } = Typography;

export default function LoginView() {
  const [step, setStep] = useState(1); 
  const [taxCode, setTaxCode] = useState("");

  const handleNext = (data) => {
    setTaxCode(data.taxCode);
    setStep(2);
    console.log("MST đã nhập:", data.taxCode);
  };

  const handleLogin = (data) => {
    const payload = { ...data, taxCode };
    console.log(">>> Payload đăng nhập:", payload);
    alert("Đăng nhập thành công!");
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center", 
      justifyContent: "center",
      background: "#fff", // 1. Đổi màu nền từ #f0f2f5 sang #fff (Trắng)
    }}>
      <div style={{ width: 400 }}>
        {/* Logo hoặc Tên phần mềm */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ color: "#003a8c", margin: 0, fontSize: 28, fontWeight: "bold", letterSpacing: '-0.5px' }}>
            ECUS5-VNACCS
          </h1>
          <Text type="secondary" style={{ fontSize: 14 }}>Phần mềm Hải quan điện tử</Text>
        </div>

        {/* 2. Loại bỏ boxShadow và background của Card để nó hòa làm một với nền trắng */}
        <div style={{ padding: "0 20px" }}> 
          <LoginForm 
            step={step} 
            taxCode={taxCode}
            onNext={handleNext} 
            onLogin={handleLogin}
            onBack={() => setStep(1)} 
          />
        </div>

        <div style={{ textAlign: "center", marginTop: 40, color: "#bfbfbf", fontSize: 12 }}>
          <p>© 2024 Bản quyền thuộc về QuangPhuc</p>
        </div>
      </div>
    </div>
  );
}