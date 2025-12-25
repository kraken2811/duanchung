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

export default function LoginForm({
  step,
  maSoThue,
  tenCongTy,
  onCheckMst,
  onLogin,
  onBack,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ===== STEP 1: CHECK MST =====
  if (step === 1) {
    return (
      <form onSubmit={handleSubmit(onCheckMst)}>
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <Controller
            name="ma_so_thue"
            control={control}
            rules={AUTH_RULES.taxCode}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                prefix={<FiShield />}
                placeholder="Mã số thuế"
                status={errors.ma_so_thue ? "error" : ""}
              />
            )}
          />
          {errors.ma_so_thue && (
            <Text type="danger">{errors.ma_so_thue.message}</Text>
          )}

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

  // ===== STEP 2: LOGIN =====
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
        <div
          style={{
            background: "#e6f7ff",
            padding: 10,
            borderRadius: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Công ty
            </Text>
            <div style={{ fontWeight: 600 }}>{tenCongTy}</div>
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
              placeholder="Mật khẩu"
              status={errors.password ? "error" : ""}
            />
          )}
        />

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          icon={<FiCheckCircle />}
        >
          ĐĂNG NHẬP
        </Button>
      </Space>
    </form>
  );
}
