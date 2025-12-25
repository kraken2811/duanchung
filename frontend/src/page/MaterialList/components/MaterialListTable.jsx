import React from "react";
import { Table, Tag, Card } from "antd";

export default function MaterialListTable({
  data,
  loading,
  selectedRowKeys,
  onSelectChange,
}) {
  // Cấu hình cột: Header UPPERCASE, align chuẩn
  const columns = [
    { title: "STT", key: "index", width: 50, align: "center", render: (_, __, i) => <span className="text-gray-500">{i + 1}</span> },
    { 
      title: "MÃ NPL", 
      dataIndex: "code", 
      width: 120, 
      sorter: (a, b) => a.code.localeCompare(b.code),
      render: (text) => <b style={{ color: "#1890ff" }}>{text}</b> 
    },
    { title: "TÊN NGUYÊN LIỆU", dataIndex: "name", width: 250, ellipsis: true },
    { title: "TÊN TIẾNG ANH", dataIndex: "nameEn", width: 200, ellipsis: true, responsive: ["lg"] },
    { title: "ĐVT", dataIndex: "unit", width: 80, align: "center" },
    { title: "MÃ HS", dataIndex: "hsCode", width: 100, align: "center" },
    { title: "THUẾ NK", dataIndex: "taxRate", width: 100, align: "right", render: (val) => val ? `${val}%` : "-" },
    { title: "XUẤT XỨ", dataIndex: "originCountry", width: 80, align: "center" },
    { title: "ĐƠN GIÁ", dataIndex: "unitPrice", width: 120, align: "right", render: (val) => val ? `$ ${val.toLocaleString()}` : "-" },
    { 
      title: "NGUỒN GỐC", 
      dataIndex: "source", 
      width: 120, 
      align: "center",
      render: (val) => (
        <Tag color={val === "import" ? "blue" : "green"}>
          {val === "import" ? "Nhập khẩu" : "Nội địa"}
        </Tag>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "radio", 
  };

  return (
    <div style={{ padding: "0 16px 16px" }}>
      <Card 
        size="small" 
        bordered={false} 
        bodyStyle={{ padding: 0 }} 
        className="shadow-sm"
      >
        <Table
          className="custom-table" // Class dùng chung với trang Hợp đồng
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={loading}
          rowSelection={rowSelection}
          size="middle"
          pagination={{
            defaultPageSize: 20,
            showSizeChanger: true,
            showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} / ${total}`,
            pageSizeOptions: ["20", "50", "100"],
          }}
          scroll={{ y: "calc(100vh - 280px)" }}
          onRow={(record) => ({
            onClick: () => onSelectChange([record.id], [record]),
            style: { cursor: "pointer" }
          })}
          rowClassName={(record) => selectedRowKeys.includes(record.id) ? "ant-table-row-selected" : ""}
        />
      </Card>
      
      {/* CSS Inline để đảm bảo hiển thị đúng nếu chưa có file css global */}
      <style jsx global>{`
        .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
        .ant-table-row-selected > td { background-color: #e6f7ff !important; }
        .custom-table .ant-table-thead > tr > th {
          font-weight: 600;
          background: #fafafa;
          text-transform: uppercase;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}