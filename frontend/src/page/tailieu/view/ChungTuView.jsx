import { Card, Tabs, Alert } from "antd";
import { useState } from "react";

import ToKhaiTab from "../component/tokhai";
import HoSoTab from "../component/hoso";
import COTab from "../component/co";
import ChungTuTab from "../component/chungtu";

const { TabPane } = Tabs;

export default function ChungTuView() {
  const [selectedToKhai, setSelectedToKhai] = useState(null);
  const [activeTab, setActiveTab] = useState("tokhai");

  const handleSelectToKhai = (tk) => {
    setSelectedToKhai(tk);
    setActiveTab("hoso"); 
  };

  const disabled = !selectedToKhai;

  return (
    <Card>
      {/* CONTEXT */}
      {selectedToKhai && (
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 12 }}
          message={`Đang làm việc với tờ khai: ${selectedToKhai.so_to_khai}`}
          description={`Loại hình: ${selectedToKhai.loai_hinh_dac_biet?.ma_loai_hinh} – Trạng thái: ${selectedToKhai.trang_thai_gui}`}
        />
      )}

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Tờ khai" key="tokhai">
          <ToKhaiTab
            selectedToKhai={selectedToKhai}
            onSelectToKhai={handleSelectToKhai}
          />
        </TabPane>

        <TabPane tab="Hồ sơ điện tử" key="hoso" disabled={disabled}>
          <HoSoTab selectedToKhai={selectedToKhai} />
        </TabPane>

        <TabPane tab="C/O – Ưu đãi thuế" key="co" disabled={disabled}>
          <COTab selectedToKhai={selectedToKhai} />
        </TabPane>

        <TabPane tab="Quản lý chứng từ" key="chungtu" disabled={disabled}>
          <ChungTuTab selectedToKhai={selectedToKhai} />
        </TabPane>
      </Tabs>
    </Card>
  );
}
