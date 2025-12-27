import { Button, Space, Divider } from "antd";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiPrinter,
  FiDownload,
  FiSend,
} from "react-icons/fi";
import "../css/declaration.css";

export default function DeclarationsToolbar({
  selectedCount,
  onNew,
  onEdit,
  onDelete,
  onPrint,
  onExport,
  onSubmit,
}) {
  return (
    <Space>
      <Button type="primary" icon={<FiPlus />} onClick={onNew}>
        Tạo tờ khai mới
      </Button>
      <Button danger icon={<FiTrash2 />} disabled={selectedCount === 0} onClick={onDelete}>
        Xóa
      </Button>
      <Divider type="vertical" />
      <Button icon={<FiPrinter />} disabled={selectedCount === 0} onClick={onPrint}>
        In
      </Button>
      <Button className="textSibar" icon={<FiDownload />} onClick={onExport}>
        Xuất Excel
      </Button>
    </Space>
  );
}
