import { Layout, theme } from "antd";

const { Header } = Layout;

export default function AppHeader() {
  const { token } = theme.useToken(); 

  return (
    <Header
      style={{
        background: token.Layout?.headerBg,   
        padding: "0 20px",
        borderBottom: `1px solid ${token.colorBorder}`,
        color: token.colorTextLightSolid,
      }}
    >
      <h3>ECUS5 Web</h3>
    </Header>
  );
}
