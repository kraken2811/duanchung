import React from "react";
import ContractMaterialTab from "../components/ContractMaterialTab";

export default function ContractMaterialView() {
  // Có thể truyền contractId nếu cần
  const contractId = null; // hoặc "HD-GC-2025-001" nếu có

  return (
    <div style={{ height: "calc(100vh - 100px)", background: "#fff", border: "1px solid #d9d9d9" }}>
      <ContractMaterialTab contractId={contractId} />
    </div>
  );
}