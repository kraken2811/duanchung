import { Card, Tabs, Alert } from "antd";
import { useState } from "react";

import LotGoods from "../components/lohang";
import InventoryGoods from "../components/inventer";
import ValueAdjustGoods from "../components/value";
import SpecialTypeGoods from "../components/special";

const { TabPane } = Tabs;

export default function GoodsView() {
  const [selectedLoHang, setSelectedLoHang] = useState(null);
  const [activeTab, setActiveTab] = useState("lot");

  /* ================== CHỌN LÔ HÀNG ================== */
  const handleSelectLoHang = (loHang) => {
    setSelectedLoHang(loHang);
    setActiveTab("value-adjust"); // tự động sang tab điều chỉnh giá trị
  };

  const disabled = !selectedLoHang;

  return (
    <Card>
      {/* CONTEXT LÔ HÀNG */}
      {selectedLoHang && (
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 12 }}
          message={`Đang làm việc với lô hàng: ${selectedLoHang.so_lo_hang}`}
          description={`Hành trình: ${selectedLoHang.cang_xep_hang} → ${selectedLoHang.cang_do_hang}`}
        />
      )}

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Lô hàng" key="lot">
          <LotGoods
            onSelectLoHang={handleSelectLoHang}
            selectedLoHang={selectedLoHang}
          />
        </TabPane>

        <TabPane tab="Tồn kho" key="inventory" disabled={disabled}>
          <InventoryGoods selectedLoHang={selectedLoHang} />
        </TabPane>

        <TabPane
          tab="Điều chỉnh giá trị"
          key="value-adjust"
          disabled={disabled}
        >
          <ValueAdjustGoods selectedLoHang={selectedLoHang} />
        </TabPane>

        <TabPane
          tab="Loại hình đặc biệt"
          key="special-type"
          disabled={disabled}
        >
          <SpecialTypeGoods selectedLoHang={selectedLoHang} />
        </TabPane>
      </Tabs>
    </Card>
  );
}
