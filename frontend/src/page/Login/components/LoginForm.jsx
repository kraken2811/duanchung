import { useForm, Controller } from "react-hook-form";
import { Input, Button, Space, Typography } from "antd";
import { FiArrowRight, FiLock, FiUser, FiShield, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { AUTH_RULES } from "../api/rule.api";

const { Text } = Typography;

export default function LoginForm({ step, taxCode, onNext, onLogin, onBack }) {
  const { control, handleSubmit, formState: { errors } } = useForm();

  // Giao diện Bước 1: Nhập Mã số thuế
  if (step === 1) {
    return (
      <form onSubmit={handleSubmit(onNext)}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div style={{ marginBottom: 8 }}>
            <label className="text-xs font-semibold text-gray-500 uppercase">Mã số thuế đơn vị</label>
            <Controller
              name="taxCode"
              control={control}
              rules={AUTH_RULES.taxCode}
              render={({ field }) => (
                <Input 
                  {...field} 
                  size="large"
                  prefix={<FiShield color="#1890ff" />} 
                  placeholder="Ví dụ: 0101234xxx" 
                  status={errors.taxCode ? "error" : ""}
                />
              )}
            />
            {errors.taxCode && <Text type="danger" style={{ fontSize: 12 }}>{errors.taxCode.message}</Text>}
          </div>

          <Button type="primary" htmlType="submit" block size="large" icon={<FiArrowRight />}>
            TIẾP TỤC
          </Button>
        </Space>
      </form>
    );
  }

  // Giao diện Bước 2: Nhập Username/Password
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        
        {/* Hiển thị MST đã chọn - Style tối giản */}
        <div style={{ background: "#e6f7ff", padding: "8px 12px", borderRadius: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>MST đơn vị:</Text>
            <div style={{ fontWeight: "bold", color: "#0050b3" }}>{taxCode}</div>
          </div>
          <Button type="link" size="small" onClick={onBack} icon={<FiArrowLeft />}>Đổi MST</Button>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Tên đăng nhập</label>
          <Controller
            name="username"
            control={control}
            rules={AUTH_RULES.username}
            render={({ field }) => (
              <Input 
                {...field} 
                size="large"
                prefix={<FiUser color="#8c8c8c" />} 
                placeholder="Nhập tên tài khoản" 
                status={errors.username ? "error" : ""}
              />
            )}
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase">Mật khẩu</label>
          <Controller
            name="password"
            control={control}
            rules={AUTH_RULES.password}
            render={({ field }) => (
              <Input.Password 
                {...field} 
                size="large"
                prefix={<FiLock color="#8c8c8c" />} 
                placeholder="••••••••" 
                status={errors.password ? "error" : ""}
              />
            )}
          />
        </div>

        <Button 
          type="primary" 
          htmlType="submit" 
          block 
          size="large" 
          style={{ background: "#003a8c" }}
          icon={<FiCheckCircle />}
        >
          ĐĂNG NHẬP HỆ THỐNG
        </Button>
      </Space>
    </form>
  );
}