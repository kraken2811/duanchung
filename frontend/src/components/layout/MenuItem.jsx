import {
  FiHome,
  FiFileText,
  FiSend,
  FiList,
  FiTruck,
  FiCreditCard,
  FiFolder,
  FiSettings,
  FiHelpCircle,
  FiDatabase,
} from "react-icons/fi";

export const defaultMenus = [
  // DASHBOARD
  {
    name: "Dashboard",
    path: "/",
    icon: <FiHome size={18} />,
    roles: ["Admin", "User"],
  },

  // ECUS5 MAIN
  {
    name: "Khai báo tờ khai",
    path: "/declaration",
    icon: <FiFileText size={18} />,
    roles: ["Admin", "User"],
  },
  {
    name: "Danh sách tờ khai",
    path: "/declarations",
    icon: <FiList size={18} />,
    roles: ["Admin", "User"],
  },
  {
    name: "Truyền & nhận phản hồi",
    path: "/transfer",
    icon: <FiSend size={18} />,
    roles: ["Admin", "User"],
  },

  // VẬN CHUYỂN / MANIFEST
  {
    name: "Manifest",
    path: "/manifest",
    icon: <FiTruck size={18} />,
    roles: ["Admin"],
  },

  // THANH TOÁN
  {
    name: "Thanh toán thuế",
    path: "/payment",
    icon: <FiCreditCard size={18} />,
    roles: ["Admin"],
  },

  // CHỨNG TỪ
  {
    name: "Chứng từ / C/O",
    path: "/documents",
    icon: <FiFolder size={18} />,
    roles: ["Admin", "User"],
  },

  // BÁO CÁO
  {
    name: "Báo cáo",
    path: "/reports",
    icon: <FiDatabase size={18} />,
    roles: ["Admin"],
  },

  // THIẾT LẬP HỆ THỐNG
  {
    name: "Thiết lập hệ thống",
    path: "/settings",
    icon: <FiSettings size={18} />,
    roles: ["Admin"],
  },

  // HỖ TRỢ
  {
    name: "Hỗ trợ",
    path: "/help",
    icon: <FiHelpCircle size={18} />,
    roles: ["Admin", "User"],
  },
];
