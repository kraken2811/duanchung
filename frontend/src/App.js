import NotifyProvider from "./components/notification/NotifyProvider";
import ThemeProvider from "./theme";
import AppRouter from "./routes";

export default function App() {
  return (
    <NotifyProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </NotifyProvider>
  );
}
