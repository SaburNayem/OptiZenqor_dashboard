import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import {
  activityFeed,
  initialFeatures,
  initialPosts,
  initialProducts,
  initialUsers,
  statusToneMap,
} from "./data/dashboardData";
import FeaturesPage from "./pages/FeaturesPage";
import OverviewPage from "./pages/OverviewPage";
import PostsPage from "./pages/PostsPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import { useDashboardState } from "./state/useDashboardState";

function App() {
  const dashboard = useDashboardState({
    initialUsers,
    initialProducts,
    initialPosts,
    initialFeatures,
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminLayout
            stats={dashboard.stats}
            activityFeed={activityFeed}
            pendingActions={dashboard.pendingActions}
          />
        }
      >
        <Route
          index
          element={
            <OverviewPage
              stats={dashboard.stats}
              users={dashboard.users}
              products={dashboard.products}
              posts={dashboard.posts}
              features={dashboard.features}
              activityFeed={activityFeed}
              statusToneMap={statusToneMap}
            />
          }
        />
        <Route
          path="users"
          element={
            <UsersPage
              users={dashboard.users}
              cycleUserStatus={dashboard.cycleUserStatus}
              statusToneMap={statusToneMap}
            />
          }
        />
        <Route
          path="products"
          element={
            <ProductsPage
              products={dashboard.products}
              productForm={dashboard.productForm}
              setProductForm={dashboard.setProductForm}
              handleProductSubmit={dashboard.handleProductSubmit}
              cycleProductStatus={dashboard.cycleProductStatus}
              statusToneMap={statusToneMap}
            />
          }
        />
        <Route
          path="posts"
          element={
            <PostsPage
              posts={dashboard.posts}
              postForm={dashboard.postForm}
              setPostForm={dashboard.setPostForm}
              handlePostSubmit={dashboard.handlePostSubmit}
              cyclePostStatus={dashboard.cyclePostStatus}
              statusToneMap={statusToneMap}
            />
          }
        />
        <Route
          path="features"
          element={
            <FeaturesPage
              features={dashboard.features}
              toggleFeature={dashboard.toggleFeature}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
