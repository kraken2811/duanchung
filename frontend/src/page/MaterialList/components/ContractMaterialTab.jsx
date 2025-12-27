import React, { useState, useEffect, useMemo } from "react";
import { Table, Input, Button, Space, Card, notification, Row, Col } from "antd";
import { FiUpload, FiDownload, FiPrinter, FiPackage } from "react-icons/fi";

// Import local
import "@/page/MaterialList/css/material.css";
import { contractMaterialAPI, contractAPI } from "@/page/MaterialList/api/contractmaterial.api";
import { mapAPIMaterialToUI } from "@/page/MaterialList/utils/status";

export default function ContractMaterialTab({ contractId = null }) {
  const [materials, setMaterials] = useState([]); // Dữ liệu gốc
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [contractCurrency, setContractCurrency] = useState(""); // Đơn vị tiền tệ

  // === FETCH HỢP ĐỒNG ĐỂ LẤY ĐƠN VỊ TIỀN TỆ ===
  const fetchContractCurrency = async () => {
    if (!contractId) {
      setContractCurrency("");
      return;
    }
    try {
      const res = await contractAPI.getById(contractId);
      setContractCurrency(res.data.ma_ngoai_te || "USD");
    } catch (err) {
      console.warn("❌ Không lấy được đơn vị tiền tệ từ hợp đồng:", err);
      notification.warning({
        message: "Thông báo",
        description: "Không tải được loại tiền tệ của hợp đồng.",
      });
      setContractCurrency("USD");
    }
  };

  // === FETCH VẬT LIỆU ===
  const fetchMaterials = async () => {
    setLoading(true);
    try {
      let res;
      if (contractId) {
        res = await contractMaterialAPI.getByContractId(contractId);
      } else {
        res = await contractMaterialAPI.getAll();
      }
      const mapped = (res.data || []).map(mapAPIMaterialToUI);
      setMaterials(mapped);
    } catch (err) {
      console.error("❌ Lỗi API vật liệu:", err);
      notification.error({
        message: "Lỗi tải dữ liệu",
        description: "Không thể lấy danh sách vật liệu.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
    fetchContractCurrency();
  }, [contractId]);

  // === SEARCH & FILTER ===
  const filteredMaterials = useMemo(() => {
    if (!searchText.trim()) return materials;
    const term = searchText.toLowerCase().trim();
    return materials.filter(
      (item) =>
        item.materialCode?.toLowerCase().includes(term) ||
        item.materialName?.toLowerCase().includes(term) ||
        item.hsCode?.toLowerCase().includes(term)
    );
  }, [materials, searchText]);

  // === PAGINATION STATE ===
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  // === HANDLE PAGINATION CHANGE ===
  const handleTableChange = (pag) => {
    setPagination({
      current: pag.current,
      pageSize: pag.pageSize,
    });
  };

  // === DATA FOR CURRENT PAGE ===
  const dataToShow = useMemo(() => {
    const start = (pagination.current - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return filteredMaterials.slice(start, end);
  }, [filteredMaterials, pagination.current, pagination.pageSize]);

  // === COLUMNS ===
  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,
      align: "center",
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "MÃ VẬT LIỆU",
      dataIndex: "materialCode",
      width: 150,
      render: (text) => <b style={{ color: "#1890ff" }}>{text}</b>,
    },
    {
      title: "TÊN VẬT LIỆU",
      dataIndex: "materialName",
      ellipsis: true,
      width: 250,
    },
    {
      title: "ĐVT",
      dataIndex: "unit",
      width: 80,
      align: "center",
    },
    {
      title: "SỐ LƯỢNG",
      dataIndex: "quantity",
      width: 100,
      align: "right",
      render: (value) => (value != null && value !== "" ? value : "—"),
    },
    {
      title: "MÃ HS",
      dataIndex: "hsCode",
      width: 120,
      align: "center",
    },
    {
      title: "ĐƠN GIÁ",
      dataIndex: "unitPrice",
      width: 100,
      align: "right",
    },
    // 👇 HIỂN THỊ CỘT "ĐVT TỆ" KHI CÓ contractId
    ...(contractId
      ? [
          {
            title: "ĐVT TỆ",
            dataIndex: "",
            width: 80,
            align: "center",
            render: () => contractCurrency || "—",
          },
        ]
      : []),
    {
      title: "TỔNG GIÁ TRỊ",
      dataIndex: "totalValue",
      width: 120,
      align: "right",
      render: (value) => (value ? value : "0"),
    },
    {
      title: "NGUỒN GỐC",
      dataIndex: "origin",
      width: 120,
      align: "center",
    },
  ];

  // === TOOLBAR ===
  const renderToolbar = () => (
    <div style={{ background: "#fff", padding: "12px 16px", borderBottom: "1px solid #d9d9d9", marginBottom: 16 }}>
      <Row gutter={[16, 8]} align="middle">
        <Col flex="auto">
          <Input
            placeholder="Tìm theo mã, tên hoặc mã HS..."
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "100%", maxWidth: 400 }}
          />
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="contract-material-wrapper">
      {renderToolbar()}
      <div style={{ padding: "0 16px" }}>
        <Card
          title={
            <span>
              <FiPackage style={{ marginRight: 8 }} />
              {contractId
                ? `Vật liệu của hợp đồng: ${contractId}${contractCurrency ? ` (ĐVT: ${contractCurrency})` : ""}`
                : "Danh sách tất cả vật liệu"}
            </span>
          }
          size="small"
          bordered={false}
          className="contract-material-card"
        >
          <Table
            className="contract-material-table"
            columns={columns}
            dataSource={dataToShow}
            rowKey="id"
            size="middle"
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: filteredMaterials.length, // ← Tổng số bản ghi sau khi lọc
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50"],
              onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
            }}
            scroll={{ x: contractId ? 1200 : 1100 }}
          />
        </Card>
      </div>
    </div>
  );
}