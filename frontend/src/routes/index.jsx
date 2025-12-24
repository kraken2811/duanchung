import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import MainLayout from "@/components/layout/MainLayout";
import IDAView from "@/page/IDA/views/IDAview";
import IDBView from "@/page/IDB/views/IDBView";
import IDCView from "@/page/IDC/views/IDCView";
import DeclarationsView from "@/page/Declarations/views/DeclarationsView";
import IDEView from "@/page/IDE/views/IDEview";
import ProcessingLogView from "@/page/ProcessingLog/views/ProcessingLogView";
import CustomsNotificationView from "@/page/CustomsNotification/views/CustomsNotificationView";
import ContractInvoiceView from "@/page/ContractInvoice/views/ContractInvoiceView"; 
import MaterialListView from "@/page/MaterialList/views/MaterialListView";
import ContractView from "@/page/Contract/views/ContractView";
import ContractProductView  from "@/page/ContractProducts/views/ContractProductsView";
import LoginView from "@/page/Login/views/LoginView";




import { layoutUrl, homeUrl, idaurl, error403Url ,idburl , idcurl, declarationsUrl , ideurl , processingLog, hqNotifyUrl, contractInvoiceUrl , materialListUrl ,contractUrl, contractProductsUrl, loginUrl} from "./urls";
const Home = () => <h2>Home ✅</h2>;
const Error403 = () => <h1>403 Forbidden</h1>;
const NotFound = () => <h1>404 Not Found</h1>;

const adminUser = { username: "admin" };

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const user = adminUser;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;

  if (!user) return <Navigate to={error403Url} replace />;

  return children;
};

const router = createBrowserRouter([
  {
    path: layoutUrl,
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },    
      { path: idaurl, element: <IDAView /> },
      { path: idburl, element: <IDBView /> },
      { path: idcurl, element: <IDCView /> },
      { path: declarationsUrl, element: <DeclarationsView /> },
      { path: ideurl, element: <IDEView /> },
      { path: processingLog, element: <ProcessingLogView /> },
      { path: hqNotifyUrl, element: <CustomsNotificationView /> },
      { path: contractInvoiceUrl, element: <ContractInvoiceView /> },
      { path: materialListUrl, element: <MaterialListView /> },
      { path: contractUrl, element: <ContractView /> },
      { path: contractProductsUrl, element: <ContractProductView /> },
      { path: loginUrl, element: <LoginView /> }
    ],
  },

  { path: error403Url, element: <Error403 /> },
  { path: "*", element: <NotFound /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
