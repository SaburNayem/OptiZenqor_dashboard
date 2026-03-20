import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Overview", end: true },
  { to: "/users", label: "User Control" },
  { to: "/products", label: "Products" },
  { to: "/posts", label: "Posts" },
  { to: "/features", label: "Features" },
];

function AdminLayout({ stats, activityFeed, pendingActions }) {
  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-panel">
          <div className="brand-icon">OZ</div>
          <div>
            <strong>OptiZenqor</strong>
            <p>Admin control center</p>
          </div>
        </div>

        <nav className="nav-stack">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `nav-button ${isActive ? "active" : ""}`.trim()
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="eyebrow">Operations</p>
          <h3>Real dashboard structure</h3>
          <p>
            Separate pages now handle the daily flow for moderation, commerce,
            content, and feature rollout management.
          </p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="eyebrow">Workspace status</p>
            <h1>OptiZenqor Dashboard</h1>
          </div>

          <div className="topbar-actions">
            <article className="mini-stat">
              <strong>{pendingActions}</strong>
              <span>Pending actions</span>
            </article>
            <article className="mini-stat">
              <strong>{stats[0].value + stats[1].value}</strong>
              <span>Core records</span>
            </article>
          </div>
        </header>

        <div className="mobile-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`.trim()
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <section className="hero-card page-hero">
          <div>
            <p className="eyebrow">Admin workspace</p>
            <h2>Manage the product from focused pages, not one crowded screen.</h2>
            <p className="hero-copy">
              Each area now has its own route and purpose, so the dashboard feels
              closer to a real product back office.
            </p>
          </div>

          <div className="hero-metrics compact">
            {activityFeed.slice(0, 3).map((item) => (
              <div key={item}>
                <strong>Live</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
