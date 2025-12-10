import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import LogToolbar from "../components/LogToolBar";
import LogList from "../components/LogList";
import LogDetail from "../components/LogDetail";
import { LOG_DATA } from "../utils/mockData"; // Hoặc import API

export default function ProcessingLogView() {
  const [logs, setLogs] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Giả lập load dữ liệu
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLogs(LOG_DATA);
      if (LOG_DATA.length > 0) setSelectedMsg(LOG_DATA[0]);
      setLoading(false);
    }, 500);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div style={{ padding: 16, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      {/* 1. Toolbar */}
      <LogToolbar 
        onRefresh={handleRefresh} 
        onPrint={() => alert("In danh sách")} 
        onClose={() => alert("Đóng tab")} 
      />

      {/* 2. Main Layout (Master-Detail) */}
      <Row gutter={16} style={{ height: "calc(100vh - 120px)" }}>
        {/* Bên trái: Danh sách */}
        <Col span={9} style={{ height: "100%" }}>
          <LogList 
            data={logs} 
            selectedId={selectedMsg?.id} 
            onSelect={setSelectedMsg} 
            loading={loading}
          />
        </Col>

        {/* Bên phải: Chi tiết */}
        <Col span={15} style={{ height: "100%" }}>
          <LogDetail message={selectedMsg} />
        </Col>
      </Row>
    </div>
  );
}