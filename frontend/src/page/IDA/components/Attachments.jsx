import { Button, Space } from "antd";
import { FiUpload } from "react-icons/fi";
import '../css/IDA.css';

export default function Attachments() {
  return (
    <div>
      <h3>Đính kèm chứng từ điện tử</h3>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div>
          <Button className="textSibar" icon={<FiUpload />}>Tải lên Hợp đồng</Button>
          <span style={{ marginLeft: 12, color: "#999" }}>(PDF, Word, không quá 5MB)</span>
        </div>
        <div>
          <Button className="textSibar" icon={<FiUpload />}>Tải lên Invoice</Button>
          <span style={{ marginLeft: 12, color: "#999" }}>(PDF, không quá 5MB)</span>
        </div>
        <div>
          <Button className="textSibar" icon={<FiUpload />}>Tải lên Packing List</Button>
          <span style={{ marginLeft: 12, color: "#999" }}>(PDF, Excel, không quá 5MB)</span>
        </div>
        <div>
          <Button className="textSibar" icon={<FiUpload />}>Tải lên C/O (Giấy chứng nhận xuất xứ)</Button>
          <span style={{ marginLeft: 12, color: "#999" }}>(PDF, không quá 5MB)</span>
        </div>
      </Space>
    </div>
  );
}