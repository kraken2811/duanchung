import { useForm, Controller } from "react-hook-form";
import { Input, Button, Space, Typography } from "antd";
import {
  FiArrowRight,
  FiLock,
  FiUser,
  FiShield,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";
import AUTH_RULES from "../rule-forms";

const { Text } = Typography;

export default function LoginForm({ step, taxCode, onNext, onLogin, onBack }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if (step === 1) {
    return (
      <form onSubmit={handleSubmit(onNext)}>
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Mã số thuế đơn vị
            </label>
            <Controller
              name="taxCode"
              control={control}
              rules={AUTH_RULES.taxCode}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  prefix={<FiShield />}
                  placeholder="Ví dụ: 0101234xxx"
                  status={errors.taxCode ? "error" : ""}
                />
              )}
            />
            {errors.taxCode && (
              <Text type="danger" style={{ fontSize: 12 }}>
                {errors.taxCode.message}
              </Text>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            icon={<FiArrowRight />}
          >
            TIẾP TỤC
          </Button>
        </Space>
      </form>
    );
  }

  // ================= STEP 2 =================
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
        {/* MST */}
        <div
          style={{
            background: "#e6f7ff",
            padding: "8px 12px",
            borderRadius: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              MST đơn vị:
            </Text>
            <div style={{ fontWeight: "bold", color: "#0050b3" }}>
              {taxCode}
            </div>
          </div>
          <Button
            type="link"
            size="small"
            onClick={onBack}
            icon={<FiArrowLeft />}
          >
            Đổi MST
          </Button>
        </div>

        <Controller
          name="username"
          control={control}
          rules={AUTH_RULES.username}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              prefix={<FiUser />}
              placeholder="Tên đăng nhập"
              status={errors.username ? "error" : ""}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={AUTH_RULES.password}
          render={({ field }) => (
            <Input.Password
              {...field}
              size="large"
              prefix={<FiLock />}
              placeholder="••••••••"
              status={errors.password ? "error" : ""}
            />
          )}
        />

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
