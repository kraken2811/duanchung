import React from "react";
import { Card, Tabs } from "antd";
import { FiDatabase, FiBox, FiCpu } from "react-icons/fi";
import ContractProductTab from "../components/ContractProductTab"; // Import component vừa tạo

export default function ContractView() {
  return (
      // Set chiều cao 100% để Form bung hết màn hình, tạo cảm giác App Desktop
      <div style={{ height: "calc(100vh - 100px)", background: "#fff", border: "1px solid #d9d9d9" }}>
        <ContractProductTab />
      </div>
    );
}