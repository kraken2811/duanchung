import { App as AntdApp } from "antd";
import ThemeProvider from "./theme";
import AppRouter from "./routes";

export default function App() {
  return (
    <AntdApp>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </AntdApp>
  );
}
