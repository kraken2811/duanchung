    import { useState, useEffect } from "react";
import { Card, Modal } from "antd";
import MaterialListToolbar from "../components/MaterialListToolbar";
import MaterialListTable from "../components/MaterialListTable";
import MaterialListForm from "../components/MaterialListForm";
import useNotify from "@/components/notification/useNotify";

// Mock data ban đầu
const MOCK_DATA = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  code: `NPL-${1000 + i}`,
  name: `Vải Cotton 100% loại ${String.fromCharCode(65 + (i % 5))}`,
  nameEn: `Cotton Fabric Type ${String.fromCharCode(65 + (i % 5))}`,
  unit: "MTR",
  hsCode: "52081100",
  taxRate: 5,
  originCountry: i % 2 === 0 ? "CN" : "VN",
  unitPrice: (Math.random() * 10).toFixed(2),
  source: i % 2 === 0 ? "import" : "domestic",
  notes: "",
  isActive: true,
}));

export default function MaterialListView() {
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  // Quản lý selection
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Quản lý Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Load data giả lập
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(MOCK_DATA);
      setLoading(false);
    }, 500);
  }, []);

  // Handlers
  const handleSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedItem(selectedRows[0] || null);
  };

  const handleAdd = () => {
    setModalData(null); // Reset data để thêm mới
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    if (!selectedItem) return;
    setModalData(selectedItem);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    Modal.confirm({
      title: "Xác nhận xóa",
      content: `Bạn có chắc chắn muốn xóa mã "${selectedItem.code}" không?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        // Call API delete here
        setData(data.filter((item) => item.id !== selectedItem.id));
        setSelectedRowKeys([]);
        setSelectedItem(null);
        notify.success("Đã xóa dữ liệu");
      },
    });
  };

  const handleSaveSuccess = (record) => {
    if (modalData?.id) {
      // Logic update state
      setData((prev) => prev.map((item) => (item.id === record.id ? { ...item, ...record } : item)));
    } else {
      // Logic create state
      const newItem = { ...record, id: Date.now() }; // Mock ID
      setData((prev) => [newItem, ...prev]);
    }
  };

  const handleClose = () => {
    // Logic quay lại trang dashboard hoặc đóng tab
    console.log("Close Window");
  };

  return (
    <div style={{ padding: 24, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* 1. TIÊU ĐỀ TRANG */}
      <Card
        bordered={false}
        bodyStyle={{ padding: 0 }}
        style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        {/* 2 & 3. THANH CÔNG CỤ & BỘ LỌC */}
        <MaterialListToolbar
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onImport={() => notify.info("Tính năng Import Excel")}
          onExport={() => notify.info("Tính năng Export Excel")}
          onClose={handleClose}
          hasSelection={selectedRowKeys.length > 0}
        />

        {/* 4 & 6. LƯỚI DỮ LIỆU & THANH TRẠNG THÁI */}
        <div style={{ padding: "0 12px 12px 12px", flex: 1, overflow: "hidden" }}>
          <MaterialListTable
            data={data}
            loading={loading}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={handleSelectChange}
          />
        </div>
      </Card>

      {/* 5. FORM NHẬP LIỆU */}
      <MaterialListForm
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        initialData={modalData}
        onSuccess={handleSaveSuccess}
      />
    </div>
  );
}