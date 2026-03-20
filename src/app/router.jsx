import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import LoginPage from "../features/auth/pages/LoginPage";
import CategoriesPage from "../features/categories/pages/CategoriesPage";
import ChatPage from "../features/chat/pages/ChatPage";
import ContentPage from "../features/content/pages/ContentPage";
import CustomersPage from "../features/customers/pages/CustomersPage";
import FeaturesPage from "../features/features_rollout/pages/FeaturesPage";
import HomepagePage from "../features/homepage/pages/HomepagePage";
import OrdersPage from "../features/orders/pages/OrdersPage";
import OverviewPage from "../features/overview/pages/OverviewPage";
import SettingsPage from "../features/settings/pages/SettingsPage";
import SystemPage from "../features/system/pages/SystemPage";
import CatalogPage from "../features/catalog/pages/CatalogPage";
import DashboardLayout from "./layout/DashboardLayout";
import NotFoundState from "../shared/feedback/NotFoundState";

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
        element: <DashboardLayout />,
        children: [
          { index: true, element: <OverviewPage /> },
          { path: "catalog", element: <CatalogPage /> },
          { path: "categories", element: <CategoriesPage /> },
          { path: "customers", element: <CustomersPage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "content", element: <ContentPage /> },
          { path: "homepage", element: <HomepagePage /> },
          { path: "features", element: <FeaturesPage /> },
          { path: "chat", element: <ChatPage /> },
          { path: "system", element: <SystemPage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "*", element: <NotFoundState /> },
        ],
      },
    ],
  },
]);
