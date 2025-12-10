import { Modal } from "antd";

export default function modalconfirm({
  open,
  title = "Xác nhận",
  content = "Bạn có chắc chắn muốn thực hiện thao tác này?",
  okText = "Đồng ý",
  cancelText = "Hủy",
  onOk,
  onCancel,
  loading = false,
}) {
  return (
    <Modal
      open={open}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={loading}
      centered
    >
      <p>{content}</p>
    </Modal>
  );
}
