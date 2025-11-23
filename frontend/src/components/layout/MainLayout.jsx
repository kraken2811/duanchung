import { useState } from "react";
import { Layout, theme } from "antd";
import Sidebar from "./SideBar";
import Header from "./Header";
import AppBreadcrumb from "../common/Breadcrumb";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken(); 

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: "all .2s",
        }}
      >
        <Header />

        <Content
          style={{
            padding: 24,
            background: token.colorBgContainer,  
          }}
        >
          <AppBreadcrumb />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
