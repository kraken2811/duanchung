import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import MainLayout from "@/components/layout/MainLayout";
import IDAView from "@/page/IDA/views/IDAview";
import IDBView from "@/page/IDB/views/IDBView";

import { layoutUrl, homeUrl, idaurl, error403Url ,idburl } from "./urls";
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
    ],
  },

  { path: error403Url, element: <Error403 /> },
  { path: "*", element: <NotFound /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
