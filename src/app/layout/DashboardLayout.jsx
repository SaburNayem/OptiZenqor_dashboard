import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../features/auth/auth";
import { useDashboard } from "../../store/DashboardContext";
import { navigationItems, pageMeta } from "../../shared/config/navigation";

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dashboard = useDashboard();
  const currentMeta = pageMeta[location.pathname] ?? pageMeta["/"];

  function handleLogout() {
    signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-panel">
          <div className="brand-icon">OZ</div>
          <div>
            <strong>OptiZenqor</strong>
            <p>Master admin control center</p>
          </div>
        </div>

        <nav className="nav-stack">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-button ${isActive ? "active" : ""}`.trim()}
            >
              <span>{item.label}</span>
              <small>{item.helper}</small>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">Command center</p>
          <h3>{dashboard.pendingActions} pending actions across the ecosystem</h3>
          <p>
            Catalog, orders, customers, homepage content, support, auth flows,
            and system visibility are organized into dedicated admin surfaces.
          </p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">{currentMeta.eyebrow}</p>
            <h1>{currentMeta.title}</h1>
            <p className="topbar-copy">{currentMeta.description}</p>
          </div>

          <div className="topbar-actions">
            <div className="mini-stat">
              <span>Pending actions</span>
              <strong>{dashboard.pendingActions}</strong>
            </div>
            <div className="mini-stat">
              <span>Live routes</span>
              <strong>{dashboard.systemSnapshot.liveRoutes}</strong>
            </div>
            <button type="button" className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <div className="mobile-nav">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`.trim()}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <section className="hero-card page-hero">
          <div>
            <p className="eyebrow">Platform visibility</p>
            <h2>{currentMeta.heroTitle}</h2>
            <p className="hero-copy">{currentMeta.heroCopy}</p>
          </div>

          <div className="hero-metrics compact">
            {currentMeta.highlights.map((item) => (
              <div key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
