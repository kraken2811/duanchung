import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Spin } from "antd";

import MainLayout from "@/components/layout/MainLayout";

// ===== AUTH =====
import LoginView from "@/page/Login/views/LoginView";

// ===== PAGES =====
import IDAView from "@/page/IDA/views/IDAview";
import IDBView from "@/page/IDB/views/IDBView";
import IDCView from "@/page/IDC/views/IDCView";
import IDEView from "@/page/IDE/views/IDEview";
import DeclarationsView from "@/page/Declarations/views/DeclarationsView";
import ProcessingLogView from "@/page/ProcessingLog/views/ProcessingLogView";
import CustomsNotificationView from "@/page/CustomsNotification/views/CustomsNotificationView";
import ContractInvoiceView from "@/page/ContractInvoice/views/ContractInvoiceView";
import MaterialListView from "@/page/MaterialList/views/MaterialListView";
import ContractView from "@/page/Contract/views/ContractView";
import ContractProductView from "@/page/ContractProducts/views/ContractProductsView";
import ProductView from "@/page/Product/views/product_view";
import Vandonview from "@/page/Transport/views/Vandonview";
// ===== URLS =====
import {
  homeUrl,
  idaurl,
  idburl,
  idcurl,
  ideurl,
  declarationsUrl,
  processingLog,
  hqNotifyUrl,
  contractInvoiceUrl,
  materialListUrl,
  contractUrl,
  contractProductsUrl,
  loginUrl,
  product,
  error403Url,
  vandon,
} from "./urls";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to={loginUrl} replace />;
  }

  return children;
};
const Home = () => <h2>Home ✅</h2>;
const NotFound = () => <h1>404 Not Found</h1>;
const router = createBrowserRouter([
  {
    path: loginUrl,
    element: <LoginView />,
  },
  {
    path: "/",
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
      { path: ideurl, element: <IDEView /> },

      { path: declarationsUrl, element: <DeclarationsView /> },
      { path: processingLog, element: <ProcessingLogView /> },
      { path: hqNotifyUrl, element: <CustomsNotificationView /> },

      { path: contractInvoiceUrl, element: <ContractInvoiceView /> },
      { path: materialListUrl, element: <MaterialListView /> },
      { path: contractUrl, element: <ContractView /> },
      { path: contractProductsUrl, element: <ContractProductView /> },
      { path: product, element: <ProductView /> },
      { path: vandon, element: <Vandonview /> },

    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}