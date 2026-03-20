import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import CategoriesPage from "../pages/CategoriesPage";
import ContentPage from "../pages/ContentPage";
import FeaturesPage from "../pages/FeaturesPage";
import LoginPage from "../pages/LoginPage";
import OverviewPage from "../pages/OverviewPage";
import ProductsPage from "../pages/ProductsPage";
import SystemPage from "../pages/SystemPage";
import UsersPage from "../pages/UsersPage";
import { createDashboardStore } from "../store/dashboardStore";

const dashboard = createDashboardStore();

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardLayout dashboard={dashboard} />,
        children: [
          { index: true, element: <OverviewPage /> },
          { path: "catalog", element: <ProductsPage /> },
          { path: "categories", element: <CategoriesPage /> },
          { path: "customers", element: <UsersPage /> },
          { path: "content", element: <ContentPage /> },
          { path: "features", element: <FeaturesPage /> },
          { path: "system", element: <SystemPage /> },
        ],
      },
    ],
  },
]);
