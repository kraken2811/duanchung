import { useState } from "react";
import { Typography, App as AntdApp } from "antd";
import LoginForm from "../components/LoginForm";
import { checkMstApi, loginApi } from "../api/auth.api";

const { Text } = Typography;

export default function LoginView() {
  const { message } = AntdApp.useApp();

  const [step, setStep] = useState(1);
  const [maSoThue, setMaSoThue] = useState("");
  const [tenCongTy, setTenCongTy] = useState("");

  // STEP 1: CHECK MST
  const handleCheckMst = async (data) => {
    try {
      const res = await checkMstApi(data.ma_so_thue);

      setMaSoThue(data.ma_so_thue);
      setTenCongTy(res.ten_cong_ty);
      setStep(2);
    } catch (err) {
      message.error(
        err.response?.data?.message || "Mã số thuế không tồn tại"
      );
    }
  };

  // STEP 2: LOGIN
  const handleLogin = async (data) => {
    try {
      const { accessToken, user } = await loginApi({
        ma_so_thue: maSoThue,
        ten_dang_nhap: data.username,
        mat_khau: data.password,
      });

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

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
          maSoThue={maSoThue}
          tenCongTy={tenCongTy}
          onCheckMst={handleCheckMst}
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
