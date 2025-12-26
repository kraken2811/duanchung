import { Card, Tabs } from "antd";

import DoiTacPage from "../component/doitac";
import KhoBaiPage from "../component/KhoBaiPage";
import QuocGiaPage from "../component/QuocGiaPage";
import MaHSPage from "../component/MaHSPage";
import LoaiVanTaiPage from "../component/LoaiVanTaiPage";

const { TabPane } = Tabs;

export default function DanhMucView() {
  return (
    <Card>
      <Tabs defaultActiveKey="doi-tac">
        <TabPane tab="Đối tác" key="doi-tac">
          <DoiTacPage />
        </TabPane>

        <TabPane tab="Kho bãi" key="kho-bai">
          <KhoBaiPage />
        </TabPane>

        <TabPane tab="Quốc gia" key="quoc-gia">
          <QuocGiaPage />
        </TabPane>

        <TabPane tab="Mã HS" key="ma-hs">
          <MaHSPage />
        </TabPane>

        <TabPane tab="Loại vận tải" key="loai-van-tai">
          <LoaiVanTaiPage />
        </TabPane>
      </Tabs>
    </Card>
  );
}
