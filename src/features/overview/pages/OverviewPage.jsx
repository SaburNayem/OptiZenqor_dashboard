import { useEffect, useState } from "react";
import DashboardSection from "../../../shared/ui/DashboardSection";
import InsightCard from "../../../shared/ui/InsightCard";
import SummaryGrid from "../../../shared/ui/SummaryGrid";
import { adminRequest } from "../../../shared/api/adminApi";

function OverviewPage() {
  const [state, setState] = useState({
    loading: true,
    error: "",
    user: null,
    overview: null,
    products: [],
    customers: [],
    features: [],
  });

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [user, overview, products, customers, features] = await Promise.all([
          adminRequest("/auth/me"),
          adminRequest("/admin/overview"),
          adminRequest("/admin/products"),
          adminRequest("/admin/customers"),
          adminRequest("/admin/features"),
        ]);

        if (!active) return;

        setState({
          loading: false,
          error: "",
          user,
          overview,
          products,
          customers,
          features,
        });
      } catch (error) {
        if (!active) return;
        setState((current) => ({ ...current, loading: false, error: error.message || "Unable to load dashboard overview." }));
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  if (state.loading) {
    return <div className="page-stack"><section className="panel-card"><p>Loading live dashboard overview...</p></section></div>;
  }

  if (state.error) {
    return <div className="page-stack"><section className="panel-card"><p className="auth-error">{state.error}</p></section></div>;
  }

  const stats = [
    { label: "Customers", value: state.overview.customers, helper: "Registered customer accounts" },
    { label: "Orders", value: state.overview.orders, helper: "Tracked order records" },
    { label: "Products", value: state.overview.products, helper: "Active catalog items" },
    { label: "Open threads", value: state.overview.openThreads, helper: "Support conversations needing action" },
  ];

  const activityFeed = [
    `${state.overview.orders} orders are currently available in the admin flow.`,
    `${state.overview.products} active products are visible through the backend catalog.`,
    `${state.features.filter((item) => item.isEnabled).length} feature flags are enabled right now.`,
    `${state.customers.filter((item) => item.status === "ACTIVE").length} customer accounts are active.`,
  ];

  return (
    <div className="page-stack">
      <SummaryGrid items={stats} />

      <section className="card-grid three-up">
        <InsightCard
          eyebrow="Commerce"
          title="Catalog readiness"
          value={`${state.products.length} products synced`}
          description="Products are being loaded from the live OptiZenqor backend instead of dashboard seed data."
        />
        <InsightCard
          eyebrow="Customers"
          title="Account health"
          value={`${state.customers.filter((item) => item.status === "ACTIVE").length} active customers`}
          description="Customer records now reflect the backend's current customer list."
        />
        <InsightCard
          eyebrow="Platform"
          title="Revenue snapshot"
          value={`BDT ${Number(state.overview.totalRevenue || 0).toLocaleString()}`}
          description={`Signed in as ${state.user?.fullName || state.user?.email || "admin"}.`}
        />
      </section>

      <section className="content-grid">
        <div className="primary-column">
          <DashboardSection title="Operations feed" subtitle="Current activity across commerce, support, and feature rollout.">
            <div className="activity-list">
              {activityFeed.map((item) => (
                <article key={item} className="activity-item">
                  <span className="activity-dot" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </DashboardSection>
        </div>

        <div className="secondary-column">
          <DashboardSection title="Feature rollout health" subtitle="Current environment toggles from the backend.">
            <div className="feature-list">
              {state.features.slice(0, 6).map((feature) => (
                <article key={feature.id} className="feature-card">
                  <div className="feature-topline">
                    <div>
                      <h3>{feature.label}</h3>
                      <p>{feature.environment}</p>
                    </div>
                    <span className={`status-badge ${feature.isEnabled ? "success" : "muted"}`}>
                      {feature.isEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </DashboardSection>
        </div>
      </section>
    </div>
  );
}

export default OverviewPage;
