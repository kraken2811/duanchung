import { Table, Tag, Space, Button, Tooltip } from "antd";
import { FiEdit, FiPrinter, FiFileText, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { getChannelConfig, getStatusConfig } from "../utils/helpers";

export default function DeclarationsTable({
  data,
  loading,
  selectedRows,
  onSelectionChange,
  onEdit,
  onPrint,
  pagination,
  onPageChange,
}) {
  const columns = [
    {
      title: "Luồng",
      dataIndex: "channel",
      key: "channel",
      width: 80,
      align: "center",
      render: (channel) => {
        const config = getChannelConfig(channel) || {
          text: "Không xác định",
          description: "",
          color: "#d9d9d9",
        };
        return (
          <Tooltip title={`${config.text} ${config.description}`}>
            <div
              style={{
                width: 12,
                height: 40,
                backgroundColor: config.color,
                margin: "0 auto",
                borderRadius: 2,
              }}
            />
          </Tooltip>
        );
      },
    },
    {
      title: "Số tờ khai",
      dataIndex: "declarationNumber",
      key: "declarationNumber",
      width: 180,
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <span style={{ fontWeight: 500 }}>{text}</span>
          <span style={{ fontSize: 12, color: "#999" }}>{record.regDate}</span>
        </Space>
      ),
    },
    {
      title: "Loại hình",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type, record) => (
        <Tooltip title={record.typeName}>
          <Tag color="blue">{type}</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Mã NK/XK",
      dataIndex: "importerCode",
      key: "importerCode",
      width: 120,
    },
    {
      title: "Tên đối tác",
      dataIndex: "partnerName",
      key: "partnerName",
      width: 250,
      ellipsis: true,
    },
    {
      title: "Tổng trị giá (USD)",
      dataIndex: "totalValue",
      key: "totalValue",
      width: 140,
      align: "right",
      render: (value) =>
        typeof value === "number"
          ? value.toLocaleString("en-US")
          : "-",
    },
    {
      title: "Tổng thuế (USD)",
      dataIndex: "totalTax",
      key: "totalTax",
      width: 130,
      align: "right",
      render: (value) =>
        typeof value === "number"
          ? value.toLocaleString("en-US")
          : "-",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status) => {
        const config = getStatusConfig(status) || {
          text: status || "Không rõ",
          color: "default",
        };

        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Chỉ báo",
      key: "indicators",
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space size={8}>
          {record.hasAttachment && (
            <Tooltip title="Có tài liệu đính kèm">
              <FiFileText style={{ color: "#1890ff" }} />
            </Tooltip>
          )}
          {record.taxPaid && (
            <Tooltip title="Đã nộp thuế">
              <FiCheckCircle style={{ color: "#52c41a" }} />
            </Tooltip>
          )}
          {record.requiresRevision && (
            <Tooltip title="Yêu cầu sửa đổi">
              <FiAlertCircle style={{ color: "#ff4d4f" }} />
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<FiEdit />}
            onClick={() => onEdit(record)}
          >
            Sửa
          </Button>
          <Button
            type="link"
            size="small"
            icon={<FiPrinter />}
            onClick={() => onPrint(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id_to_khai"
      loading={loading}
      rowSelection={{
        selectedRowKeys: selectedRows,
        onChange: onSelectionChange,
        preserveSelectedRowKeys: false,
        selections: false,
      }}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} bản ghi`,
        onChange: onPageChange,
      }}
      scroll={{ x: 1400 }}
    />
  );
}
