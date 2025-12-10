import { useState, useEffect } from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import useNotify from "@/components/notification/useNotify";
import DeclarationsFilter from "../components/DeclarationsFilter";
import DeclarationsStatistics from "../components/DeclarationsStatistics";
import DeclarationsToolbar from "../components/DeclarationsToolbar";
import DeclarationsTable from "../components/DeclarationsTable";
import DeclarationDetailPreview from "../components/DeclarationDetailPreview";
import { declarationsAPI } from "../api/declarations.api";
import { idaurl } from "@/routes/urls";

// Mock data
const mockDeclarations = [
  {
    id: 1,
    declarationNumber: "101/NK/HCM/2024",
    regDate: "15/11/2024",
    type: "A11",
    typeName: "NK Thông thường",
    channel: "green",
    importerCode: "0123456789",
    partnerName: "CÔNG TY TNHH ABC VIỆT NAM",
    totalValue: 125000,
    totalTax: 18750,
    status: "completed",
    hasAttachment: true,
    taxPaid: true,
    itemCount: 5,
  },
  {
    id: 2,
    declarationNumber: "102/NK/HCM/2024",
    regDate: "20/11/2024",
    type: "A12",
    typeName: "NK Tạm nhập tái xuất",
    channel: "yellow",
    importerCode: "0987654321",
    partnerName: "CÔNG TY CP XYZ",
    totalValue: 85000,
    totalTax: 12750,
    status: "pending",
    hasAttachment: true,
    taxPaid: false,
    itemCount: 3,
    requiresRevision: true,
  },
  {
    id: 3,
    declarationNumber: "103/NK/HCM/2024",
    regDate: "25/11/2024",
    type: "A11",
    typeName: "NK Thông thường",
    channel: "red",
    importerCode: "1122334455",
    partnerName: "CÔNG TY TNHH DEF",
    totalValue: 250000,
    totalTax: 37500,
    status: "inspection",
    hasAttachment: false,
    taxPaid: false,
    itemCount: 8,
  },
  {
    id: 4,
    declarationNumber: "104/NK/HCM/2024",
    regDate: "28/11/2024",
    type: "A13",
    typeName: "NK Gia công",
    channel: "green",
    importerCode: "5544332211",
    partnerName: "CÔNG TY TNHH GHI LOGISTICS",
    totalValue: 95000,
    totalTax: 9500,
    status: "completed",
    hasAttachment: true,
    taxPaid: true,
    itemCount: 4,
  },
];

export default function DeclarationsView() {
  const navigate = useNavigate();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const [declarations, setDeclarations] = useState(mockDeclarations);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const selectedDeclaration = declarations.find((d) => d.id === selectedRows[0]);

  // Fetch data
  const fetchDeclarations = async (filters = {}) => {
    try {
      setLoading(true);
      // const response = await declarationsAPI.getList(filters);
      // setDeclarations(response.data);
      // setPagination({ ...pagination, total: response.total });
      
      // Mock: Sử dụng dữ liệu giả
      setDeclarations(mockDeclarations);
      setPagination({ ...pagination, total: mockDeclarations.length });
    } catch (error) {
      notify.error("Lỗi khi tải danh sách tờ khai");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeclarations();
  }, []);

  // Handlers
  const handleSearch = (filters) => {
    console.log("Search with filters:", filters);
    fetchDeclarations(filters);
  };

  const handleReset = () => {
    fetchDeclarations();
  };

  const handleNew = () => {
    navigate(idaurl);
  };

  const handleEdit = (record) => {
    navigate(`${idaurl}/${record.id}`);
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) return;
    
    try {
      // await declarationsAPI.delete(selectedRows[0]);
      notify.success("Đã xóa tờ khai thành công");
      setSelectedRows([]);
      fetchDeclarations();
    } catch (error) {
      notify.error("Lỗi khi xóa tờ khai");
    }
  };

  const handlePrint = (record) => {
    console.log("Print:", record);
    notify.info("Chức năng in đang phát triển");
  };

  const handleExport = async () => {
    try {
      // const blob = await declarationsAPI.exportExcel();
      // Download file...
      notify.success("Xuất Excel thành công");
    } catch (error) {
      notify.error("Lỗi khi xuất Excel");
    }
  };

  const handleSubmit = async () => {
    if (selectedRows.length === 0) return;
    
    try {
      // await declarationsAPI.submit(selectedRows[0]);
      notify.success("Đã gửi tờ khai lên hệ thống VNACCS");
      fetchDeclarations();
    } catch (error) {
      notify.error("Lỗi khi gửi tờ khai");
    }
  };

  const handlePageChange = (page, pageSize) => {
    setPagination({ ...pagination, current: page, pageSize });
    fetchDeclarations({ page, pageSize });
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24 }}>
          Quản lý Tờ khai Nhập/Xuất khẩu
        </h2>
        <p style={{ margin: "8px 0 0", color: "#666" }}>
          Tra cứu, quản lý và theo dõi trạng thái tờ khai hải quan
        </p>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: 16 }}>
        <DeclarationsFilter onSearch={handleSearch} onReset={handleReset} />
      </div>

      {/* Statistics */}
      <div style={{ marginBottom: 16 }}>
        <DeclarationsStatistics data={declarations} />
      </div>

      {/* Toolbar */}
      <Card style={{ marginBottom: 16 }}>
        <DeclarationsToolbar
          selectedCount={selectedRows.length}
          onNew={handleNew}
          onEdit={() => handleEdit(selectedDeclaration)}
          onDelete={handleDelete}
          onPrint={() => handlePrint(selectedDeclaration)}
          onExport={handleExport}
          onSubmit={handleSubmit}
        />
      </Card>

      {/* Table */}
      <Card>
        <DeclarationsTable
          data={declarations}
          loading={loading}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          onEdit={handleEdit}
          onPrint={handlePrint}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </Card>

      {/* Detail Preview */}
      {selectedDeclaration && (
        <div style={{ marginTop: 16 }}>
          <DeclarationDetailPreview declaration={selectedDeclaration} />
        </div>
      )}
    </div>
  );
}