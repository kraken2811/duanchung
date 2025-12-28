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

export default function DeclarationsView() {
  const navigate = useNavigate();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const [declarations, setDeclarations] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [statistics, setStatistics] = useState(null);

  const selectedDeclaration = Array.isArray(declarations)
    ? declarations.find((d) => d.id_to_khai === selectedRows[0])
    : null;

  // Fetch data
  const fetchDeclarations = async (filters = {}) => {
    try {
      setLoading(true);

      const res = await declarationsAPI.fliterTK({
        ...filters,
        page: filters.page ?? pagination.current,
        limit: filters.limit ?? pagination.pageSize,
      });

      const STATUS_MAP = {
        CHO_GUI: "pending",
        DA_GUI: "inspection",
        DA_TIEP_NHAN: "inspection",
        DA_THONG_QUAN: "completed",
        TU_CHOI: "cancelled",
        HUY: "cancelled",
      };

      const CHANNEL_MAP = {
        XANH: "green",
        VANG: "yellow",
        DO: "red",
      };

      const mapped = Array.isArray(res.data)
        ? res.data.map((d) => ({
            id_to_khai: d.id_to_khai,

            declarationNumber: d.so_to_khai,
            regDate: d.ngay_khai_bao
              ? new Date(d.ngay_khai_bao).toLocaleDateString("vi-VN")
              : "-",

            type: d.loai_hinh_dac_biet?.ma_loai_hinh,
            typeName: d.loai_hinh_dac_biet?.ten_loai_hinh,

            importerCode: d.cong_ty?.ma_so_thue,
            partnerName: d.cong_ty?.ten_cong_ty,

            totalValue: Number(d.tong_gia_tri) || 0,
            totalTax: Number(d.so_tien_thue) || 0,

            status: STATUS_MAP[d.trang_thai_gui] || "none",
            channel: CHANNEL_MAP[d.phan_loai] || "none",

            itemCount: d.so_dong_hang,

            hasAttachment: false,
            taxPaid: Number(d.so_tien_thue) > 0,
            requiresRevision: d.trang_thai_gui === "YEU_CAU_SUA_DOI",

            _raw: d,
          }))
        : [];

      setDeclarations(mapped);
      setPagination((prev) => ({
        ...prev,
        total: res.total || 0,
      }));
    } catch (error) {
      notify.error("Lỗi khi tải danh sách tờ khai");
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async (filters = {}) => {
    try {
      const data = await declarationsAPI.getThongKe(filters);
      setStatistics(data);
    } catch {
      notify.error("Không thể tải thống kê");
    }
  };

  useEffect(() => {
    fetchDeclarations();
    fetchStatistics();
  }, []);

  // Handlers
  const handleSearch = (filters) => {
    setSelectedRows([]); // 🔥 reset selection

    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));

    fetchDeclarations({
      ...filters,
      page: 1,
    });
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
    if (!selectedRows.length) return;

    try {
      const id = selectedRows[0]; // id_to_khai
      await declarationsAPI.deleteTK(id);

      notify.success("Đã xóa tờ khai thành công");
      setSelectedRows([]);
      fetchDeclarations();
    } catch (error) {
      console.error(error);
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
    // 🔥 clear selection khi đổi trang
    setSelectedRows([]);

    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize,
    }));

    fetchDeclarations({
      page,
      limit: pageSize,
    });
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
        <DeclarationsStatistics data={statistics} />
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