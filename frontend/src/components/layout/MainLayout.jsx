import { useState } from "react";
import { Layout, theme } from "antd";
import Sidebar from "./SideBar";
import AppHeader from "./Header";
import AppBreadcrumb from "../common/Breadcrumb";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

        <Layout
          style={{
            marginLeft: collapsed ? 80 : 260,
            transition: "all .2s",
            paddingTop: 64,
            height: "calc(100vh - 64px)",
            overflow: "auto",
          }}
        >
          <Content
            style={{
              padding: 24,
              background: token.colorBgContainer,
              minHeight: "100%",
            }}
          >
            <AppBreadcrumb />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
