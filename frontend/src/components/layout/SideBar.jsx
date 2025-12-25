import { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  FiFileText,
  FiSend,
  FiList,
  FiTruck,
  FiCreditCard,
  FiFolder,
  FiDatabase,
  FiSettings,
  FiTool,
  FiHelpCircle,
  FiLogIn,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

const menuItems = [
  {
    key: "hq",
    label: "Hải quan",
    icon: <FiFileText />,
    children: [
      { key: "/ida", label: "Đăng ký tờ khai (IDA)" },
      { key: "/eda", label: "Đăng ký tờ khai (EDA)" },
      { key: "/idb", label: "Truyền tờ khai (IDB)" },
      { key: "/idc", label: "Sửa đổi bổ sung (IDC)" },
      { key: "/ide", label: "Hủy tờ khai (IDE)" },
      { key: "/declarations", label: "Danh sách tờ khai" },
      { key: "/logs", label: "Nhật ký truyền nhận" },
      { key: "/hq-feedback", label: "Phản hồi Hải quan" },
      { key: "/hq-notify", label: "Thông báo Hải quan" },
    ],
  },
  {
    key: "contract",
    label: "Hợp đồng",
    icon: <FiFolder />,
    children: [
      { key: "/contracts", label: "Hợp đồng" },
      { key: "/contract-products", label: "Sản phẩm hợp đồng" },
      { key: "/contract-material", label: "Vật liệu hợp đồng" },
      { key: "/invoice", label: "Hóa đơn" },
    ],
  },

  {
    key: "/Product",
    label: "Hàng hóa",
    icon: <FiTruck />,
    children: [
      { key: "/product", label: "Hàng hóa" },
    ],
  },

  {
    key: "/vandon-list",
    label: "Vận tải",
    icon: <FiSend />,
    children: [
      { key: "/vandon", label: "Vận Đơn" },
    ],
  },

  {
    key: "documents",
    label: "Chứng từ – C/O",
    icon: <FiFolder />,
    children: [
      { key: "/documents", label: "Quản lý chứng từ" },
      { key: "/attachment", label: "Đính kèm hồ sơ điện tử" },
      { key: "/documents-files", label: "Tài liệu" },
      { key: "/co", label: "C/O Form" },
    ],
  },

  {
    key: "bank",
    label: "Giao dịch ngân hàng",
    icon: <FiCreditCard />,
    children: [{ key: "/bank-transactions", label: "Giao dịch ngân hàng" }],
  },

  {
    key: "category",
    label: "Danh mục",
    icon: <FiList />,
    children: [
      { key: "/partners", label: "Đối tác" },
      { key: "/warehouse", label: "Kho bãi" },
      { key: "/countries", label: "Quốc gia" },
      { key: "/hs-code", label: "Mã HS" },
      { key: "/transport-type", label: "Loại vận tải" },
    ],
  },

  {
    key: "system",
    label: "Hệ thống",
    icon: <FiSettings />,
    children: [
      { key: "/config", label: "Cấu hình hệ thống" },
      { key: "/users", label: "Người dùng" },
      { key: "/audit", label: "Nhật ký hệ thống" },
    ],
  },

  {
    key: "reports",
    label: "Báo cáo",
    icon: <FiDatabase />,
    children: [{ key: "/reports", label: "Báo cáo tổng hợp" }],
  },

  {
    key: "tools",
    label: "Tiện ích",
    icon: <FiTool />,
    children: [
      { key: "/exchange-rate", label: "Tỷ giá" },
      { key: "/data-import", label: "Nhập dữ liệu Excel" },
      { key: "/backup", label: "Sao lưu dữ liệu" },
    ],
  },

  {
    key: "support",
    label: "Hỗ trợ",
    icon: <FiHelpCircle />,
    children: [
      { key: "/support", label: "Hỗ trợ kỹ thuật" },
      { key: "/manual", label: "Hướng dẫn sử dụng" },
      { key: "/about", label: "Thông tin phiên bản" },
    ],
  },

  {
    key: "account",
    label: "Tài khoản",
    icon: <FiLogIn />,
    children: [
      { key: "/account", label: "Thông tin tài khoản" },
      { key: "/profile", label: "Hồ sơ cá nhân" },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();

  const [openKeys, setOpenKeys] = useState(["hq"]);

  const onOpenChange = (keys) => {
    const latest = keys.find((k) => !openKeys.includes(k));
    setOpenKeys(latest ? [latest] : []);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onToggle}
      width={260}
      style={{
        position: "fixed",
        left: 0,
        top: 63,
        height: "calc(100vh - 64px)",
        background: token.Layout?.siderBg,
        overflowY: "auto",
        scrollbarWidth: "none", 
        msOverflowStyle: "none", 
      }}
      className="custom-sidebar"
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        openKeys={collapsed ? [] : openKeys}
        onOpenChange={onOpenChange}
        onClick={(e) => navigate(e.key)}
        items={menuItems}
        style={{ background: token.Layout?.siderBg }}
      />
    </Sider>
  );
}
